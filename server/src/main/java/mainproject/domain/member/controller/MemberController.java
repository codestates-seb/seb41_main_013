package mainproject.domain.member.controller;


import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import mainproject.domain.image.service.ImageService;
import mainproject.domain.member.dto.MemberPatchDto;
import mainproject.domain.member.dto.MemberPostDto;
import mainproject.domain.member.dto.MemberResponseDto;
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
@Api(tags = "회원 가입, 조회, 삭제, 수정")
public class MemberController {

    private final MemberService memberService;

    private final MemberMapper mapper;

    private final ImageService imageService;

    @Autowired // 스피링 DI에서 사용 되는 어노테이션 의존성 주입 어노테이션이다.
    public MemberController(MemberService memberService, MemberMapper mapper, ImageService imageService) {
        this.memberService =memberService;
        this.mapper = mapper;
        this.imageService = imageService;
    }

    // 회원 가입

    @ApiOperation(value = "회원 가입", notes = "회원-닉네임, 회원-이메일, 회원-비밀번호를 입력히여 회원가입을 합니다. ")
    @PostMapping // 요청 URL에 매핑된 API에 대한 설명
    public ResponseEntity postMember(@ApiParam(name = "회원 가입 상세 정보", value = postMemberDescription, required = true)@RequestBody @Valid MemberPostDto memberPostDto) {
        Member member = mapper.memberPostDtoToMember(memberPostDto);
        Member createdMember = memberService.createdMember(member);

        MemberResponseDto response = mapper.memberToMemberResponseDto(createdMember);

        response.setProfileImageUrl(imageService.createPresignedUrl(createdMember.getImage().getImageId()));

        return new ResponseEntity(response, HttpStatus.CREATED);
    }
    final String postMemberDescription = "email: 이메일 (adc@naver.com)" +"\r\n" +
            "name: 회원 이름 입력(홍길동)"+ "\r\n" + "password: 회원 비밀번호 입력 (min: 8 max: 16)";


    // 사용자 정보 조회 (마이페이지 조회)

    @ApiOperation(value = "특정 회원 조회", notes = "회원-식별자를 이용하여 특정 회원을 조회합니다")
    @GetMapping("/{member-id}")
    public ResponseEntity getMember(@ApiParam("회원-식별자를 입력 하세요")@PathVariable("member-id") long id) {

        System.out.println("id" +  id);

        Member member = memberService.findMember(id);

        MemberResponseDto response = mapper.memberToMemberResponseDto(member);

        response.setProfileImageUrl(imageService.createPresignedUrl(member.getImage().getImageId()));

        return  new ResponseEntity(response,
                HttpStatus.OK);

    }

    //사용자 정보 수정
    @ApiOperation(value = "특정 회원 정보 수정", notes = "회원-식별자와 수정데이터를 이용하여 특정 회원을 수정")
    @PatchMapping("/{member-id}")
    public ResponseEntity PatchMember(@PathVariable("member-id") long id,
                                      @ApiParam(name ="회원 정보 수정") @RequestBody MemberPatchDto memberPatchDto) {

        System.out.println("MemberController.patchMember");

        memberPatchDto.setId(id);

        Member member = memberService.updateMember(mapper.memberPatchDtoToMember(memberPatchDto));

        MemberResponseDto response = mapper.memberToMemberResponseDto(member);

        response.setProfileImageUrl(imageService.createPresignedUrl(member.getImage().getImageId()));

        return  new ResponseEntity<>(response,
                HttpStatus.OK);


    }


    // 사용자 정보 삭제 (회원 탈퇴)

    @ApiOperation(value="특정 회원 삭제", notes = "회원-식별자를 이용하여 특정 회원을 삭제합니다.")
    @DeleteMapping("/{member-id}")
    public ResponseEntity deleteMember(@PathVariable("member-id") long id) {
        System.out.println("MemberController.deleteMember");

        memberService.deleteMember(id);

        return new ResponseEntity(HttpStatus.NO_CONTENT);



    }


}
