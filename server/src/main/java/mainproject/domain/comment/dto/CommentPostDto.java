package mainproject.domain.comment.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import mainproject.domain.board.entity.Board;
import mainproject.domain.member.entity.Member;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;


@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CommentPostDto {
    @NotNull
    @Positive
    private Long memberId;

    @ApiModelProperty(hidden = true)
    public Member getMember() {
        Member member = new Member();
        member.setId(memberId);
        return member;
    }

    private long boardId;

    @ApiModelProperty(hidden = true)
    public Board getBoard(){
        Board board = new Board();
        board.setBoardId(boardId);
        return board;
    }


    @NotBlank
    private String content;
}