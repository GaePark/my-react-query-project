import React from 'react';

interface HomeListImageProps {
    poster:string;
    title:string;
    info:string;
    likecount:number;
    hit:number;
}
const ListCard = ({title,poster,info,likecount,hit}:HomeListImageProps) => {
    return (
        <div
            className="rounded-lg border shadow-sm overflow-hidden bg-white border-stone-200 shadow-stone-950/5 w-full">
            <img
                src={poster}
                alt="card-image"
                className="w-[calc(100%-16px)] rounded m-2 h-80 object-cover"
            />
            <div className="w-full h-max rounded px-3.5 py-2.5">
                <div className="mb-2 flex items-center">
                    <h6 className="font-sans antialiased font-bold text-base md:text-lg lg:text-xl text-current truncate overflow-hidden whitespace-nowrap">
                        {title}
                    </h6>

                </div>
                <p className="font-sans antialiased text-base text-stone-600 truncate">{info}</p>
            </div>
            <div className="w-full px-3.5 pt-2 pb-3.5 rounded flex items-center justify-end text-sm text-gray-700">
                <div className="flex items-center space-x-1 mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg"
                         fill="none"
                         viewBox="0 0 24 24"
                         strokeWidth={1.5}
                         stroke="currentColor"
                         className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12s3.75-6.75 9.75-6.75 9.75 6.75 9.75 6.75-3.75 6.75-9.75 6.75S2.25 12 2.25 12z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{hit}</span>
                </div>

                <div className="flex items-center gap-1 text-red-500">
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
                    <span>{likecount}</span>
                </div>
            </div>
        </div>
    );
};

export default ListCard;