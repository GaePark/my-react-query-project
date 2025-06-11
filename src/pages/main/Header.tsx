import React, {useEffect, useRef, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [login, setLogin] = useState(false);
    const nav= useNavigate();
    const menu = [
        {title:"맛집", addr:"/food/1"},
        {title:"레시피", addr:"/recipe/1"},
        {title:"게시글", addr:"/board/1"},
        {title:"뉴스", addr:"/news"},
        {title:"채팅", addr:"/chat"},
        {title:"고객센터", addr:"/customer"},
    ]

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const checkLogin = () => {
            setLogin(!!sessionStorage.getItem("id"));
        };
        checkLogin();

        window.addEventListener("login", checkLogin);
        return () => window.removeEventListener("login", checkLogin);
    }, []);

    const memberLogout= () => {
        window.sessionStorage.clear();
        window.dispatchEvent(new Event("login"));
        nav("/")
    }
    return (
        <nav className={`fixed top-0 left-0 w-full z-50 px-2 py-3 duration-500 shadow-md ${scrolled ? 'bg-white' : 'bg-black'}`} >
            <div className="container mx-auto flex flex-wrap items-center justify-between px-4">
                {/* 로고 & 버튼 */}
                <div className="flex justify-between w-full lg:w-auto">
                    <Link className={`text-sm font-bold uppercase ${scrolled ? 'text-black' : 'text-white'}`} to="/">Food</Link>
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="lg:hidden text-xl focus:outline-none"
                    >
                        <span className={`block w-6 h-0.5 ${scrolled ? 'bg-black' : 'bg-white'} mb-1`}></span>
                        <span className={`block w-6 h-0.5 ${scrolled ? 'bg-black' : 'bg-white'} mb-1`}></span>
                        <span className={`block w-6 h-0.5 ${scrolled ? 'bg-black' : 'bg-white'} mb-1`}></span>
                    </button>
                </div>

                {/* 메뉴 */}
                <div className={`w-full lg:flex lg:items-center lg:w-auto ${menuOpen ? 'block' : 'hidden'}`}>
                    <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
                        {
                            menu.map((el, i) => (
                                <li key={i} className={"flex align-middle"}>
                                    <Link
                                        className={`block px-3 py-2 text-xs font-bold uppercase hover:opacity-75 ${
                                            scrolled ? 'text-black' : 'text-white'
                                        }`}
                                        to={el.addr}
                                    >
                                        {el.title}
                                    </Link>
                                </li>
                            ))
                        }
                        <li>{
                            login?(
                                <button onClick={memberLogout}
                                      className="inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center duration-200 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed focus:shadow-none text-sm py-2 px-4 shadow-sm hover:shadow-md bg-red-500 hover:bg-red-300 border-none text-stone-50 rounded-lg transition antialiased">
                                    로그아웃
                                </button>
                                ):(
                                <Link to={"/login"}
                                      className="inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center duration-200 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed focus:shadow-none text-sm py-2 px-4 shadow-sm hover:shadow-md bg-blue-500 hover:bg-blue-300 border-none text-stone-50 rounded-lg transition antialiased">
                                    로그인
                                </Link>
                            )
                        }

                        </li>
                    </ul>
                </div>
            </div>
        </nav>

    );
};

export default Header;