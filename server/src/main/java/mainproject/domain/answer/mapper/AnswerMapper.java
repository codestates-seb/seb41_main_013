package mainproject.domain.answer.mapper;

import mainproject.domain.answer.dto.AnswerPatchDto;
import mainproject.domain.answer.dto.AnswerPostDto;
import mainproject.domain.answer.dto.AnswerResponseDto;
import mainproject.domain.answer.entity.Answer;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface AnswerMapper {
    Answer answerPostDtoToAnswer(AnswerPostDto answerPostDto);

    Answer answerPatchDtoToAnswer(AnswerPatchDto answerPatchDto);

    @Mapping(source = "member.id", target = "memberId")
    @Mapping(source = "member.name", target = "name")
    @Mapping(source = "board.boardId", target = "boardId")
    AnswerResponseDto answerToAnswerResponseDto(Answer savedAnswer);

    List<AnswerResponseDto> answersToAnswerResponseDtos(List<Answer> answers);



}
