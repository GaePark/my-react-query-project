import React, {useEffect, useState} from 'react';
import {useQuery} from "@tanstack/react-query";
import axios, {AxiosError, AxiosResponse} from "axios";
import {FoodFindData} from "../../types/types";
import apiClient from "../../http-commons";
import {Link, useNavigate, useParams} from "react-router-dom";
import ListCard from "../../components/ListCard";
import PagePrint from "../../components/PagePrint";
import Loading from "../../components/Loading";

interface FindInterface{
    fList: FoodFindData[];
    totalpage:number;
}

const FoodFInd = () => {
    const {fd} = useParams<{fd:string}>();
    const nav = useNavigate()
    const [curpage,setCurpage]= useState<number>(1);
    const [title,setTitle]= useState<string>(fd? fd:"간식");

    const {isLoading,isError,error,data}=useQuery<AxiosResponse<FindInterface>,AxiosError>({
        queryKey:["recipe-find",fd,curpage],
        queryFn: async () => await axios.get(`http://localhost:3355/food/find?fd=${title}&page=${curpage}`)
    })
    const onClickFind = () => {
        setCurpage(1)
        nav(`/food/find/${title}`)
    }

    if (isLoading) return <Loading/>
    if (isError)
        return <h1 className={"text-center"}>{error?.message}</h1>
    const food = data?.data
    if(!food) return <Loading/>
    return (
        <section className="container px-4 mx-auto mt-20 space-y-4 mb-7">
            <div className="flex justify-end w-full">
                <div className="flex gap-2 w-full max-w-md">
                    <input
                        type="text"
                        placeholder="예) 간식"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="flex-grow px-3 py-2 text-sm text-gray-800 placeholder-gray-500 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-stone-400 transition"
                    />
                    <button onClick={onClickFind}
                            type="button"
                            className="px-4 py-2 text-sm text-white bg-stone-800 hover:bg-stone-700 rounded-md shadow-sm transition whitespace-nowrap"
                    >
                        검색
                    </button>
                </div>
            </div>
            <div className={"grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 " }>
                {
                    data?.data.fList.map((el,i) => (
                        <Link to={`/food/detail/${el.FNO}`} key={i}>
                            <ListCard  poster={`http://www.menupan.com${el.POSTER}`}  title={el.NAME} info={el.ADDRESS} likecount={el.LIKECOUNT} hit={el.HIT} />
                        </Link>
                    ))
                }
            </div>
            <div className="flex items-center justify-center gap-2">
                {
                    curpage>1&&
                    <button onClick={() => setCurpage(curpage-1)}
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
                        className="font-sans antialiased text-base text-stone-800 dark:text-white font-semibold">{curpage}</span>of
                    <span
                        className="font-sans antialiased text-base text-stone-800 dark:text-white font-semibold">{food.totalpage}</span>
                </p>
                {
                    curpage < food.totalpage &&
                    <button onClick={() => setCurpage(curpage+1)}
                            className="inline-grid place-items-center border align-middle select-none font-sans font-medium text-center transition-all duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm min-w-[34px] min-h-[34px] rounded-md bg-transparent border-transparent text-stone-800 hover:bg-stone-200/10 hover:border-stone-600/10 shadow-none hover:shadow-none">
                        <svg width="1.5em" height="1.5em" stroke-width="1.5" viewBox="0 0 24 24" fill="none"
                             xmlns="http://www.w3.org/2000/svg" color="currentColor" className="h-4 w-4 stroke-2">
                            <path d="M9 6L15 12L9 18" stroke="currentColor" stroke-linecap="round"
                                  stroke-linejoin="round"></path>
                        </svg>
                    </button>
                }

            </div>

        </section>
    );
};

export default FoodFInd;