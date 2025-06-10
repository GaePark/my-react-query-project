
import {useQuery} from "@tanstack/react-query";
import {AxiosResponse} from "axios";
import apiClient from "../../http-commons";
import ListCard from "../../components/ListCard";
import {FoodListData} from "../../types/types";
import {Link, useNavigate} from "react-router-dom";
import PagePrint from "../../components/PagePrint";
import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import Loading from "../../components/Loading";


const RecipeList = () => {
    const {page} = useParams<{page:string}>();
    const curPage = Number(page) || 1;
    const nav = useNavigate();
    const [fd,setFd]=useState<string>("");

    const {isLoading,isError,error,data,refetch:foodList} = useQuery<AxiosResponse<FoodListData>,Error>({
        queryKey:["food-list",curPage],
        queryFn: async() => {
            return await apiClient.get(`/food/list/${curPage}`);
        }
    })
    useEffect(() => {
        foodList();
    }, []);
    const onClickFind = () => {
        nav(`/food/find/${fd}`)
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
                        placeholder="예) 서울"
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
                        <Link to={`/food/detail/${el.fno}`} key={i}>
                            <ListCard  poster={`http://www.menupan.com${el.poster}`}  title={el.name} info={el.phone} likecount={el.likecount} hit={el.hit} />
                        </Link>
                    ))
                }
            </div>
            {
                data?.data &&
                <PagePrint totalpage={data.data.totalpage} startPage={data.data.startPage} curpage={curPage} type={"food"} endPage={data.data.endPage} />
            }
        </section>
    );
};

export default RecipeList;