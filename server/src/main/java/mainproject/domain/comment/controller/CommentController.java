package mainproject.domain.comment.controller;


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
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/api/comments")
@Validated
public class CommentController {
    private final CommentService commentService;
    private final CommentMapper commentMapper;
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
    public ResponseEntity getComments(@PathVariable("board-id") long boardId,
            @RequestParam("page") @Positive int page,
            @RequestParam("size") @Positive int size){
      List<Comment> response = commentService.findComments( page-1, size).getContent();
        Page<Comment> pageComments = commentService.findComments(page-1, size);
       // List<Comment> response = pageComments.getContent();
        return new ResponseEntity<>(
                new MultiResponseDto<>(commentMapper.commentsToCommentResponseDtos(response),
                        pageComments),
                HttpStatus.OK);
    }

    //답변 삭제(1개)
    @DeleteMapping("/{comment-id}")
    public ResponseEntity deleteComment(@PathVariable("comment-id") @Positive long commentId){
        //Service에 요청을 보내 해당하는 answerId 하는 답변을 조회해 삭제
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

