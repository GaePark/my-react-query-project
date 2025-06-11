import React from 'react';
import * as S from "./BoardStyled";
import {Link} from "react-router-dom";


interface ListProps {
    subject: string;
    content: string;
    name: string;
    dbday: string;
    hit: number;
    addr:string;
}

const ListComponent = ({subject,content,name,dbday,hit,addr}:ListProps) => {
    return (
        <S.ListBox >
            <Link to={addr}>
            <S.ListTitle>{subject}</S.ListTitle>
            <S.ListText>{content}</S.ListText>
            <S.ListMeta>
                <span>작성자: {name}</span>
                <span>{dbday} · 조회수: {hit}</span>
            </S.ListMeta>
            </Link>
        </S.ListBox>
    );
};

export default ListComponent;
