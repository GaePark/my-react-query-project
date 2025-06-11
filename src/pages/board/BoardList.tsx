import React, {useEffect} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {BoardListData} from "../../types/types";
import {AxiosResponse,AxiosError} from "axios";
import apiClient from "../../http-commons";
import Loading from "../../components/Loading";
import * as S from "./BoardStyled";
import ListComponent from "./ListComponent";

const BoardList = () => {
    const {page} = useParams<{page:string}>();
    const nav = useNavigate();
    const curPage:number = Number(page) || 1;
    const id:string|null = window.sessionStorage.getItem("id");

    const {isLoading,isError,error,data,refetch:boardList} = useQuery<AxiosResponse<BoardListData>,AxiosError>({
        queryKey:["board-list",curPage],
        queryFn:async() => {
           return await apiClient.get(`/board/list/${curPage}`)
        }
    });
    useEffect(() => {
        boardList();
    }, []);

    if (isLoading) return <Loading/>
    if (isError)
        return <h1 className={"text-center"}>{error?.message}</h1>
    const board = data?.data
    if(!board)return <></>
    return (
        <S.Container>
            <S.BtnBox >
                {id &&
                    <Link to={"/board/insert"}
                          className="px-4 py-2 text-sm text-white bg-stone-800 hover:bg-stone-700 rounded-md shadow-sm transition whitespace-nowrap"
                    >
                        글쓰기
                    </Link>
                }
            </S.BtnBox>
            <S.Row>
                {
                    board.list.map((el,i) => (
                            <ListComponent key={i}  content={el.content} subject={el.subject} hit={el.hit} name={el.name} dbday={el.dbday} addr={`/board/detail/${el.no}`}/>
                    ))
                }
            </S.Row>
            <S.Row className={"justify-center"}>
                <S.ListPaginationBox >
                    {
                        curPage > 1 &&
                         <S.PageBtn onClick={() => nav(`/board/${curPage-1}`)} >이전
                         </S.PageBtn>
                    }
                  <S.PageTextBox >Page
                    <S.PageText >{page}</S.PageText>of
                   <S.PageText>{board.totalpage}</S.PageText>
                  </S.PageTextBox>
                    {
                        curPage <board.totalpage &&
                          <S.PageBtn onClick={() => nav(`/board/${curPage+1}`)} >다음
                          </S.PageBtn>
                    }
                </S.ListPaginationBox>

            </S.Row>
        </S.Container>
    );
};

export default BoardList;