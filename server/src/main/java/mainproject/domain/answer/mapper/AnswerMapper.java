package mainproject.domain.answer.mapper;

import mainproject.domain.answer.dto.AnswerPatchDto;
import mainproject.domain.answer.dto.AnswerPostDto;
import mainproject.domain.answer.dto.AnswerResponseDto;
import mainproject.domain.answer.entity.Answer;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface AnswerMapper {
    Answer answerPostDtoToAnswer(AnswerPostDto answerPostDto);

    Answer answerPatchDtoToAnswer(AnswerPatchDto answerPatchDto);

    AnswerResponseDto answerToAnswerResponseDto(Answer savedAnswer);

    List<AnswerResponseDto> answersToAnswerResponseDtos(List<Answer> answers);



}
