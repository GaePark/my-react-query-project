import React, {useEffect} from 'react';
import {useNavigate, useNavigationType, useParams} from "react-router-dom";
import {useMutation, useQuery} from "@tanstack/react-query";
import apiClient from "../../http-commons";
import {AxiosResponse,AxiosError} from "axios";
import {Board} from "../../types/types";
import Loading from "../../components/Loading";
import * as S from "./BoardDetailStyle"
import Comment from "../../components/Comment";
const BoardDetail = () => {
    const id:string|null = window.sessionStorage.getItem("id");
    const {no} = useParams<{no:string}>();
    const type=useNavigationType();
    const nav = useNavigate();
    const {isLoading,isError,error,data,refetch:boardDetail} = useQuery<AxiosResponse<Board>,AxiosError>({
        queryKey:["boardDetail",no],
        queryFn:async () => {
            return await apiClient.get(`board/detail/${no}`)
        },
    })
    const {mutate} = useMutation({
        mutationFn:async () => {
            const res = await apiClient.delete(`board/delete/${no}`);
            return res.data;
        },
        onSuccess:(data) => {
            if (data === "YES") {
                alert("게시글을 삭제하였습니다.");
                nav("/board/1"); // 목록 등 원하는 경로로 이동
            } else {
                alert("게시글 삭제에 실패하였습니다.");
            }
        },
        onError:(err:AxiosError)=> {
            console.log("Login Error:",err.message);
        }
    })

    useEffect(() => {
        if(type!=='POP')
        {
            boardDetail();
        }
    },[])

    const onClickDelete = () => {
        if (window.confirm("삭제하시겠습니까?")) {
            mutate();
        } else {
            alert("취소되었습니다.");
        }
    }

    if (isLoading) return <Loading/>

    if (isError)
        return <h1 className={"text-center"}>{error?.message}</h1>

    const board = data?.data
    if(!board) return <Loading/>


    return (
        <S.Container >
            <S.DetailBox >
                <S.BoardSubject className="text-4xl font-bold mb-6">{board.subject}</S.BoardSubject>

                <S.BoardNameBox >
                    작성자: <S.BoardName >{board.name}</S.BoardName> | 조회수: {board.hit} | 작성일: {board.dbday}
                </S.BoardNameBox>

                <hr className="mb-6" />

                <S.BoardContent>
                    {board.content}
                </S.BoardContent>
                <S.BoardBtnBox>
                    {
                        id===board.id &&
                        <>
                            <S.BoardBtn onClick={()=> nav(`/board/update/${board.no}`)} className={"bg-blue-500 hover:bg-blue-400"}>수정</S.BoardBtn>
                            <S.BoardBtn onClick={onClickDelete} className={"bg-red-500 hover:bg-red-400"}>삭제</S.BoardBtn>
                        </>
                    }

                    <S.BoardBtn onClick={()=>nav(-1)} className={"bg-neutral-800 hover:bg-neutral-700"}>목록</S.BoardBtn>
                </S.BoardBtnBox>
            <Comment fno={board.no} type={"board"}/>
            </S.DetailBox>
        </S.Container>
    );
};

export default BoardDetail;