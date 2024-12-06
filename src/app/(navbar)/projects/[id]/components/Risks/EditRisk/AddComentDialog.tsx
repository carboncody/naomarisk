'use client';

import { type Risk } from '@models';
import { Comments } from '../../../risk/[rid]/components/comments';

interface EditRiskCommentProps {
  refetch: () => void;
  riskElement: Risk;
  onCommentAdded: () => void;
}

export function EditRiskComment({
  refetch,
  riskElement,
}: EditRiskCommentProps) {
  return (
    <>
      <Comments
        riskId={riskElement.id ?? ''}
        comments={riskElement?.comments ?? []}
        refetch={refetch}
      />
    </>
  );
}
