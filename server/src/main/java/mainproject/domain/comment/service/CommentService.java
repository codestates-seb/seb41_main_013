package mainproject.domain.comment.service;

import mainproject.domain.challenge.entity.Challenge;
import mainproject.domain.comment.entity.Comment;
import mainproject.domain.comment.repository.CommentRepository;
import mainproject.domain.board.entity.Board;
import mainproject.domain.board.respository.BoardRepository;
import mainproject.domain.board.service.BoardService;
import mainproject.domain.member.entity.Member;
import mainproject.domain.member.service.MemberService;
import mainproject.global.exception.BusinessLogicException;
import mainproject.global.exception.ExceptionCode;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class CommentService {
    private CommentRepository commentRepository;
    private BoardRepository boardRepository;

  //  private MemberRepository memberRepository;
    private BoardService boardService;
    private MemberService memberService;


    public CommentService(CommentRepository commentRepository, BoardRepository boardRepository, BoardService boardService, MemberService memberService) {
        this.commentRepository = commentRepository;
        this.boardRepository = boardRepository;
        this.boardService = boardService;
        this.memberService = memberService;
    }

    public Comment createComment(Comment comment, Long boardId) {
        Member member = memberService.findVerifiedMember(comment.getMember().getId());  // 회원여부 검증
        comment.setMember(member);

     //   Member member = memberRepository.findByEmail(email).orElseThrow(()->new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
         Board board = boardRepository.findById(boardId).orElseThrow(()-> new BusinessLogicException(ExceptionCode.BOARD_NOT_FOUND));
     //   comment.setMember(member);
          comment.setBoard(board);
        return commentRepository.save(comment);
    }

    public Comment updateComment(Comment comment) {
        Comment findComment = commentRepository.findById(comment.getCommentId()).orElseThrow(()-> new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));

     //   if ( !findComment.getMember().getEmail().equals(email)){
     //          throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_ALLOWED);
     //     }

        findComment.setContent(comment.getContent());
        findComment.setModifiedAt(LocalDateTime.now().withNano(0));

        return commentRepository.save(findComment);
    }


    public Page<Comment> findComments(int page, int size){


        Page<Comment> findAllComment = commentRepository.findAll(
                PageRequest.of(page, size, Sort.by("commentId").descending()));

        return findAllComment;
    }

// 필터걸기 추가


    public boolean checkMember(Member principal, long commentId) {
        Optional<Comment> optionalComment = commentRepository.findById(commentId);

        return optionalComment.isPresent()
                && optionalComment.get().getMember().getEmail().equals(principal.getEmail());
    }
    public void deleteComment(Long commentId) {
        Comment findComment = commentRepository.findById(commentId).orElseThrow(()-> new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));
        //   if ( !findComment.getMember().getEmail().equals(email)){
        //       throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_ALLOWED);
        //   }

        commentRepository.delete(findComment);
    }



}