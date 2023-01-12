package mainproject.domain.comment.repository;

import mainproject.domain.board.entity.Board;
import mainproject.domain.comment.entity.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;


@EnableJpaRepositories
public interface CommentRepository extends JpaRepository<Comment, Long> {


}
