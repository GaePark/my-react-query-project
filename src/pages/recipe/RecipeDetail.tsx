import React, {JSX, useEffect} from 'react';
import {useNavigate, useNavigationType, useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import apiClient from "../../http-commons";
import {AxiosResponse,AxiosError} from "axios";
import {RecipeDetailResponse} from "../../types/types";
import Loading from "../../components/Loading";
import Comment from "../../components/Comment";

const RecipeDetail = ():JSX.Element => {
        const type= useNavigationType();
        const {no} = useParams();
        const nav = useNavigate()
        const {isLoading,isError,error,data,refetch:recipeDetail} = useQuery<AxiosResponse<RecipeDetailResponse>,AxiosError>({
            queryKey:["recipe-detail",no]
            ,queryFn:async() => await apiClient.get(`/recipe/detail/${no}`)
        })

    useEffect(() => {
        if(type!=='POP')
        {
            recipeDetail();
        }
    },[])


    if (isLoading) return <Loading/>
    if (isError)
        return <h1 className={"text-center"}>{error?.message}</h1>

    const recipe = data?.data
    if(!recipe) return <Loading/>

    return (
        <div className="container max-w-[960px] px-4 mx-auto mt-20 space-y-4 mb-7">
            <div className={"w-full"}>
                <img src={recipe.vo.poster} alt={"..."} className={"w-full h-[500px] object-cover object-center rounded-lg"} />
            </div>
            <div className={"mx-auto max-w-xl flex items-center justify-between"}>
                <img src={"/images/a1.png"} alt={"..."} />
                <img src={"/images/a2.png"} alt={"..."} />
                <img src={"/images/a3.png"} alt={"..."} />
            </div>
            <div className={"mx-auto max-w-xl flex items-center justify-between"}>
                <p className={"w-12  text-center font-bold text-neutral-700"}>{recipe.vo.info1}</p>
                <p className={"w-12  text-center font-bold text-neutral-700"}>{recipe.vo.info2}</p>
                <p className={"w-12  text-center font-bold text-neutral-700"}>{recipe.vo.info3}</p>
            </div>
            <h3 className={"font-bold text-4xl"} >{recipe.vo.title}</h3>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full space-y-4 md:space-y-0 md:space-x-6">
                <div className="flex items-center py-1.5 px-2.5 rounded-md align-middle select-none font-sans transition-all duration-300 ease-in aria-disabled:opacity-50 aria-disabled:pointer-events-none bg-transparent text-stone-600 hover:text-stone-800 dark:hover:text-white hover:bg-stone-200 focus:bg-stone-200 focus:text-stone-800 dark:focus:text-white dark:data-[selected=true]:text-white dark:bg-opacity-70">
                    <span className="grid place-items-center shrink-0 me-2.5">
                      <img src={recipe.vo.chef_poster}
                           alt="profile-picture" className="inline-block object-cover object-center w-11 h-11 rounded-md"/>
                    </span>
                    <div>
                        <p className="font-sans antialiased text-base text-stone-800 dark:text-white font-semibold">{recipe.vo.chef}</p>
                        <small className="font-sans antialiased text-sm text-stone-600">{recipe.vo.chef_profile}</small>
                    </div>
                </div>

                <div className="md:shrink-0 self-end md:self-auto">
                    <button
                        onClick={() => nav(-1)}
                        className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-stone-800 hover:bg-stone-700 border border-stone-900 rounded-lg shadow-sm transition duration-300"
                    >
                        목록
                    </button>
                </div>
            </div>

            <hr/>
            <p className={" text-xl"}>[재료]</p>
            <div className="flex flex-wrap gap-2">
                {recipe.dList.map((el, i) => (
                    <span
                        key={i}
                        className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full border border-blue-300"
                    >
                  {el}
                </span>
                ))}
            </div>
            <hr/>
            <div>
                <p className={" text-xl"}>[조리 순서]</p>
                {
                    recipe.iList.map((el,i) => (
                        <div className="flex items-center justify-between gap-4 mb-3" key={i}>
                            <p className="text-base text-gray-800 w-1/2">{recipe.mList[i]}</p>
                            <img src={el} alt="..." className="w-40 h-auto rounded-lg shadow" />
                        </div>
                    ))
                }
            </div>
            <Comment fno={recipe.vo.no} type={"recipe"}/>

        </div>
    );
};

export default RecipeDetail;