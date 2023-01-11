package mainproject.domain.answer.service;

import mainproject.domain.answer.entity.Answer;
import mainproject.domain.answer.repository.AnswerRepository;
import mainproject.domain.board.entity.Board;
import mainproject.domain.board.respository.BoardRepository;
import mainproject.domain.board.service.BoardService;
import mainproject.global.exception.BusinessLogicException;
import mainproject.global.exception.ExceptionCode;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class AnswerService {
    private AnswerRepository answerRepository;
    private BoardRepository boardRepository;

    private BoardService boardService;


    public AnswerService(AnswerRepository answerRepository, BoardRepository boardRepository, BoardService boardService) {
        this.answerRepository = answerRepository;
        this.boardRepository = boardRepository;
        this.boardService = boardService;
    }

    public Answer createAnswer(Answer answer, Long boardId) {
     //   Member member = memberRepository.findByEmail(email).orElseThrow(()->new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
         Board board = boardRepository.findById(boardId).orElseThrow(()-> new BusinessLogicException(ExceptionCode.BOARD_NOT_FOUND));
     //   answer.setMember(member);
          answer.setBoard(board);
        return answerRepository.save(answer);
    }

    public Answer updateAnswer(Answer answer) {
        Answer findAnswer = answerRepository.findById(answer.getAnswerId()).orElseThrow(()-> new BusinessLogicException(ExceptionCode.ANSWER_NOT_FOUND));

     //   if ( !findAnswer.getMember().getEmail().equals(email)){
     //       throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_ALLOWED);
     //   }

        findAnswer.setContent(answer.getContent());
        findAnswer.setModifiedAt(LocalDateTime.now().withNano(0));

        return answerRepository.save(findAnswer);
    }


    public Answer findAnswers(long boardId) {
        boardService.findVerifiedMember(boardId);
        return answerRepository.save(findAnswers(boardId));
    }



    public void deleteAnswer(Long answerId) {
        Answer findAnswer = answerRepository.findById(answerId).orElseThrow(()-> new BusinessLogicException(ExceptionCode.ANSWER_NOT_FOUND));
     //   if ( !findAnswer.getMember().getEmail().equals(email)){
     //       throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_ALLOWED);
     //   }

        answerRepository.delete(findAnswer);
    }

}
