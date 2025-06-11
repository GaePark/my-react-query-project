import React, {useEffect, useRef, useState} from 'react';
import {AxiosError, AxiosResponse} from "axios";
import {useMutation} from "@tanstack/react-query";
import apiClient from "../../http-commons";
import {useNavigate} from "react-router-dom";
import * as S from './LoginStyle'
import {LoginBox, LoginButton, LoginInput, LoginTitle} from "./LoginStyle";
interface LoginData {
    msg:string;
    id:string;
    name:string;
}

const Login = () => {
    const [id, setId] = useState<string>("");
    const [pwd, setPwd] = useState<string>("");
    const idRef=useRef(null);
    const pwdRef=useRef(null);
    const nav = useNavigate();

    const {mutate:loginOk} = useMutation({
        mutationFn:async() => {
            const res:AxiosResponse<LoginData>= await apiClient.get(`/member/login/${id}/${pwd}`)
            return res.data
        },
        onSuccess:(data:LoginData) => {
            if(data.msg==='NO')
            {
                alert("아이디가 혹은 비밀번호가 존재하지 않습니다")
                setId('');
                setPwd('');
            }
            else if(data.msg==="YES")
            {
                window.sessionStorage.setItem("id",data.id);
                window.sessionStorage.setItem("name",data.name);
                window.dispatchEvent(new Event("login"));
                nav("/");


            }
        },
        onError:(err:AxiosError)=> {
            console.log("Login Error:",err.message);
        }

    });

    const onClickLogin = () => {
        loginOk()
    }

    return (
        <S.Container >
            <S.LoginBox>
                <LoginTitle>로그인</LoginTitle>
            <LoginInput type={"text"} placeholder={"아이디"} value={id} onChange={(e) => setId(e.target.value)} ref={idRef} />
            <LoginInput type={"password"} placeholder={"비밀번호"} value={pwd} onChange={(e) => setPwd(e.target.value)} ref={pwdRef} />
            <LoginButton onClick={onClickLogin}>로그인</LoginButton>
            </S.LoginBox>
        </S.Container>
    );
};

export default Login;