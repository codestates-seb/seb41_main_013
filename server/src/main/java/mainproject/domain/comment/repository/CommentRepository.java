package mainproject.domain.comment.repository;


import mainproject.domain.board.entity.Board;
import mainproject.domain.comment.entity.Comment;


import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    List<Comment> findAllByBoard(Board board, PageRequest pageRequest);

}
