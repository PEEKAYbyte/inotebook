import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props)=>{
    const notesInitial = [
        {
            "_id": "673200e9d84bede141df089e",
            "user": "6731a519d6e46fa8ae345626",
            "title": " My Title 2",
            "description": "Please me not wake up early",
            "tag": "personal 2 ",
            "date": "2024-11-11T13:04:41.954Z",
            "__v": 0
          },
          {
            "_id": "6732d0fb3e61d27a297fb7bf",
            "user": "6731a519d6e46fa8ae345626",
            "title": " My Titdeeele 2",
            "description": "Pleaffse me not wake up early",
            "tag": "personal 2 ",
            "date": "2024-11-12T03:52:27.869Z",
            "__v": 0
          },
          {
            "_id": "6732d0fb3e61d27a297fb7bf",
            "user": "6731a519d6e46fa8ae345626",
            "title": " My Titdeeele 2",
            "description": "Pleaffse me not wake up early",
            "tag": "personal 2 ",
            "date": "2024-11-12T03:52:27.869Z",
            "__v": 0
          },
          {
            "_id": "6732d0fb3e61d27a297fb7bf",
            "user": "6731a519d6e46fa8ae345626",
            "title": " My Titdeeele 2",
            "description": "Pleaffse me not wake up early",
            "tag": "personal 2 ",
            "date": "2024-11-12T03:52:27.869Z",
            "__v": 0
          },
          {
            "_id": "6732d0fb3e61d27a297fb7bf",
            "user": "6731a519d6e46fa8ae345626",
            "title": " My Titdeeele 2",
            "description": "Pleaffse me not wake up early",
            "tag": "personal 2 ",
            "date": "2024-11-12T03:52:27.869Z",
            "__v": 0
          }
    ]
    const [notes,setNotes]=useState(notesInitial);
    
    return (
        <NoteContext.Provider value={{notes,setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )

}

export default NoteState;