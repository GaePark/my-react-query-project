import style from "@emotion/styled";

export const Container = style.div`
    display: flex;
    justify-content: center;
    margin-top:160px;
    padding: 0 16px;
`

export const DetailBox = style.div`
    width: 100%;
    max-width: 1024px;
    padding: 32px;
    background-color:white;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
`
export const BoardSubject= style.h1`
    font-size: 36px;
    line-height: 40px;
    font-weight: bold;
    margin-bottom:24px;
`

export const BoardNameBox = style.div`
    font-size: 14px;
    color: #4b5563;
    margin-bottom:16px;
`

export const BoardName = style.span`
    font-weight: 600;
`

export const BoardContent = style.div`
    font-size: 16px;
    line-height: 1.625;
    white-space: pre-line;
`
export const BoardBtnBox = style.div`
    display: flex;
    justify-content:end;
    align-items: center;
`

export const BoardBtn = style.button`
    
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 5px; 
  font-size: 14px; 
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out, box-shadow 0.2s;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  margin-left: 5px;
  
`
