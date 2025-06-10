import React, {JSX,useEffect} from 'react';
import {useQuery} from "@tanstack/react-query";
import {useNavigate,useParams,useNavigationType} from "react-router-dom";
import apiClient from "../../http-commons";
import {AxiosResponse,AxiosError} from "axios";
import {FoodDetailData} from "../../types/types";
import FoodMap from "./FoodMap";
import Loading from "../../components/Loading";



const FoodDetail = ():JSX.Element => {
    const type= useNavigationType();
    const nav = useNavigate()
    const {fno} = useParams<{fno:string}>();

    const {isLoading,isError,error,data,refetch:foodDetail} = useQuery<AxiosResponse<FoodDetailData>,AxiosError>({
        queryKey:["food-detail",fno],
        queryFn:async() => await apiClient.get(`/food/detail/${fno}`)
    })

    useEffect(() => {
        if(type!=='POP')
        {
            foodDetail();
        }
    },[])



    if (isLoading) return <Loading/>
    if (isError)
        return <h1 className={"text-center"}>{error?.message}</h1>

    const food = data?.data
    if(!food) return (
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
        <div className="container max-w-[960px] px-4 mx-auto mt-20 space-y-4 mb-7">
            <div className={"w-full"}>
                <img src={`http://www.menupan.com${food.poster}`} alt={"..."} className={"w-full h-[500px] object-cover object-center rounded-lg"} />
            </div>
            <div className="flex justify-between items-center w-full">
                <div className="border border-black rounded-full px-4 py-1 text-sm font-medium">
                    {food.type}
                </div>

                <div className="flex items-center space-x-4 text-sm text-gray-700">
                    <div className="flex items-center space-x-1">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.25 12s3.75-6.75 9.75-6.75 9.75 6.75 9.75 6.75-3.75 6.75-9.75 6.75S2.25 12 2.25 12z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                        </svg>
                        <span>{food.hit}</span>
                    </div>

                    <div className="flex items-center space-x-1 text-red-500">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            className="w-5 h-5"
                        >
                            <path
                                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
                                 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81
                                 4.5 2.09C13.09 3.81 14.76 3 16.5
                                 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4
                                 6.86-8.55 11.54L12 21.35z"
                            />
                        </svg>
                        <span>{food.likecount}</span>
                    </div>
                </div>
            </div>

            <div className="w-full  space-y-2">
                <div className="flex justify-between items-end w-full">
                    <h3 className="font-bold text-4xl">{food.name}</h3>
                    <span className="text-2xl text-yellow-300 font-semibold">{food.score}</span>
                </div>
                <div className={"flex justify-between items-center w-full"}>
                    <div >
                        <p className="text-base text-gray-700">{food.phone}</p>
                        <p className="text-base text-gray-700">{food.address}</p>
                    </div>
                    <button
                        onClick={() => nav(-1)}
                        className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-stone-800 hover:bg-stone-700 border border-stone-900 rounded-lg shadow-sm transition duration-300"
                    >
                        목록
                    </button>
                </div>
            </div>

            <hr />
            <div className={"w-full text-lg font-bold text-neutral-400"}>{food.content}</div>
            <hr />
            <table className="w-full table-fixed border border-gray-300 text-sm">
                <tbody>
                <tr className="bg-gray-100">
                    <th className="w-24 px-3 py-2 border border-gray-300 text-center align-middle">영업 시간</th>
                    <td className="px-3 py-2 border border-gray-300 bg-white">{food.time}</td>
                    <th rowSpan={3} className="w-20 px-3 py-2 border border-gray-300 text-center align-middle bg-gray-100">
                        테마
                    </th>
                    <td rowSpan={3} className="px-3 py-2 border border-gray-300 align-top whitespace-pre-wrap bg-white">
                        {food.theme}
                    </td>
                </tr>
                <tr>
                    <th className="px-3 py-2 border border-gray-300 text-center align-middle bg-gray-100">주차</th>
                    <td className="px-3 py-2 border border-gray-300 bg-white">{food.parking}</td>
                </tr>
                <tr>
                    <th className="px-3 py-2 border border-gray-300 text-center align-middle bg-gray-100">가격</th>
                    <td className="px-3 py-2 border border-gray-300 bg-white">{food.price}</td>
                </tr>
                </tbody>
            </table>
            {
                food &&
                <FoodMap address={food.address} name={food.name} />
            }
        </div>
    );
};

export default FoodDetail;