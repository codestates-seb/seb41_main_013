package mainproject.domain.member.controller;


import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import mainproject.domain.member.dto.MemberPatchDto;
import mainproject.domain.member.dto.MemberPostDto;
import mainproject.domain.member.entity.Member;
import mainproject.domain.member.mapper.MemberMapper;
import mainproject.domain.member.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/members")
public class MemberController {

    private final MemberService memberService;

    private final MemberMapper mapper;

    @Autowired // 스피링 DI에서 사용 되는 어노테이션 의존성 주입 어노테이션이다.
    public MemberController(MemberService memberService, MemberMapper mapper) {
        this.memberService =memberService;
        this.mapper = mapper;
    }

    // 회원 가입
    @ApiOperation(value = "회원 가입", notes = "회원-닉네임, 회원-이메일, 회원-비밀번호를 입력히여 회원가입을 합니다. ")
    @PostMapping // 요청 URL에 매핑된 API에 대한 설명
    public ResponseEntity postMember(@RequestBody @Valid MemberPostDto memberPostDto) {
        Member member = mapper.memberPostDtoToMember(memberPostDto);
        Member createdMember = memberService.createdMember(member);

        return new ResponseEntity(mapper.memberToMemberResponseDto(createdMember), HttpStatus.CREATED);
    }

    // 사용자 정보 조회 (마이페이지 조회)

    @ApiOperation(value = "특정 회원 조회", notes = "회원-식별자를 이용하여 특정 회원을 조회")
    @GetMapping("/{member-id}")
    public ResponseEntity getMember(@ApiParam("회원-식별자")@PathVariable("member-id") long id) {
        System.out.println("id" +  id);

        Member response = memberService.findMember(id);

        return  new ResponseEntity(mapper.memberToMemberResponseDto(response),
                HttpStatus.OK);

    }
    //사용자 정보 수정
    @ApiOperation(value = "특정 회원 정보 수정", notes = "회원-식별자와 수정데이터를 이용하여 특정 회원을 수정")
    @PatchMapping("/{member-id}")
    public ResponseEntity PatchMember(@ApiParam("회원-식별자")@PathVariable("member-id") long id,
                                      @RequestBody MemberPatchDto memberPatchDto) {

        System.out.println("MemberController.patchMember");

        memberPatchDto.setId(id);

        Member member = memberService.updateMember(mapper.memberPatchDtoToMember(new MemberPatchDto()));

        return  new ResponseEntity<>(mapper.memberToMemberResponseDto(member),
                HttpStatus.OK);
    }

    // 사용자 정보 삭제 (회원 탈퇴)

    @ApiOperation(value="특정 회원 삭제", notes = "회원-식별자를 이용하여 특정 회원을 삭제합니다.")
    @DeleteMapping("/{member-id}")
    public ResponseEntity deleteMember(@ApiParam("회원-식별자") @PathVariable("member-id") long id) {
        System.out.println("MemberController.deleteMember");

        memberService.deleteMember(id);

        return new ResponseEntity(HttpStatus.NO_CONTENT);

    }

}
