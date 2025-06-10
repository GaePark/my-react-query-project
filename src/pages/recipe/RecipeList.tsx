import React, {Fragment, useEffect, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {AxiosError, AxiosResponse} from "axios";
import apiClient from "../../http-commons";
import ListCard from "../../components/ListCard";
import {RecipeListData} from "../../types/types";
import {Link,useNavigate} from "react-router-dom";
import PagePrint from "../../components/PagePrint";
import {useParams} from "react-router-dom";
import Loading from "../../components/Loading";


const RecipeList = () => {
    const {page} = useParams<{page:string}>();
    const curPage = Number(page) || 1;
    const nav = useNavigate();
    const [fd,setFd]=useState<string>("");
    const {isLoading,isError,error,data,refetch:recipeList} = useQuery<AxiosResponse<RecipeListData>,AxiosError>({
        queryKey:["recipe-list",curPage],
        queryFn: async() => {
            return await apiClient.get(`/recipe/list/${curPage}`);
        },
    })
    useEffect(() => {
        recipeList();
    }, []);
    const onClickFind = () => {
        nav(`/recipe/find/${fd}`)
    }

    if (isLoading) return <Loading/>
    if (isError)
        return <h1 className={"text-center"}>{error?.message}</h1>
    return (
        <section className="container px-4 mx-auto mt-20 space-y-4 mb-7">
            <div className="flex justify-end w-full">
                <div className="flex gap-2 w-full max-w-md">
                    <input
                        type="text"
                        placeholder="예) 간식"
                        value={fd}
                        onChange={(e) => setFd(e.target.value)}
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
                    data?.data.list.map((el,i) => (
                        <Link to={`/recipe/detail/${el.no}`} key={i}>
                        <ListCard  poster={el.poster}  title={el.title} info={el.chef} likecount={el.likecount} hit={el.hit} />
                        </Link>
                    ))
                }
            </div>
            {
                data?.data &&
                <PagePrint totalpage={data.data.totalpage} startPage={data.data.startPage} curpage={curPage} type={"recipe"} endPage={data.data.endPage} />
            }
        </section>
    );
};

export default RecipeList;