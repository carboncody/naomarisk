import { env } from '@env';
import { sendNewCommentEmail } from '@lib/services/email';
import { db } from '@server/db';
import type { CreateCommentForm, UpdateCommentForm } from '../api/types';

export async function CommentService() {
  async function createComment(
    riskId: string,
    authorEmail: string,
    data: CreateCommentForm,
  ) {
    const author = await db.user.findUniqueOrThrow({
      where: { email: authorEmail },
      select: { id: true },
    });

    try {
      const newComment = await db.comment.create({
        data: {
          ...data,
          authorId: author.id,
          riskId,
        },
        include: {
          risk: {
            include: {
              riskowner: true,
              project: true,
            },
          },
          author: true,
        },
      });

      if (newComment.risk.riskowner) {
        void sendNewCommentEmail({
          email: newComment.risk.riskowner.email,
          comment: newComment.content,
          link: `${env.frontendUrl}/projects/${newComment.risk.projectId}/risk/${newComment.riskId}`,
          risk: newComment.risk.description,
        });
      }

      void db.project.update({
        where: { id: newComment.risk.projectId },
        data: {
          updatedAt: new Date(),
        },
      });

      void db.risk.update({
        where: { id: newComment.riskId },
        data: {
          updatedAt: new Date(),
        },
      });

      return newComment;
    } catch (error) {
      throw new Error();
    }
  }

  async function updateComment(id: string, data: UpdateCommentForm) {
    const updatedComment = await db.comment.update({
      where: { id },
      data: {
        ...data,
      },
      include: {
        risk: {
          include: {
            riskowner: true,
            project: true,
          },
        },
      },
    });

    void db.project.update({
      where: { id: updatedComment.risk.projectId },
      data: {
        updatedAt: new Date(),
      },
    });

    void db.risk.update({
      where: { id: updatedComment.riskId },
      data: {
        updatedAt: new Date(),
      },
    });

    return updatedComment;
  }

  async function deleteComment(id: string) {
    return await db.comment.delete({ where: { id } });
  }

  return {
    deleteComment,
    createComment,
    updateComment,
  };
}
