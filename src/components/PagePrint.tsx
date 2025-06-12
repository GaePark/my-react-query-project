import React from 'react';
import {PageData} from "../types/types";
import {useNavigate} from "react-router-dom";

const PagePrint = ({curpage,startPage,endPage,totalpage,type}:PageData) => {
    const nav = useNavigate();
    const pages = [];
    for (let i = startPage; i <= endPage && i <= totalpage; i++) {
        pages.push(i);
    }

    const prev = ():void => {
        nav(`/${type}/${startPage-1}`);
    }
    const next = ():void => {
        nav(`/${type}/${endPage+1}`);
    }
    const changePage = (num:number):void => {
        nav(`/${type}/${num}`);
    }

    return (
        <div className="flex items-center gap-1 justify-center flex-wrap">
            {startPage > 1 && (
                <button
                    onClick={prev}
                    className="inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center
        transition-all duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed
        focus:shadow-none
        text-[0.625rem] py-1 px-1.5 min-w-[20px] min-h-[20px]
        sm:text-sm sm:py-2 sm:px-4 sm:min-w-[38px] sm:min-h-[38px]
        bg-transparent border-transparent text-stone-800 hover:bg-stone-800/5 hover:border-stone-800/5 shadow-none hover:shadow-none"
                >
                    <svg width="1em" height="1em" strokeWidth="1.5" viewBox="0 0 24 24" fill="none"
                         xmlns="http://www.w3.org/2000/svg" color="currentColor"
                         className="mr-1 h-3 w-3 sm:h-4 sm:w-4">
                        <path d="M15 6L9 12L15 18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                    Prev
                </button>
            )}

            {pages.map((el) =>
                curpage !== el ? (
                    <button
                        key={el}
                        onClick={() => changePage(el)}
                        className="inline-grid place-items-center border align-middle select-none font-sans font-medium text-center
          transition-all duration-300 ease-in disabled:opacity-50 disabled:pointer-events-none
          text-[0.625rem] min-w-[20px] min-h-[20px]
          sm:text-sm sm:min-w-[38px] sm:min-h-[38px]
          rounded-md bg-transparent border-transparent
          text-stone-800 hover:bg-stone-800/5 hover:border-stone-800/5"
                    >
                        {el}
                    </button>
                ) : (
                    <button
                        key={el}
                        onClick={() => changePage(el)}
                        className="inline-grid place-items-center border align-middle select-none font-sans font-medium text-center
          transition-all duration-300 ease-in disabled:opacity-50 disabled:pointer-events-none
          text-[0.625rem] min-w-[20px] min-h-[20px]
          sm:text-sm sm:min-w-[38px] sm:min-h-[38px]
          rounded-md shadow-sm hover:shadow-md
          bg-stone-800 border-stone-800 text-stone-50 hover:bg-stone-700 hover:border-stone-700"
                    >
                        {el}
                    </button>
                )
            )}

            {endPage < totalpage && (
                <button
                    onClick={next}
                    className="inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center
                            transition-all duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed
                            focus:shadow-none
                            text-[0.625rem] py-1 px-1.5 min-w-[20px] min-h-[20px]
                            sm:text-sm sm:py-2 sm:px-4 sm:min-w-[38px] sm:min-h-[38px]
                            bg-transparent border-transparent text-stone-800 hover:bg-stone-800/5 hover:border-stone-800/5 shadow-none hover:shadow-none"
                >
                    Next
                    <svg width="1em" height="1em" strokeWidth="1.5" viewBox="0 0 24 24" fill="none"
                         xmlns="http://www.w3.org/2000/svg" color="currentColor"
                         className="ml-1 h-3 w-3 sm:h-4 sm:w-4">
                        <path d="M9 6L15 12L9 18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                </button>
            )}
        </div>


    );
};

export default PagePrint;