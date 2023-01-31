package mainproject.domain.board.mapper;


import mainproject.domain.board.dto.BoardPatchDto;
import mainproject.domain.board.dto.BoardPostDto;
import mainproject.domain.board.dto.BoardResponseDto;
import mainproject.domain.board.entity.Board;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import java.util.List;


@Mapper(componentModel = "spring")
public interface BoardMapper {
    Board boardPostDtoToBoard(BoardPostDto boardPostDto);

    Board boardPatchDtoToBoard(BoardPatchDto boardPatchDto);

    @Mappings({
            @Mapping(source = "member.id", target = "memberId"),
            @Mapping(source = "member.name", target = "memberName"),
            @Mapping(source = "member.image.imageId", target = "profileImageId"),
      //      @Mapping(source = "image.imageId", target = "boardImageId")
    })
    BoardResponseDto boardToBoardResponseDto(Board board);

    List<BoardResponseDto> boardsToBoardResponseDtos(List<Board> boards);


}

