package mainproject.domain.comment.repository;

import mainproject.domain.board.entity.Board;
import mainproject.domain.comment.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {


}
