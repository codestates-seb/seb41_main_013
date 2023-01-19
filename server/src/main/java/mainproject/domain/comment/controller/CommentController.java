package mainproject.domain.comment.controller;



import io.swagger.annotations.ApiOperation;
import mainproject.domain.comment.dto.CommentPatchDto;
import mainproject.domain.comment.dto.CommentPostDto;
import mainproject.domain.comment.dto.CommentResponseDto;
import mainproject.domain.comment.entity.Comment;
import mainproject.domain.comment.mapper.CommentMapper;
import mainproject.domain.comment.service.CommentService;
import mainproject.global.dto.MultiResponseDto;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    CommentService commentService;
    CommentMapper commentMapper;

    public CommentController(CommentService commentService, CommentMapper commentMapper) {
        this.commentService = commentService;
        this.commentMapper = commentMapper;
    }

    @ApiOperation(value = "댓글 등록", notes = "댓글을 등록합니다.")
    @PostMapping("/{board-id}")
    public ResponseEntity postComment(@PathVariable("board-id") long boardId,
                                      @RequestBody CommentPostDto commentPostDto){
        Comment comment = commentMapper.commentPostDtoToComment(commentPostDto);
        Comment savedComment = commentService.createComment(comment, boardId);
        CommentResponseDto response = commentMapper.commentToCommentResponseDto(savedComment);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @ApiOperation(value = "댓글 수정", notes = "등록된 댓글을 수정합니다.")
    @PatchMapping("/{comment-id}")
    public ResponseEntity patchComment(@PathVariable("comment-id") long commentId,
                                       @Valid @RequestBody CommentPatchDto commentPatchDto){

        Comment comment = commentMapper.commentPatchDtoToComment(commentPatchDto);
        comment.setCommentId(commentId);
        Comment response = commentService.updateComment(comment);

        return new ResponseEntity<>(commentMapper.commentToCommentResponseDto(response), HttpStatus.OK);
    }


    @ApiOperation(value = "댓글 조회", notes = "댓글을 조회합니다.")
    @GetMapping("/{board-id}")
    public ResponseEntity getComments(@PathVariable("board-id") @Positive long boardId,
                                      @Positive @RequestParam(defaultValue = "1") Integer page,
                                      @Positive @RequestParam(defaultValue = "15") Integer size) {

        Page<Comment> pagedComments = commentService.findComments(page - 1, size);
        List<Comment> comments = pagedComments.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(commentMapper.commentsToCommentResponseDtos(comments), pagedComments),
                HttpStatus.OK);
    }
    @ApiOperation(value = "댓글 삭제", notes = "등록된 댓글을 삭제합니다.")
    @DeleteMapping("/{comment-id}")
    public ResponseEntity deleteComment(@PathVariable("comment-id") long commentId){
        commentService.deleteComment(commentId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
