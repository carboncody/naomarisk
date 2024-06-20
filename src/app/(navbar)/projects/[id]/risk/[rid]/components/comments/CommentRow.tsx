const CommentRow = ({ Comment }) => {
  return (
    <div>
      <div>
        <span>
          <b>{Comment.author}</b>
        </span>
        <span>{new Date(Comment.createdAt).toLocaleString()}</span>
      </div>
      <div>
        <p>Kommentar</p>
      </div>
    </div>
  );
};

export default CommentRow;
