
package mainproject.domain.comment.service;


import mainproject.domain.board.service.BoardService;
import mainproject.domain.comment.entity.Comment;
import mainproject.domain.comment.repository.CommentRepository;
import mainproject.global.exception.BusinessLogicException;
import mainproject.global.exception.ExceptionCode;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

import org.springframework.stereotype.Service;
import java.util.Optional;

@Service

public class CommentService {
    private final CommentRepository commentRepository;
    private final BoardService boardService;

    public CommentService(CommentRepository commentRepository, BoardService boardService) {
        this.commentRepository = commentRepository;
        this.boardService = boardService;
    }

    public Comment createComment(Comment comment) {   //( Comment comment, long memberId, long boardId)
        // Member findMember = memberService.findMember(memberId);
        // Board findBoard = boardService.findBoard(boardId); //Question의 Service에서 READ 부분의 구현이 어떻게 되었는지 확인 후 수정 필요
        // comment.createComment(findMember, findBoard); //Entity 주석 풀면 해결

        return commentRepository.save(comment);
    }

    public Comment updateComment(Comment comment) {
        //작성한 답변이 존재하는지 확인
        Comment findComment = findVerifiedComment(comment.getCommentId());

        Optional.ofNullable(comment.getContent()).
                ifPresent(content -> findComment.setContent(content));

        //수정한 내용 저장
        return commentRepository.save(findComment);

    }


    public Page<Comment> findComments(int page, int size) {
        return commentRepository.findAll(PageRequest.of(page, size,
                Sort.by("commentId").descending()));
    }




    public void deleteComment(long commentId){
        Comment findComment = findVerifiedComment(commentId);
        commentRepository.delete(findComment);
    }


    private Comment findVerifiedComment(long commentId) {
        Optional<Comment> optionalComment = commentRepository.findById(commentId);

        Comment findAnswer = optionalComment.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));

        return findAnswer;
    }


}