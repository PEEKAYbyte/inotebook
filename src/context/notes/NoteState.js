import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [  ]
  const [notes, setNotes] = useState(notesInitial);

  // get all notes

  const getNotes = async () => {
    // api call
    const respose = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjczMWE1MTlkNmU0NmZhOGFlMzQ1NjI2In0sImlhdCI6MTczMTMyMDEwNH0.anoPpQ_C1E5Zyy_vhVJBbr2xAwAZ8mcbODlss_AEfeQ",
      }
      // ,
      // body: JSON.stringify({ title, description, tag }),
    });

    const json = await respose.json()
    console.log(json);
    setNotes(json)



    // const json = respose.json();

    // console.log("Adding a new note");
    // client side add
    // const note = {
    //   _id: "8jewiuct9847t93ctoht",
    //   user: "0009",
    //   title: title,
    //   description: description,
    //   tag: tag,
    //   date: "2024-11-12T03:52:27.869Z",
    //   __v: 0,
    // };
    // setNotes(notes.concat(note));
  };


  //add a note
  const addNote = async (title, description, tag) => {
    // api call
    const respose = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjczMWE1MTlkNmU0NmZhOGFlMzQ1NjI2In0sImlhdCI6MTczMTMyMDEwNH0.anoPpQ_C1E5Zyy_vhVJBbr2xAwAZ8mcbODlss_AEfeQ",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    // const json = respose.json();

    console.log("Adding a new note");
    // client side add
    const note = {
      _id: "8jewiuct9847t93ctoht",
      user: "0009",
      title: title,
      description: description,
      tag: tag,
      date: "2024-11-12T03:52:27.869Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
  };

  //delete a note
  const deleteNote = async (id) => {
    // api call

    const respose = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjczMWE1MTlkNmU0NmZhOGFlMzQ1NjI2In0sImlhdCI6MTczMTMyMDEwNH0.anoPpQ_C1E5Zyy_vhVJBbr2xAwAZ8mcbODlss_AEfeQ",
      }
      // ,
      // body: JSON.stringify({ title, description, tag }),
    });
    const json = respose.json();
    console.log(json)


    console.log("deleting the note with" + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  //edit a note
  //const editNote = async (id, title, description, tag) => {
  // API call
  // const respose = await fetch(
  //   `${host}/api/notes/updatenote/${id}`,
  //   {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "auth-token":
  //         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjczMWE1MTlkNmU0NmZhOGFlMzQ1NjI2In0sImlhdCI6MTczMTMyMDEwNH0.anoPpQ_C1E5Zyy_vhVJBbr2xAwAZ8mcbODlss_AEfeQ",
  //     },
  //     body: JSON.stringify({title,description,tag}),
  //   }
  // );
  // const json = respose.json();
  // };

  // logic to edit in client
  const editNote = async (id, title, description, tag) => {
    // api call
    const respose = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjczMWE1MTlkNmU0NmZhOGFlMzQ1NjI2In0sImlhdCI6MTczMTMyMDEwNH0.anoPpQ_C1E5Zyy_vhVJBbr2xAwAZ8mcbODlss_AEfeQ",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = respose.json();

    //logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
