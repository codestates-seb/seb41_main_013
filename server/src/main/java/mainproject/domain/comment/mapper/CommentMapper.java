package mainproject.domain.comment.mapper;

import mainproject.domain.comment.dto.CommentPatchDto;
import mainproject.domain.comment.dto.CommentPostDto;
import mainproject.domain.comment.dto.CommentResponseDto;
import mainproject.domain.comment.entity.Comment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CommentMapper {
    Comment commentPostDtoToComment(CommentPostDto commentPostDto);

    Comment commentPatchDtoToComment(CommentPatchDto commentPatchDto);

    @Mappings({
            @Mapping(source = "member.id", target = "memberId"),
            @Mapping(source = "member.name", target = "memberName"),
            // @Mapping(source = "member.profileImage", target = "profileImage"),   // TODO: 이미지파일
            @Mapping(source = "board.boardId", target = "boardId")
    })
    CommentResponseDto commentToCommentResponseDto(Comment savedComment);

    List<CommentResponseDto> commentsToCommentResponseDtos(List<Comment> comments);



}
