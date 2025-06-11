import React, {JSX, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useMutation, useQuery} from "@tanstack/react-query";
import {AxiosResponse, AxiosError} from "axios";
import apiClient from "../../http-commons";
import {Board} from "../../types/types";
import Loading from "../../components/Loading";

const BoardUpdate = ():JSX.Element => {
    const id:string|null= window.sessionStorage.getItem("id");
    const name:string|null= window.sessionStorage.getItem("name");
    const [subject, setSubject] = useState("");
    const [content, setContent] = useState("");
    const nav = useNavigate();
    const {no} = useParams<{no: string}>();

    const {isLoading,isError,error,data} = useQuery<AxiosResponse<Board>,AxiosError>({
        queryKey:["boardDetail",no],
        queryFn:async () => {
            return await apiClient.get(`board/update/${no}`)
        },
    })

    useEffect(() => {
        if(data?.data.id !==id)
        {
            alert("수정할 수 없는 게시글입니다.")
            nav("/")
        }
    },[no])

    useEffect(() => {
        if (data?.data) {
            setSubject(data.data.subject);
            setContent(data.data.content);
        }
    }, [data]);

    const {mutate} = useMutation<string, AxiosError>({
        mutationFn:async () => {
            const res:AxiosResponse<string>= await apiClient.post('/board/insert',{
                no,
                subject,
                id,
                name,
                content
            })
            return res.data
        },
        onSuccess:(data) => {
            if (data === "YES") {
                alert("게시글이 수정되었습니다.");
                nav(`/board/detail/${no}`, { replace: true });
            } else {
                alert("게시글 수정을 실패하였습니다.");
            }
        },
        onError:(err:AxiosError)=> {
            console.log("Login Error:",err.message);
        }
    })
    const onClickInsert = () => {
        if(subject.trim()==="") return
        if(content.trim()==="") return
        mutate();
    }


    if (isLoading) return <Loading/>

    if (isError)
        return <h1 className={"text-center"}>{error?.message}</h1>

    const board = data?.data
    if(!board) return <Loading/>
    return (
        <div className={"flex items-center justify-end flex-1"}>

            <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow space-y-4">
                <input
                    type="text"
                    value={subject}
                    onChange={(e)=>setSubject(e.target.value)}
                    placeholder="제목을 입력하세요"
                    className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                    placeholder="내용을 입력하세요"
                    onChange={(e)=>setContent(e.target.value)}
                    value={content}
                    rows={10}
                    className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 resize-none focus:ring-blue-500"
                />
                <div className={"text-center"}>
                    <button onClick={onClickInsert}
                            type="button" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                        수정하기
                    </button>
                    <button onClick={() => nav(-1)}
                            type="button" className="bg-red-600 ml-1 text-white px-4 py-2 rounded hover:bg-red-700">
                        취소하기
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BoardUpdate;