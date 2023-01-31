package mainproject.domain.board.service;

import mainproject.domain.board.entity.Board;
import mainproject.domain.board.respository.BoardRepository;


import mainproject.domain.member.entity.Member;
import mainproject.domain.member.service.MemberService;
import mainproject.global.category.Category;
import mainproject.global.exception.BusinessLogicException;
import mainproject.global.exception.ExceptionCode;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;


import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
public class BoardService {

    private final BoardRepository boardRepository;
    private final MemberService memberService;

    public BoardService(BoardRepository boardRepository, MemberService memberService) {
        this.boardRepository = boardRepository;
        this.memberService = memberService;
    }


    public Board saveBoard(Board board) {
        Member member = memberService.findVerifiedMember(board.getMember().getId());    // 회원여부 검증
        board.setMember(member);

        board.setBoardId(boardRepository.findAll().size() + 1L);
        boardRepository.save(board);
        return board;
    }


    public Board updateBoard(long boardId, Board board) {


    Board findboard = boardRepository.findById(boardId).orElseThrow();
        Optional.ofNullable(board.getTitle())
                .ifPresent(title -> findboard.setTitle(title));
        Optional.ofNullable(board.getContent())
                .ifPresent(content -> findboard.setContent(content));
        Optional.ofNullable(board.getCategory())
                .ifPresent(category -> findboard.setCategory(category));
//        Optional.ofNullable(board.getImage())
//                .ifPresent(image -> findboard.setImage(image));
        return boardRepository.save(findboard);


    }


    public Board findBoard(long boardId) {
        return findVerifiedMember(boardId);
    }

    public Page<Board> findBoards(Category category, int page, int size) {

        if (category == null) {
            return boardRepository.findAll(PageRequest.of(page, 15, Sort.by("createdAt").descending()));
        } else {
            return boardRepository.findByCategory(category, PageRequest.of(page, 15, Sort.by("createdAt").descending()));
        }
    }


    public Board findVerifiedMember(long boardId) {
        Optional<Board> optionalBoard = boardRepository.findById(boardId);
        Board findBoard = optionalBoard.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.BOARD_NOT_FOUND));

        return findBoard;
    }


    public Page<Board> searchBoards(String query, int page) {

        String[] words = query.split(" ");
        List<Board> results = new ArrayList<>();

        for (String w : words) {
            List<Board> result =
                    boardRepository.findAll().stream()
                            .filter(c -> c.getTitle().contains(w) || c.getContent().contains(w))
                            .collect(Collectors.toList());
            results.addAll(result);
        }

        results = results.stream()
                .sorted(Comparator.comparing(Board::getBoardId).reversed())
                .collect(Collectors.toList());

        PageRequest pageRequest = PageRequest.of(page, 10);
        int start = (int) pageRequest.getOffset();
        int end = Math.min((start + pageRequest.getPageSize()), results.size());

        return new PageImpl<>(results.subList(start, end), pageRequest, results.size());
    }


    public void deleteBoard(long boardId) {
        boardRepository.deleteById(boardId);
    }




    public boolean checkMember(Member principal, long boardId) {
        Optional<Board> optionalBoard = boardRepository.findById(boardId);

        return optionalBoard.isPresent()
                && optionalBoard.get().getMember().getEmail().equals(principal.getEmail());
    }


}
