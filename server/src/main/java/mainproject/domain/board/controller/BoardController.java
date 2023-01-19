package mainproject.domain.board.controller;


import mainproject.domain.board.dto.BoardPatchDto;
import mainproject.domain.board.dto.BoardPostDto;
import mainproject.domain.board.entity.Board;
import mainproject.domain.board.mapper.BoardMapper;
import mainproject.domain.board.service.BoardService;
import mainproject.global.dto.MultiResponseDto;
import mainproject.global.dto.SingleResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/api/boards")
@Validated
public class BoardController {

    private BoardService boardService;
    private BoardMapper boardMapper;

    public BoardController(BoardService boardService, BoardMapper boardMapper) {
        this.boardService = boardService;
        this.boardMapper = boardMapper;
    }

    @PostMapping
    public ResponseEntity postBoard(@Valid @RequestBody BoardPostDto boardPostDto) {
        Board response = boardService.
                saveBoard(boardMapper.boardPostDtoToBoard(boardPostDto));
        return new ResponseEntity(boardMapper.boardToBoardResponseDto(response), HttpStatus.CREATED);
    }


    @PatchMapping("/{board-id}")
    public ResponseEntity patchBoard(@PathVariable("board-id") @Positive long boardId,
                                        @Valid @RequestBody BoardPatchDto boardPatchDto) {
        boardPatchDto.setBoardId(boardId);
        Board response = boardService.
                updateBoard(boardId, boardMapper.boardPatchDtoToBoard(boardPatchDto));
        return new ResponseEntity<>(boardMapper.boardToBoardResponseDto(response), HttpStatus.OK);
    }


    @GetMapping("/{board-id}")
    public ResponseEntity getBoard(@PathVariable("board-id") @Positive long boardId) {
        Board response = boardService.findBoard(boardId);
        return new ResponseEntity<>(
                new SingleResponseDto<>(boardMapper.boardToBoardResponseDto(response)), HttpStatus.OK);
    }


    @GetMapping
    public ResponseEntity getBoards(@Positive @RequestParam(defaultValue = "1") Integer page,
                                    @Positive @RequestParam(defaultValue = "15") Integer size) {

        Page<Board> pagedBoards = boardService.findBoards(page - 1, size);
        List<Board> boards = pagedBoards.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(boardMapper.boardsToBoardResponseDtos(boards), pagedBoards),
                HttpStatus.OK);
    }


    @GetMapping("/search")
    public ResponseEntity searchBoards(@RequestParam(required = false, defaultValue = "1") int page,
                                          @RequestParam(required = false, defaultValue = "15") int size,
                                          @RequestParam(required = false, defaultValue = "questionId") String tab,
                                          @RequestParam String q) {

        Page<Board> pageBoards = boardService.searchBoards(page - 1, size, tab, q);
        List<Board> boards = pageBoards.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(boardMapper.boardsToBoardResponseDtos(boards), pageBoards), HttpStatus.OK);
    }


    @DeleteMapping("/{board-id}")
    public ResponseEntity deleteBoard(@PathVariable("board-id") @Positive long boardId){
        boardService.deleteBoard(boardId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
