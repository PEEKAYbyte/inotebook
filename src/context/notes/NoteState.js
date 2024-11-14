import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [
    {
      _id: "1657657d8754875689356349563953cn3cihjg",
      user: "6731a519d6e46fa8ae345626",
      title: " My Title 2",
      description: "Please me not wake up early",
      tag: "personal 2 ",
      date: "2024-11-11T13:04:41.954Z",
      __v: 0,
    },
    {
      _id: "2uyeryr8745475yq5y475qcnew",
      user: "6731a519d6e46fa8ae345626",
      title: " My Titdeeele 2",
      description: "Pleaffse me not wake up early",
      tag: "personal 2 ",
      date: "2024-11-12T03:52:27.869Z",
      __v: 0,
    },
    {
      _id: "3uehiyciwrywoieyr84r",
      user: "6731a519d6e46fa8ae345626",
      title: " My Titdeeele 2",
      description: "Pleaffse me not wake up early",
      tag: "personal 2 ",
      date: "2024-11-12T03:52:27.869Z",
      __v: 0,
    },
    {
      _id: "4hfeuyry4ehceyro",
      user: "6731a519d6e46fa8ae345626",
      title: " My Titdeeele 2",
      description: "Pleaffse me not wake up early",
      tag: "personal 2 ",
      date: "2024-11-12T03:52:27.869Z",
      __v: 0,
    },
    {
      _id: "5kcmeu987t3nctua",
      user: "6731a519d6e46fa8ae345626",
      title: " My Titdeeele 2",
      description: "Pleaffse me not wake up early",
      tag: "personal 2 ",
      date: "2024-11-12T03:52:27.869Z",
      __v: 0,
    },
  ];
  const [notes, setNotes] = useState(notesInitial);

  //add a note
  const addNote = (title, description, tag) => {
    console.log("Adding a new note");

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
  const deleteNote = (id) => {
    console.log("deleting the note with" + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  //edit a note
  const editNote = async (id, title, description, tag) => {
    // API call
    const respose = await fetch(
      `${host}/api/notes/updatenote/${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjczMWE1MTlkNmU0NmZhOGFlMzQ1NjI2In0sImlhdCI6MTczMTMyMDEwNH0.anoPpQ_C1E5Zyy_vhVJBbr2xAwAZ8mcbODlss_AEfeQ",
        },
        body: JSON.stringify(data),
      }
    );
    const json = respose.json();
  };
  // logic to edit in client
  for (let index = 0; index < notes.length; index++) {
    const element = notes[index];
    if (element._id === id) {
      element.title = title;
      element.description = description;
      element.tag = tag;
    }
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
