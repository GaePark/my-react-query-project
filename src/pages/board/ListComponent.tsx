import React from 'react';
import * as S from "./BoardStyled";

/*
interface ListProps {
    title: string;
    content: string;
    writer: string;
    date: string;
    hit: number;
    onClick?: () => void;
}
*/

const ListComponent = () => {
    return (
        <S.ListBox >
            <S.ListTitle>제목</S.ListTitle>
            <S.ListText>내용</S.ListText>
            <S.ListMeta>
                <span>작성자: 작성자</span>
                <span>작성일 · 조회수: 조회수</span>
            </S.ListMeta>
        </S.ListBox>
    );
};

export default ListComponent;
