import React, {Fragment, useEffect, useState} from 'react';

import { Navigation} from "swiper/modules";
import {SwiperSlide,Swiper} from "swiper/react";
import {useQuery} from "@tanstack/react-query";
import {Link} from "react-router-dom";
import apiClient from "../../http-commons";
import ListCard from "../../components/ListCard";
import Loading from "../../components/Loading";


interface MainData {

    fList: {
        name: string;
        type: string;
        fno: number;
        phone: string;
        poster: string;
        num: number;
        likecount:number;
        hit:number
    }[];
    rList: {
        title: string;
        likecount: number;
        hit: number;
        poster: string;
        no: number;
        chef: string;
        num: number;
    }[];
    bList:{
        name:string;
        subject:string;
        hit:number;
        no:number;
        dbday:string;
        num:string;
    }[]

}

const Home = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [show, setShow] = useState(false);
    useEffect(() => {
        // 컴포넌트가 마운트된 후 100ms 뒤에 show=true로 설정
        const timeout = setTimeout(() => setShow(true), 100);
        return () => clearTimeout(timeout);
    }, []);
    const {isLoading, isError, error, data} = useQuery<{ data: MainData }, Error>({
        queryKey: ["main-data"],
        queryFn: async () => await apiClient.get("http://localhost/main")
    })
    if (isLoading) return <Loading/>
    if (isError)
        return <h1 className={"text-center"}>{error?.message}</h1>
    console.log(data)
    return (
        <Fragment>
            <div className={"w-full h-screen bg-cover bg-center flex items-center justify-center"}
                 style={{backgroundImage: `url(/images/header.png)`}}>
                <div className={"container px-4 mx-auto"}>
                    <h3
                        className={`text-white font-bold text-2xl lg:text-6xl transition-all duration-700 ease-out 
                        ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
                    >
                        세상의 모든 맛, 여기서 시작된다
                    </h3>
                    <p
                        className={`text-neutral-400 text-lg lg:text-2xl mt-7 ml-8 transition-all duration-700 delay-200 ease-out 
                        ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
                    >
                        매일의 식사가 더 특별해질 수 있도록, 정성 가득한 레시피와 <br/>진짜 맛집 정보를 한곳에 담았습니다.
                    </p>
                </div>
            </div>
            <section className="container px-4 mx-auto mt-24 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative h-[300px] overflow-hidden group rounded-lg shadow-md">
                        <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                            style={{ backgroundImage: `url(/images/restaurant.png)` }}
                        />
                        <Link to="/food/1">
                            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                            <p className="relative text-4xl text-white mt-7 ml-7 font-bold z-10">맛집</p>
                        </Link>
                    </div>

                    <div className="relative h-[300px] overflow-hidden group rounded-lg shadow-md">
                        <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                            style={{ backgroundImage: `url(/images/recipe.png)` }}
                        />
                        <Link to="/recipe/1">
                            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                            <p className="relative text-4xl text-white mt-7 ml-7 font-bold z-10">레시피</p>
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="relative h-[300px] overflow-hidden group rounded-lg shadow-md">
                        <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                            style={{ backgroundImage: `url(/images/board.png)` }}
                        />
                        <Link to="/board/1">
                            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                            <p className="relative text-4xl text-white mt-7 ml-7 font-bold z-10">게시글</p>
                        </Link>
                    </div>

                    <div className="relative h-[300px] overflow-hidden group rounded-lg shadow-md">
                        <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                            style={{ backgroundImage: `url(/images/news.png)` }}
                        />
                        <Link to="/news">
                            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                            <p className="relative text-4xl text-white mt-7 ml-7 font-bold z-10">뉴스</p>
                        </Link>
                    </div>

                    <div className="relative h-[300px] overflow-hidden group rounded-lg shadow-md">
                        <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                            style={{ backgroundImage: `url(/images/chat.png)` }}
                        />
                        <Link to="/chat">
                            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                            <p className="relative text-4xl text-white mt-7 ml-7 font-bold z-10">채팅</p>
                        </Link>
                    </div>
                </div>
            </section>

            <section className="container px-4 mt-24 mx-auto">
                <h3 className={"text-4xl font-bold mb-7"}>맛집</h3>
                <Swiper
                    modules={[Navigation]}
                    navigation
                    spaceBetween={24}
                    slidesPerView={4}
                    onSlideChange={(swiper: any) => setActiveIndex(swiper.activeIndex)}
                    breakpoints={{
                        1280: {
                            slidesPerView: 4,
                        },

                        768: {
                            slidesPerView: 3, // 태블릿
                        },
                        0: {
                            slidesPerView: 1, // 모바일
                        },
                    }}
                >
                    {
                        data?.data.fList.map((el,i) => (
                            <SwiperSlide key={i}>
                                <Link to={`/food/detail/${el.fno}`}>
                                    <ListCard poster={`http://menupan.com${el.poster}`} title={el.name} info={el.phone} likecount={el.likecount} hit={el.hit}  />
                                </Link>
                            </SwiperSlide>
                        ))
                    }


                </Swiper>
            </section>
            <section className="container px-4 mt-24 mx-auto">
                <h3 className={"text-4xl font-bold mb-7"}>레시피</h3>
                <Swiper
                    modules={[Navigation]}
                    navigation
                    spaceBetween={24}
                    slidesPerView={4}
                    onSlideChange={(swiper: any) => setActiveIndex(swiper.activeIndex)}
                    breakpoints={{
                        1280: {
                            slidesPerView: 4,
                        },

                        768: {
                            slidesPerView: 3, // 태블릿
                        },
                        0: {
                            slidesPerView: 1, // 모바일
                        },
                    }}
                >
                    {
                        data?.data.rList.map((el,i) => (
                            <SwiperSlide key={i}>
                                <Link to={`/recipe/detail/${el.no}`}>
                                    <ListCard poster={el.poster} title={el.title} info={el.chef} likecount={el.likecount} hit={el.hit}  />
                                </Link>
                            </SwiperSlide>
                        ))
                    }


                </Swiper>
            </section>
            <section className="container px-4 mt-24 mx-auto">
                <h3 className={"text-4xl font-bold mb-7"}>Hoeger</h3>
                <div className={"grid grid-cols-1 md:grid-cols-3 gap-6"}>
                    <div className={"bg-red-200 aspect-square"}></div>
                    <div className={"bg-red-200 aspect-square"}></div>
                    <div className={"bg-red-200 aspect-square"}></div>
                </div>
            </section>
            <section className="container px-4 mt-24 mx-auto">
                <h3 className={"text-4xl font-bold mb-7"}>게시글</h3>
                <table className={"table w-full table-fixed mb-10"}>
                    <tbody>
                    {data?.data.bList.map((el, i) => (
                        <tr key={i} className="border-t border-neutral-300 hover:bg-gray-50 transition">
                            <td className="text-center p-3 w-2/12 lg:w-1/12 text-sm font-medium text-gray-700">
                                {el.name}
                            </td>
                            <td className="p-3 w-8/12 lg:w-10/12 text-left">
                                <Link
                                    to={`/board/detail/${el.no}`}
                                    className="block text-lg lg:text-xl font-semibold text-gray-800 truncate hover:underline"
                                >
                                    {el.subject}
                                </Link>
                            </td>
                            <td className="text-center p-3 w-2/12 lg:w-1/12 text-sm text-gray-500">
                                {el.dbday}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </section>
            <div className={"w-full h-[600px] bg-cover bg-center flex justify-center items-center"}
                 style={{backgroundImage: `url(/images/footer.png)`}}>
                <div className={"w-[150px] h-[50px] border border-white border-4 rounded-full text-white flex items-center justify-center text-2xl"}>
                    문의하기
                </div>
            </div>
        </Fragment>
    )
};

export default Home;