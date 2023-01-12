package mainproject.domain.comment.controller;

import mainproject.domain.comment.dto.CommentPatchDto;
import mainproject.domain.comment.dto.CommentPostDto;
import mainproject.domain.comment.dto.CommentResponseDto;
import mainproject.domain.comment.entity.Comment;
import mainproject.domain.comment.mapper.CommentMapper;
import mainproject.domain.comment.service.CommentService;
import mainproject.global.dto.SingleResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;


@RestController
@RequestMapping("/api/comments")
public class CommentController {

    CommentService commentService;
    CommentMapper commentMapper;

    public CommentController(CommentService commentService, CommentMapper commentMapper) {
        this.commentService = commentService;
        this.commentMapper = commentMapper;
    }


    @PostMapping("/{board-id}")
    public ResponseEntity postComment(@PathVariable("board-id") long boardId,
                                     @RequestBody CommentPostDto commentPostDto){
        Comment comment = commentMapper.commentPostDtoToComment(commentPostDto);
        Comment savedComment = commentService.createComment(comment, boardId);
        CommentResponseDto response = commentMapper.commentToCommentResponseDto(savedComment);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PatchMapping("/{comment-id}")
      public ResponseEntity patchComment(@PathVariable("comment-id") long commentId,
                                        @Valid @RequestBody CommentPatchDto commentPatchDto){

        Comment comment = commentMapper.commentPatchDtoToComment(commentPatchDto);
        comment.setCommentId(commentId);
        Comment response = commentService.updateComment(comment);

        return new ResponseEntity<>(commentMapper.commentToCommentResponseDto(response), HttpStatus.OK);
    }

    @GetMapping("/{board-id}")
     public ResponseEntity getComment(@PathVariable("board-id") Long boardId) {
        Comment response = commentService.findComments(boardId);
        return new ResponseEntity<>(new SingleResponseDto<>(commentMapper.commentToCommentResponseDto(response)),HttpStatus.OK);
    }

    @DeleteMapping("/{comment-id}")
       public ResponseEntity deleteComment(@PathVariable("comment-id") long commentId){
        commentService.deleteComment(commentId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
