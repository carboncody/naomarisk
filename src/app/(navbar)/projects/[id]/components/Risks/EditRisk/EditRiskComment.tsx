'use client';

import { Risk } from '@models';
import { Comments } from '../../../risk/[rid]/components/comments';

interface EditRiskCommentProps {
  refetch: () => void;
  riskElement: Risk;
  onCommentAdded: () => void;
}

export function EditRiskComment({
  refetch,
  riskElement,
  onCommentAdded,
}: EditRiskCommentProps) {
  console.log(riskElement);

  return (
    <>
      <Comments
        riskId={riskElement.id ?? ''}
        comments={riskElement?.comments ?? []}
        refetch={refetch}
        onCommentAdded={onCommentAdded}
      />
    </>
  );
}
