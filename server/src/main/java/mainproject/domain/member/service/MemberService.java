package mainproject.domain.member.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import mainproject.domain.member.entity.Member;
import mainproject.domain.member.repository.MemberRepository;
import mainproject.domain.security.redis.RedisDao;
import mainproject.domain.security.utils.CustomAuthorityUtils;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class MemberService {

    private final MemberRepository memberRepository;

    private final PasswordEncoder passwordEncoder;

    private final CustomAuthorityUtils authorityUtils;

    private final RedisDao redisDao;

    public Member createdMember(Member member) {

        // 기존 이메일 존재 / 회원 생성 실패 (verifyExistsEmail 이메일 확인)
        verifyExistsEmail(member.getEmail());

        // password 암호화
        String encryptedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encryptedPassword);

        // User Role 저장
        List<String> roles = authorityUtils.createRoles(member.getEmail());
        member.setRoles(roles);


        Member savedMember = memberRepository.save(member);

        // DB에 회원 정보 저장
        return savedMember;
    }

    public Member updateMember(Member member) { // 매개변수 member -> patchDto를 member로 변환한 객체
        Member findMember = findVerifiedMember(member.getId()); // 실제 데이터가 있는지 검증

        Optional.ofNullable(member.getName())
                .ifPresent(name -> findMember.setName(name));
        Optional.ofNullable(member.getPassword())
                .ifPresent(password -> findMember.setPassword(passwordEncoder.encode(password)));
        Optional.ofNullable(member.getImage())
                .ifPresent(image -> findMember.setImage(image));

        Member saveMember = memberRepository.save(findMember);

        return saveMember;

    }

    public Member findMember(long id) {
        return findVerifiedMember(id);
    }

    public void deleteMember(long id) {
        Optional<Member> optionalMember = memberRepository.findById(id);
        Member member = optionalMember.orElseThrow(() ->
                new NoSuchElementException(ExceptionMessage.MEMBER_NOT_FOUND.get()));

        redisDao.deleteValues(member.getEmail()); // 해당 회원의 refreshToken 을 redis 에서 삭제

        memberRepository.deleteById(id);
    }

    private void verifyExistsEmail(String email) {
        Optional<Member> optionalMember = memberRepository.findByEmail(email);
        if(optionalMember.isPresent()) {
            throw new DuplicateKeyException(ExceptionMessage.MEMBER_EMAIL_DUPLICATES.get());
        }
    }
    public Member findVerifiedMember(long id) { // ChallengeService에서 사용하기 위해 public으로 변경
    Optional<Member> optionalMember = memberRepository.findById(id);
    Member findMember = optionalMember.orElseThrow(() ->
            new NoSuchElementException(ExceptionMessage.MEMBER_NOT_FOUND.get()));

    return findMember;
}
}