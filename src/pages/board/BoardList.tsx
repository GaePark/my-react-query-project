import React, {useEffect} from 'react';
import {Link, useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {BoardListData} from "../../types/types";
import {AxiosResponse,AxiosError} from "axios";
import apiClient from "../../http-commons";
import Loading from "../../components/Loading";
import * as S from "./BoardStyled";
import ListComponent from "./ListComponent";

const BoardList = () => {
    const {page} = useParams<{page:string}>();
    const curPage = Number(page) || 1;

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
            <div className={"text-right"}>
                <button
                    type="button"
                    className="px-4 py-2 text-sm text-white bg-stone-800 hover:bg-stone-700 rounded-md shadow-sm transition whitespace-nowrap"
                >
                    글쓰기
                </button>
            </div>
            <S.Row>
                <ListComponent/>
            </S.Row>
        </S.Container>
    );
};

export default BoardList;