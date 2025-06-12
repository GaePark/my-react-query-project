import React, {useEffect, useState} from 'react';
import {CommentInterface} from "../types/types";
import {useMutation, useQuery} from "@tanstack/react-query";
import apiClient from "../http-commons";
import Loading from "./Loading";
import {AxiosError, AxiosResponse} from "axios";

interface CommentDataInterface{
   list: CommentInterface[];
   totalpage:number;
}


const Comment = ({fno,type}:{fno:number,type:string}) => {
    const id:string|null = window.sessionStorage.getItem("id");
    const name:string|null = window.sessionStorage.getItem("name");
    const [page, setPage] = useState<number>(1);
    const [msg,setMsg]=useState<string>();
    const [editingNo, setEditingNo] = useState<number | null>(null);
    const [editText, setEditText] = useState<string>("")

    const {isLoading,isError,error,data,refetch:commentData} = useQuery<AxiosResponse<CommentDataInterface>,AxiosError>({
        queryKey:["comment",fno,type,page],
        queryFn:async () =>{
            return await apiClient.get(`/comment/list/${fno}/${type}/${page}`)
        }
    })

    useEffect(() => {
        commentData()
    }, [page]);

    const {mutate:commentInsert} = useMutation({
        mutationFn:async ():Promise<string> => {
            const res:AxiosResponse<string>= await apiClient.post('/comment/insert',{
                msg,
                id,
                name,
                type,
                fno
            })
            return res.data
        },
        onSuccess:(data) => {
            if (data === "YES") {
                setMsg("")
               commentData()
            } else {
                alert("댓글 입력을 실패하였습니다.");
            }
        },
        onError:(err:AxiosError)=> {
            console.log("Login Error:",err.message);
        }
    })

    const {mutate:commentDelete} = useMutation({
        mutationFn:async (no:number):Promise<string> => {
            const res:AxiosResponse<string>= await apiClient.delete(`/comment/delete/${no}`)
            return res.data
        },
        onSuccess:(data) => {
            if (data === "YES") {
                commentData()

            } else {
                alert("댓글 삭제를 실패했습니다.");
            }
        },
        onError:(err:AxiosError)=> {
            console.log("Login Error:",err.message);
        }
    })

    const {mutate:commentEdit} = useMutation({
        mutationFn:async ():Promise<string> => {
            const res:AxiosResponse<string>= await apiClient.put('/comment/update',{
                no:editingNo,
                msg:editText,
                id,
                name,
                type,
                fno
            })
            return res.data
        },
        onSuccess:(data) => {
            if (data === "YES") {
                commentData()
                setEditingNo(null);
            } else {
                alert("댓글 입력을 실패하였습니다.");
            }
        },
        onError:(err:AxiosError)=> {
            console.log("Login Error:",err.message);
        }
    })


    const onClickInsert = ():void => {
        if( !msg|| msg.trim()==="") return
        commentInsert();
    }
    const onClickDelete = (no:number):void => {
        if(window.confirm("댓글을 삭제하시겠습니까?")){
        commentDelete(no);
        }else{
            alert("취소하셨습니다.")
        }
    }
    const onClickEdit = (el: any) => {
        setEditingNo(el.no);
        setEditText(el.msg);
    };

    const onSaveEdit = () => {
        commentEdit()


    };

    if(isLoading)<Loading/>

    if (isError)
        return <h1 className={"text-center"}>{error?.message}</h1>

    const comment:CommentDataInterface | undefined = data?.data

    return (
        <div className="w-full mx-auto">
            <hr className={"my-2"}/>
            <div className="flex items-start gap-3 mb-6">
                {
                    id&&
                    <div className="flex-1">
                      <textarea
                          className="w-full border rounded-md p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={msg}
                          onChange={(e:any):void => setMsg(e.target.value)}
                          rows={3}
                          placeholder="댓글을 입력하세요..."
                      ></textarea>
                        <div className="flex justify-end mt-2">
                            <button onClick={onClickInsert}
                                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                                등록
                            </button>
                        </div>
                    </div>
                }

            </div>

            <div className="space-y-6">
                {comment?.list.map((el, i) => (
                    <div key={i} className="flex items-start gap-3">
                        <div className=" shadow p-4 rounded-md w-full">
                            <div className="flex justify-between items-center mb-1">
                                <span className="font-semibold text-sm">{el.name}</span>
                                <span className="text-xs text-gray-400">{el.dbday}</span>
                            </div>
                            <p className="text-sm text-gray-800">
                                {editingNo === el.no ? (
                                    <input
                                        type="text"
                                        value={editText}
                                        onChange={(e) => setEditText(e.target.value)}
                                        className="border p-1 rounded w-full"
                                    />
                                ) : (
                                    el.msg
                                )}
                            </p>
                            {id === el.id && (
                                <div className="text-right mt-2">
                                    {editingNo === el.no ? (
                                        <button
                                            onClick={onSaveEdit}
                                            className="bg-green-400 text-white px-2 py-1 rounded hover:bg-green-500 transition"
                                        >
                                            저장
                                        </button>
                                    ) : (
                                        <>
                                            <button
                                                onClick={() => onClickEdit(el)}
                                                className="bg-amber-300 text-white px-2 py-1 rounded hover:bg-amber-400 transition"
                                            >
                                                수정
                                            </button>
                                            <button
                                                onClick={() => onClickDelete(el.no)}
                                                className="bg-red-300 text-white px-2 py-1 ml-1 rounded hover:bg-red-400 transition"
                                            >
                                                삭제
                                            </button>
                                        </>
                                    )}
                                </div>
                            )}

                        </div>
                    </div>
                ))}
            </div>
            <div className="flex items-center justify-center gap-2">
                {
                    page>1&&
                    <button onClick={() => setPage(page-1)}
                            className="inline-grid place-items-center border align-middle select-none font-sans font-medium text-center transition-all duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm min-w-[34px] min-h-[34px] rounded-md bg-transparent border-transparent text-stone-800 hover:bg-stone-200/10 hover:border-stone-600/10 shadow-none hover:shadow-none">
                        <svg width="1.5em" height="1.5em" stroke-width="1.5" viewBox="0 0 24 24" fill="none"
                             xmlns="http://www.w3.org/2000/svg" color="currentColor" className="h-4 w-4 stroke-2">
                            <path d="M15 6L9 12L15 18" stroke="currentColor" stroke-linecap="round"
                                  stroke-linejoin="round"></path>
                        </svg>
                    </button>
                }
                <p className="font-sans antialiased text-base flex items-center gap-1 text-stone-600">Page
                    <span
                        className="font-sans antialiased text-base text-stone-800 dark:text-white font-semibold">{page}</span>of
                    <span
                        className="font-sans antialiased text-base text-stone-800 dark:text-white font-semibold">{comment?.totalpage}</span>
                </p>
                {
                   comment?.totalpage && page < comment.totalpage &&
                    <button onClick={() => setPage(page+1)}
                            className="inline-grid place-items-center border align-middle select-none font-sans font-medium text-center transition-all duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm min-w-[34px] min-h-[34px] rounded-md bg-transparent border-transparent text-stone-800 hover:bg-stone-200/10 hover:border-stone-600/10 shadow-none hover:shadow-none">
                        <svg width="1.5em" height="1.5em" stroke-width="1.5" viewBox="0 0 24 24" fill="none"
                             xmlns="http://www.w3.org/2000/svg" color="currentColor" className="h-4 w-4 stroke-2">
                            <path d="M9 6L15 12L9 18" stroke="currentColor" stroke-linecap="round"
                                  stroke-linejoin="round"></path>
                        </svg>
                    </button>
                }

            </div>
        </div>

    );
};

export default Comment;