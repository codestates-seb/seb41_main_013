package mainproject.domain.answer.controller;

import mainproject.domain.answer.dto.AnswerPatchDto;
import mainproject.domain.answer.dto.AnswerPostDto;
import mainproject.domain.answer.dto.AnswerResponseDto;
import mainproject.domain.answer.entity.Answer;
import mainproject.domain.answer.mapper.AnswerMapper;
import mainproject.domain.answer.service.AnswerService;
import mainproject.global.dto.MultiResponseDto;
import mainproject.global.dto.SingleResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;


@RestController
@RequestMapping("/api/answers")
public class AnswerController {

    AnswerService answerService;
    AnswerMapper answerMapper;

    public AnswerController(AnswerService answerService, AnswerMapper answerMapper) {
        this.answerService = answerService;
        this.answerMapper = answerMapper;
    }


    @PostMapping("/{board-id}")
    public ResponseEntity postAnswer(@PathVariable("board-id") long boardId,
                                     @RequestBody AnswerPostDto answerPostDto){
        Answer answer = answerMapper.answerPostDtoToAnswer(answerPostDto);
        Answer savedAnswer = answerService.createAnswer(answer, boardId);
        AnswerResponseDto response = answerMapper.answerToAnswerResponseDto(savedAnswer);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PatchMapping("/{answer-id}")
      public ResponseEntity patchAnswer(@PathVariable("answer-id") long answerId,
                                        @Valid @RequestBody AnswerPatchDto answerPatchDto){

        Answer answer = answerMapper.answerPatchDtoToAnswer(answerPatchDto);
        answer.setAnswerId(answerId);
        Answer response = answerService.updateAnswer(answer);

        return new ResponseEntity<>(answerMapper.answerToAnswerResponseDto(response), HttpStatus.OK);
    }

    @GetMapping("/{board-id}")
     public ResponseEntity getAnswer(@PathVariable("board-id") Long boardId) {
        Answer response = answerService.findAnswers(boardId);
        return new ResponseEntity<>(new SingleResponseDto<>(answerMapper.answerToAnswerResponseDto(response)),HttpStatus.OK);
    }

    @DeleteMapping("/{answer-id}")
       public ResponseEntity deleteAnswer(@PathVariable("answer-id") long answerId){
        answerService.deleteAnswer(answerId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
