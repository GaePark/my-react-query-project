import style from "@emotion/styled";

export const Container = style.div`
       
      display: flex;
      flex: 1 1 0%;
      justify-content: center;
      align-items: center;
      background-color: #f9f9f9;
    `
export const LoginBox = style.div`
    max-width: 500px;
    width: 100%;
    padding: 50px;
    display: flex;
    flex-direction: column;
    background-color: #f9f9f9;
    border-radius: 5px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    `
export const LoginTitle=style.p`
    font-size: 48px;
    font-weight: bold;
    margin-bottom: 5px;
`
export const LoginInput =style.input`
     width: 100%;
  outline: none;
  color: #1c1c1c; 
  background-color: white;
  border: 1px solid #e5e7eb; 
  border-radius: 0.5rem; 
  padding: 0.75rem 0.75rem; 
  font-size: 1rem; 
  line-height: 1; 
  transition: all 0.1s ease-in;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);    
  margin-bottom:10px;
`

export const LoginButton=style.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #1c1917;
  vertical-align: middle;
  user-select: none;
  text-align: center;
  font-weight: 500;
  font-size: 0.875rem; 
  padding: 0.75rem 0.75rem; 
  color: #fafaf9; 
  background-color: #292524; 
  border-radius: 0.5rem; 
  transition: all 0.3s ease-in;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05); 
`