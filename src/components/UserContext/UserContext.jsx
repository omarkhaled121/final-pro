import { createContext, useEffect, useState } from "react";

export let UserContext=createContext()
export default function UserContextProvider (props){
  const [UserToken, setUserToken] = useState(null)
 useEffect(()=>{
  if(localStorage.getItem("token")){
    setUserToken(localStorage.getItem("token"))
  }
  // else{
  //   setUserToken(null)

  // }
 },[])
  
  return <UserContext.Provider value={{UserToken,setUserToken}}>{props.children}</UserContext.Provider>

}