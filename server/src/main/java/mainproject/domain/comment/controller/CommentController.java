package mainproject.domain.comment.controller;



import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import mainproject.domain.comment.dto.CommentPatchDto;
import mainproject.domain.comment.dto.CommentPostDto;
import mainproject.domain.comment.dto.CommentResponseDto;
import mainproject.domain.comment.entity.Comment;
import mainproject.domain.comment.mapper.CommentMapper;
import mainproject.domain.comment.service.CommentService;


import mainproject.domain.image.service.ImageService;
import mainproject.global.dto.SingleResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/api/comments")
@Api(tags = "댓글 생성, 수정, 조회, 삭제")
public class CommentController {

    CommentService commentService;
    CommentMapper commentMapper;
    ImageService imageService;

    public CommentController(CommentService commentService, CommentMapper commentMapper, ImageService imageService) {
        this.commentService = commentService;
        this.commentMapper = commentMapper;
        this.imageService = imageService;
    }

    @ApiOperation(value = "댓글 등록")
    @PostMapping("/{board-id}")

    public ResponseEntity postComment(@PathVariable("board-id") long boardId,
                                      @ApiParam(name = "댓글 등록", value = postCommentDescription)
                                      @RequestBody CommentPostDto commentPostDto){
        Comment comment = commentMapper.commentPostDtoToComment(commentPostDto);
        Comment savedComment = commentService.createComment(comment, boardId);
        CommentResponseDto response = commentMapper.commentToCommentResponseDto(savedComment);

        response.setProfileImageUrl(imageService.createPresignedUrl(comment.getMember().getImage().getImageId()));

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    final String postCommentDescription = "MemberId: 회원번호" + "\r\n" +
            "content: 게시글내용" + "\r\n" +
            "boardId: 글 번호";


    @ApiOperation(value = "댓글 수정", notes = "등록된 댓글을 수정합니다.")
    @PatchMapping("/{comment-id}")

    public ResponseEntity patchComment(@PathVariable("comment-id") long commentId,
                                       @ApiParam(name = "댓글 수정", value = patchCommentDescription, required = true)

                                       @Valid @RequestBody CommentPatchDto commentPatchDto){

        Comment comment = commentMapper.commentPatchDtoToComment(commentPatchDto);
        comment.setCommentId(commentId);
        Comment updatedComment = commentService.updateComment(comment);

        CommentResponseDto response = commentMapper.commentToCommentResponseDto(updatedComment);

        response.setProfileImageUrl(imageService.createPresignedUrl(comment.getMember().getImage().getImageId()));

        return new ResponseEntity<>(response, HttpStatus.OK);
    }


    final String patchCommentDescription = "MemberId: 회원번호" + "\r\n" +

            "content: 댓글내용 " + "\r\n" +
            "createdAt: 댓글 작성 시간"+ "\r\n" +
            "modifiedAt: 댓글 수정 시간";

   @ApiOperation(value = "댓글 조회", notes = "댓글을 조회합니다.")
   @GetMapping("/{board-id}")
   public ResponseEntity getComments(@PathVariable("board-id") long boardId,
                                     @RequestParam(defaultValue = "1") @Nullable @Positive int page){
       List<Comment> comments = commentService.findComments(boardId, page-1);

       List<CommentResponseDto> response = commentMapper.commentsToCommentResponseDtos(comments);

       for (int i = 0; i < response.size(); i++) {
           response.get(i).setProfileImageUrl(imageService.createPresignedUrl(comments.get(i).getMember().getImage().getImageId()));
       }

       return new ResponseEntity<>(
               new SingleResponseDto<>(commentMapper.commentsToCommentResponseDtos(comments)), HttpStatus.OK);
   }


    @ApiOperation(value = "댓글 삭제", notes = "등록된 댓글을 삭제합니다.")
    @DeleteMapping("/{comment-id}")
    public ResponseEntity deleteComment(@PathVariable("comment-id") long commentId){
        commentService.deleteComment(commentId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}