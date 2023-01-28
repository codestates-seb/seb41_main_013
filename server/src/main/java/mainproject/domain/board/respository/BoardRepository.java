package mainproject.domain.board.respository;

import mainproject.domain.board.entity.Board;

import mainproject.global.category.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

//import java.util.List;


@Repository
public interface BoardRepository extends JpaRepository<Board, Long> {

    Page<Board> findByTitleContaining(String searchKeyword, Pageable pageable);


    Page<Board> findByCategory(Category Category, Pageable pageable);

    Board findByBoardId(long boardId);

}
