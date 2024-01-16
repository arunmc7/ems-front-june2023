import React, { createContext, useState } from 'react'

//globally accessible

export const registerContext=createContext()

function Contextshare({children}) {

    const [registerData,setregisterData]=useState("")


  return (
    <registerContext.Provider value={{registerData,setregisterData}}>
        {children}
    </registerContext.Provider>
  
  )
}

export default Contextshare