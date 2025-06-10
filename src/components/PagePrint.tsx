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
        <div className="flex items-center gap-1 justify-center">
            {
                startPage>1&&<button onClick={prev}
                    className="inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center transition-all duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed focus:shadow-none text-sm rounded-md py-2 px-4 bg-transparent border-transparent text-stone-800 hover:bg-stone-800/5 hover:border-stone-800/5 shadow-none hover:shadow-none">
                    <svg width="1.5em" height="1.5em" stroke-width="1.5" viewBox="0 0 24 24" fill="none"
                         xmlns="http://www.w3.org/2000/svg" color="currentColor" className="mr-1.5 h-4 w-4 stroke-2">
                        <path d="M15 6L9 12L15 18" stroke="currentColor" stroke-linecap="round"
                              stroke-linejoin="round"></path>
                    </svg>
                    Previous
                </button>
            }
            {
                pages.map(el => (
                    curpage !== el ?
                        <button onClick={() => changePage(el)}
                            className="inline-grid place-items-center border align-middle select-none font-sans font-medium
                                    text-center transition-all duration-300 ease-in disabled:opacity-50
                                    disabled:shadow-none disabled:pointer-events-none text-sm min-w-[38px] min-h-[38px] rounded-md
                                    bg-transparent border-transparent text-stone-800 hover:bg-stone-800/5 hover:border-stone-800/5
                                    shadow-none hover:shadow-none" key={el}>{el}</button>
                        : <button onClick={() => changePage(el)}
                            className="inline-grid place-items-center border align-middle select-none font-sans font-medium
                            text-center transition-all duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none
                            text-sm min-w-[38px] min-h-[38px] rounded-md shadow-sm hover:shadow-md bg-stone-800 border-stone-800
                            text-stone-50 hover:bg-stone-700 hover:border-stone-700">{el}</button>

                ))
            }


            {endPage < totalpage &&
                <button onClick={next}
                    className="inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center transition-all duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed focus:shadow-none text-sm rounded-md py-2 px-4 bg-transparent border-transparent text-stone-800 hover:bg-stone-800/5 hover:border-stone-800/5 shadow-none hover:shadow-none">Next
                    <svg width="1.5em" height="1.5em" stroke-width="1.5" viewBox="0 0 24 24" fill="none"
                         xmlns="http://www.w3.org/2000/svg" color="currentColor" className="ml-1.5 h-4 w-4 stroke-2">
                        <path d="M9 6L15 12L9 18" stroke="currentColor" stroke-linecap="round"
                              stroke-linejoin="round"></path>
                    </svg>
                </button>
            }

        </div>
    );
};

export default PagePrint;