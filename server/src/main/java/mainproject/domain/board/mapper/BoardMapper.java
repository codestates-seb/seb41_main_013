package mainproject.domain.board.mapper;


import mainproject.domain.board.dto.BoardPatchDto;
import mainproject.domain.board.dto.BoardPostDto;
import mainproject.domain.board.dto.BoardResponseDto;
import mainproject.domain.board.entity.Board;
import org.mapstruct.Mapper;

import java.util.List;


@Mapper(componentModel = "spring")
public interface BoardMapper {

    Board boardPostDtoToBoard(BoardPostDto boardPostDto);

    Board boardPatchDtoToBoard(BoardPatchDto boardPatchDto);
    BoardResponseDto boardToBoardResponseDto(Board board);


    List<BoardResponseDto> boardsToBoardResponseDtos(List<Board> questions);
}

