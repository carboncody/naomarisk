import { env } from '@env';
import { sendNewCommentEmail } from '@lib/services/email';
import { UserRole } from '@models';
import { db } from '@server/db';
import toast from 'react-hot-toast';
import type { CreateCommentForm, UpdateCommentForm } from '../api/types';

export async function CommentService() {
  async function getUserRoleAndId(email: string) {
    const user = await db.user.findUnique({
      where: { email },
      select: { id: true, role: true },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return { userId: user.id, role: user.role };
  }

  async function createComment(
    riskId: string,
    authorEmail: string,
    data: CreateCommentForm,
  ) {
    const { userId, role } = await getUserRoleAndId(authorEmail);

    if (role !== UserRole.Manager && role !== UserRole.Owner) {
      toast.error('You do not have permission to create comments');
      throw new Error('You do not have permission to create comments');
    }

    try {
      const newComment = await db.comment.create({
        data: {
          ...data,
          authorId: userId,
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
      throw new Error(
        toast.error(
          'Du har ikke rettigheder til at redigere andres kommentar',
        ) + 'Failed to create comment',
      );
    }
  }

  async function updateComment(
    id: string,
    editorEmail: string,
    data: UpdateCommentForm,
  ) {
    const { userId, role } = await getUserRoleAndId(editorEmail);
    const existingComment = await db.comment.findUnique({ where: { id } });

    if (!existingComment) {
      throw new Error('Comment not found');
    }

    if (
      role !== UserRole.Manager &&
      role !== UserRole.Owner &&
      existingComment.authorId !== userId
    ) {
      throw new Error(
        toast.error('You do not have permission to update this comment') +
          'Failed to update comment',
      );
    }

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

  async function deleteComment(id: string, deleterEmail: string) {
    const { userId } = await getUserRoleAndId(deleterEmail);
    const existingComment = await db.comment.findUnique({ where: { id } });

    if (!existingComment) {
      throw new Error('Comment not found');
    }

    if (existingComment.authorId !== userId) {
      throw new Error(
        toast.error('You do not have permission to delete this comment') +
          'Failed to delete comment',
      );
    }

    return await db.comment.delete({ where: { id } });
  }

  return {
    createComment,
    updateComment,
    deleteComment,
  };
}
