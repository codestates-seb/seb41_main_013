
package mainproject.domain.comment.service;



import mainproject.domain.board.entity.Board;
import mainproject.domain.board.respository.BoardRepository;
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
    public CommentService(CommentRepository commentRepository, BoardRepository boardRepository, BoardService boardService) {
        this.commentRepository = commentRepository;
        this.boardRepository = boardRepository;
        this.boardService = boardService;
    }

    private CommentRepository commentRepository;
    private BoardRepository boardRepository;
    private BoardService boardService;


    public Comment createComment(Comment comment, Long boardId) {
        //   Member member = memberRepository.findByEmail(email).orElseThrow(()->new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        Board board = boardRepository.findById(boardId).orElseThrow(()-> new BusinessLogicException(ExceptionCode.BOARD_NOT_FOUND));
        //   answer.setMember(member);
        comment.setBoard(board);
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