export type CreateCommentForm = {
  content: string;
};

export type UpdateCommentForm = Partial<CreateCommentForm>;
