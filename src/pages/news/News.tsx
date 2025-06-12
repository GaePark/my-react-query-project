import React, {useState} from 'react';
import {useQuery} from "@tanstack/react-query";
import axios, {AxiosError, AxiosResponse} from "axios";
import Loading from "../../components/Loading";
interface NewsInterface {
    title:string,
    description:string,
    originallink:string,
    pubDate:string,
    link:string
}
interface NewsData {
    items:NewsInterface[];
}
const News = () => {
    const clean = (html: string) => html.replace(/<[^>]+>/g, "");
    const [fd,setFd] = useState<string>("맛집");
    const [search, setSearch] = useState<string>("");
    const {isLoading,isError,error,data,refetch:findnews}=useQuery<AxiosResponse<NewsData>,AxiosError>({
        queryKey:["recipe-find",fd],
        queryFn: async () => await axios.get(`http://localhost:3355/news/find`,{
            params:{
                query:fd
            }
        })
    })

    const onClickFind = () => {
        setFd(search)
        findnews()
        console.log(data?.data.items)
    }

    if (isLoading) return <Loading/>
    if (isError)
        return <h1 className={"text-center"}>{error?.message}</h1>
    const news = data?.data.items;
    if(!news) return <Loading/>
    return (
        <section className="container px-4 mx-auto mt-20 space-y-4 mb-7">
            {/* 🔍 검색창 */}
            <div className="flex justify-end w-full">
                <div className="flex gap-2 w-full max-w-md">
                    <input
                        type="text"
                        placeholder="맛집"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="flex-grow px-3 py-2 text-sm text-gray-800 placeholder-gray-500 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-stone-400 transition"
                    />
                    <button
                        onClick={onClickFind}
                        type="button"
                        className="px-4 py-2 text-sm text-white bg-stone-800 hover:bg-stone-700 rounded-md shadow-sm transition whitespace-nowrap"
                    >
                        검색
                    </button>
                </div>
            </div>

            {/* 📰 뉴스 리스트 */}
            <div className="divide-y divide-gray-200">
                {news.map((el, i) => (
                    <div key={i} className="py-4">
                        <div className="flex justify-between items-center text-xs text-gray-500 mb-1">
                            <span>{el.pubDate}</span>
                        </div>
                        <h2 className="text-base font-semibold text-gray-800 mb-1 line-clamp-2">{el.title}</h2>
                        <p className="text-sm text-gray-600 mb-2 line-clamp-3"> {clean(el.description)}</p>
                        {el.link && (
                            <a
                                href={el.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-blue-600 hover:underline"
                            >
                                기사 전체 보기 →
                            </a>
                        )}
                    </div>
                ))}
            </div>
        </section>

    );
};

export default News;