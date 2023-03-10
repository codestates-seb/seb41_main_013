package mainproject.domain.board.controller;


import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
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

    @ApiOperation(value = "글 등록")
    @PostMapping
    public ResponseEntity postBoard(@ApiParam(name = "게시글 등록", value = postBoardDescription, required = true)
                                        @Valid @RequestBody BoardPostDto boardPostDto) {
        Board response = boardService.
                saveBoard(boardMapper.boardPostDtoToBoard(boardPostDto));
        return new ResponseEntity(boardMapper.boardToBoardResponseDto(response), HttpStatus.CREATED);
    }


    final String postBoardDescription = "hostMemberId: 회원번호 (회원 등록 후 글 등록 가능)" + "\r\n" +
            "category: 카테고리 (우리동네, 운동, 생활, 기타 중 입력)" + "\r\n" +
            "title: 게시글 제목 (50자까지 입력 가능) " + "\r\n" +
            "content: 게시글내용 (500자까지 입력 가능) ";



    @ApiOperation(value = "글 수정", notes = "등록된 글을 수정합니다.")
    @PatchMapping("/{board-id}")
    public ResponseEntity patchBoard(@ApiParam(name = "게시글 수정", value = patchBoardDescription, required = true)
            @PathVariable("board-id") @Positive long boardId,
                                     @Valid @RequestBody BoardPatchDto boardPatchDto) {
        boardPatchDto.setBoardId(boardId);
        Board response = boardService.
                updateBoard(boardId, boardMapper.boardPatchDtoToBoard(boardPatchDto));
        return new ResponseEntity<>(boardMapper.boardToBoardResponseDto(response), HttpStatus.OK);
    }

    final String patchBoardDescription = "hostMemberId: 회원번호 " + "\r\n" +
            "category: 카테고리 (우리동네, 운동, 생활, 기타 중 입력)" + "\r\n" +
            "title: 게시글 제목 (50자까지 입력 가능) " + "\r\n" +
            "content: 게시글내용 (500자까지 입력 가능) " + "\r\n" +
            "createdAt: 게시글 작성 시간" + "\r\n" +
            "modifiedAt: 게시글 수정 시간";

    @ApiOperation(value = "글 조회", notes = "게시판에 글을 조회합니다.")
    @GetMapping("/{board-id}")
    public ResponseEntity getBoard(@PathVariable("board-id") @Positive long boardId) {
        Board response = boardService.findBoard(boardId);
        return new ResponseEntity<>(
                new SingleResponseDto<>(boardMapper.boardToBoardResponseDto(response)), HttpStatus.OK);
    }


    @ApiOperation(value = "글 전체 조회", notes = "글을 전체 조회합니다.")
    @GetMapping
    public ResponseEntity getBoards(@Positive @RequestParam(defaultValue = "1") Integer page,
                                    @Positive @RequestParam(defaultValue = "15") Integer size) {

        Page<Board> pagedBoards = boardService.findBoards(page - 1, size);
        List<Board> boards = pagedBoards.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(boardMapper.boardsToBoardResponseDtos(boards), pagedBoards),
                HttpStatus.OK);
    }


    @ApiOperation(value = "글 검색", notes = "게시판에 등록된 글을 검색합니다.")
    @GetMapping("/search")
    public ResponseEntity searchBoards(@RequestParam(required = false, defaultValue = "1") int page,
                                          @RequestParam(required = false, defaultValue = "15") int size,
                                          @RequestParam(required = false, defaultValue = "boardId") String tab,
                                          @RequestParam String q) {

        Page<Board> pageBoards = boardService.searchBoards(page - 1, size, tab, q);
        List<Board> boards = pageBoards.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(boardMapper.boardsToBoardResponseDtos(boards), pageBoards), HttpStatus.OK);
    }

    @ApiOperation(value = "글 삭제", notes = "등록된 글을 삭제합니다.")
    @DeleteMapping("/{board-id}")
    public ResponseEntity deleteBoard(@PathVariable("board-id") @Positive long boardId){
        boardService.deleteBoard(boardId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
