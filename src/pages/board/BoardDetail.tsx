import React, {useEffect} from 'react';
import {useNavigate, useNavigationType, useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import apiClient from "../../http-commons";
import {AxiosResponse,AxiosError} from "axios";
import {Board} from "../../types/types";
import Loading from "../../components/Loading";

const BoardDetail = () => {
    const {no} = useParams();
    const type=useNavigationType();
    const nav = useNavigate();
    const {isLoading,isError,error,data,refetch:boardDetail} = useQuery<AxiosResponse<Board>,AxiosError>({
        queryKey:["boardDetail",no],
        queryFn:async () => {
            return await apiClient.get(`board/detail/${no}`)
        },

    })
    useEffect(() => {
        if(type!=='POP')
        {
            boardDetail();
        }
    },[])

    if (isLoading) return <Loading/>

    if (isError)
        return <h1 className={"text-center"}>{error?.message}</h1>

    const board = data?.data
    if(!board) return (
        <div className="w-full h-screen flex items-center justify-center">
            <svg fill="none" className="text-surface animate-spin h-6 w-6" viewBox="0 0 64 64"
                 xmlns="http://www.w3.org/2000/svg">
                <path stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"
                      d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"></path>
                <path strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" className="text-stone-800"
                      d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
                      stroke="currentColor"></path>
            </svg>
        </div>
    )

    return (
        <div className={"flex items-start mt-40 justify-end flex-1"}>

        <div className=" max-w-3xl mx-auto p-6 bg-white rounded shadow-sm">
            <h1 className="text-3xl font-bold mb-4">{board.subject}</h1>
            <div className="text-sm text-gray-500 mb-2">
                작성자: {board.name} | 조회수: {board.hit} | 작성일: {board.dbday}
            </div>
            <hr className="mb-4" />
            <div className="prose max-w-none">
                <p>{board.content}</p>
            </div>
        </div>
        </div>
    );
};

export default BoardDetail;