package mainproject.domain.board.controller;


import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import mainproject.domain.board.dto.BoardPatchDto;
import mainproject.domain.board.dto.BoardPostDto;
import mainproject.domain.board.dto.BoardResponseDto;
import mainproject.domain.board.entity.Board;
import mainproject.domain.board.mapper.BoardMapper;
import mainproject.domain.board.service.BoardService;

import mainproject.domain.challenge.dto.ChallengeResponseDto;
import mainproject.domain.challenge.entity.Challenge;
import mainproject.global.category.Category;
import mainproject.global.dto.MultiResponseDto;
import mainproject.global.dto.SingleResponseDto;
import org.springframework.data.domain.Page;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;


import org.springframework.lang.Nullable;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;
import java.util.List;

@RestController
@RequestMapping("/api/boards")
@Validated
@Api(tags = "게시판 글 작성, 조회, 수정, 삭제")
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



    final String postBoardDescription = "MemberId: 회원번호 (회원 등록 후 글 등록 가능)" + "\r\n" +

            "category: 카테고리 (우리동네, 운동, 생활습관, 기타 중 입력)" + "\r\n" +
            "title: 게시글 제목 (50자까지 입력 가능) " + "\r\n" +
            "content: 게시글내용 (500자까지 입력 가능) ";



    @ApiOperation(value = "글 수정", notes = "등록된 글을 수정합니다.")
    @PatchMapping("/{board-id}")

    public ResponseEntity patchBoard(@PathVariable("board-id") @Positive long boardId,
                                     @ApiParam(name = "게시글 수정", value = patchBoardDescription, required = true)

                                     @Valid @RequestBody BoardPatchDto boardPatchDto) {
        boardPatchDto.setBoardId(boardId);
        Board response = boardService.
                updateBoard(boardId, boardMapper.boardPatchDtoToBoard(boardPatchDto));
        return new ResponseEntity<>(boardMapper.boardToBoardResponseDto(response), HttpStatus.OK);
    }


    final String patchBoardDescription = "MemberId: 회원번호 " + "\r\n" +
            "category: 카테고리 (우리동네, 운동, 생활습관, 기타 중 입력)" + "\r\n" +
            "title: 게시글 제목  " + "\r\n" +
            "content: 게시글내용  " ;


    @ApiOperation(value = "글 조회", notes = "게시판에 글을 조회합니다.")
    @GetMapping("/{board-id}")
    public ResponseEntity getBoard(@PathVariable("board-id") @Positive long boardId) {
        Board response = boardService.findBoard(boardId);
        return new ResponseEntity<>(
                new SingleResponseDto<>(boardMapper.boardToBoardResponseDto(response)), HttpStatus.OK);
    }


    @ApiOperation(value = "글 전체 조회", notes = "글을 전체 조회합니다.")
    @GetMapping
    public ResponseEntity getBoards(@ApiParam(value = "카테고리 선택 - 미선택시 전체 카테고리에서 조회")
                                    @RequestParam @Nullable  Category category,
                                    @Positive @RequestParam(defaultValue = "1") @Nullable Integer page,
                                    @Positive @RequestParam(defaultValue = "15") Integer size) {


        Page<Board> pagedBoards = boardService.findBoards(category,page - 1, size);
        List<Board> boards = pagedBoards.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(boardMapper.boardsToBoardResponseDtos(boards), pagedBoards),
                HttpStatus.OK);
    }


    @ApiOperation(value = "검색(제목+내용)")
    @GetMapping("/search")
    public ResponseEntity getSearchBoards(@ApiParam(value = "100자까지 입력 가능", required = true)
                                              @RequestParam @NotNull(message = "검색어를 입력하세요.")
                                              @Size(max = 100, message = "검색어는 100자까지 입력 가능합니다.")
                                              String query,
                                              @ApiParam(value = "페이지 - 미입력시 첫 페이지 출력")
                                              @RequestParam(defaultValue = "1") @Nullable @Positive int page) {
        Page<Board> pageBoards = boardService.searchBoards(query, page - 1);

        List<Board> boards = pageBoards.getContent();

        List<BoardResponseDto> response = boardMapper.boardsToBoardResponseDtos(boards);

        return new ResponseEntity<>(new MultiResponseDto<>(response, pageBoards), HttpStatus.OK);
    }



    @ApiOperation(value = "글 삭제", notes = "등록된 글을 삭제합니다.")
    @DeleteMapping("/{board-id}")
    public ResponseEntity deleteBoard(@PathVariable("board-id") @Positive long boardId){
        boardService.deleteBoard(boardId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
