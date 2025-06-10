import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {QueryClient,QueryClientProvider} from "@tanstack/react-query";
import './index.css'
const client = new QueryClient({
    defaultOptions:{
        queries:{
            refetchOnMount:false,
            refetchOnReconnect:false,
            refetchOnWindowFocus:false,
            retry:false,
            staleTime:60*5*1000,
            placeholderData:(prevdata:any) =>prevdata
        }
    }
})

const rootElement = document.getElementById('root');

if(rootElement){
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <QueryClientProvider client={client}>
            <App />
        </QueryClientProvider>
    )
}


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
