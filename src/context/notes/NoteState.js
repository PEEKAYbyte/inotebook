import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props)=>{
    const s1={
        "name":"paras",
        "class":"5f"
    }
    const [state,setState]=useState(s1);
    const update = ()=>{
        setTimeout(() => {
            setState({
                "name":"kakadiya",
                "class":"2e"
            })
        }, 1000);
    }
    return (
        <NoteContext.Provider value={{state,update}}>
            {props.children}
        </NoteContext.Provider>
    )

}

export default NoteState;