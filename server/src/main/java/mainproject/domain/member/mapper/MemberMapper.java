package mainproject.domain.member.mapper;

import mainproject.domain.member.dto.*;
import mainproject.domain.member.entity.Member;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class MemberMapper {

    public Member memberPostDtoToMember(MemberPostDto memberPostDto) {
        if(memberPostDto == null) return null;

        Member member = new Member();
        member.setName(memberPostDto.getName());
        member.setEmail(memberPostDto.getEmail());
        member.setPassword(memberPostDto.getPassword());
        member.setImage(memberPostDto.getImage());

        return member;

    }

    public Member memberPatchDtoToMember(MemberPatchDto memberPatchDto) {
        if (memberPatchDto == null) return null;

        Member member = new Member();
        member.setId(memberPatchDto.getId());
        member.setName(memberPatchDto.getName());
        member.setPassword(memberPatchDto.getPassword());
        member.setImage(memberPatchDto.getImage());

        return member;
    }

    public MemberResponseDto memberToMemberResponseDto(Member member) {
        if (member == null) return null;

        MemberResponseDto responseDto = new MemberResponseDto();

        responseDto.setId(member.getId());
        responseDto.setName(member.getName());
        responseDto.setEmail(member.getEmail());
        responseDto.setProfileImageId(member.getImage().getImageId());

        return responseDto;

    }

    public List<MemberResponseDto> membersToMemberResponses (List<Member> members){
        if (members == null) return null;

        List<MemberResponseDto> list = new ArrayList<>(members.size());
        for (Member member : members) {
            list.add(memberToMemberResponseDto(member));
        }
        return  list;
    }

}
