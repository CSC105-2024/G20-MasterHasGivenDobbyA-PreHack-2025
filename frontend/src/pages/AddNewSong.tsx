import React from "react";
import Nav from "../components/NavBar";
import { useState, useEffect } from "react";

function AddNewSong() {
  
const [lyrics, setLyrics] = useState("");
const [editedLyrics, setEditedLyrics] = useState(lyrics);
const handleSave = () => {
  setLyrics(editedLyrics);
  localStorage.setItem("lyrics", editedLyrics);
  console.log("Lyrics saved:", editedLyrics);
};

const handleDelete = () => {
  setLyrics("");
  setEditedLyrics("");
  localStorage.removeItem("lyrics");
  console.log("Lyrics deleted from localStorage");
};

useEffect(() => {
  const savedLyrics = localStorage.getItem("lyrics");
  if (savedLyrics) {
    setLyrics(savedLyrics);
    setEditedLyrics(savedLyrics);
  }
}, []);

return (
  <>
    <div className="h-screen flex flex-row font-libre-caslon-text">
      <div>
        <Nav />
      </div>
      <div className="bg-neutral-800 flex-1 w-full min-h-svh ">
        <div className=" Make it center flex justify-center  px-4 ">
          <div className=" All content flex flex-col items-start w-full max-w-[1024px] ">
            <div className="mt-18 mb-6 md:mt-4">
              <div className="Song details contet flex justify-between items-center ">
                <div className=" gap-4 flex-col inline-flex items-start">
                  <input
                    placeholder="Song Name"
                    className="md:text-5xl text-4xl justify-start text-[#8B73A0] font-['Libre_Caslon_Text'] mt-9"
                  ></input>
                  <input
                    placeholder="Author"
                    className=" text-2xl md:text-3xl justify-start font-['Libre_Caslon_Text'] text-white  capitalize leading-normal"
                  ></input>
                  <input
                    placeholder="lyrics provide by "
                    className="text-2xl md:text-3xl justify-start font-['Libre_Caslon_Text']  text-white  capitalize leading-normal"
                  ></input>
                </div>
              </div>
            </div>

            <div className="Search song flex-col md:flex-row  md:items-center justify-center items-center  w-full py-5">
              <div className=" flex items-start gap-4">
                <div className="w-full md:w-[500px]  h-[50px] bg-white backdrop-blur-md rounded-lg shadow-md outline-[0.5px] outline-black flex items-center px-4 ">
                  <input
                    type="search"
                    placeholder="Search for Name"
                    className="w-full h-full bg-transparent focus:outline-none"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleDelete}
                    className=" text-purple-900 flex items-center justify-center bg-zinc-400 w-28 h-[50px] px-8 py-3.5 rounded-2xl text-2xl"
                  >
                    Delete
                  </button>

                  <button
                    className="text-white flex items-center bg-purple-900 w-28 h-[50px] px-8 py-3.5 rounded-2xl hover:bg-gray-200 text-2xl"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>

            <div className="Lyrics bg-white rounded-3xl w-full h-[55vh] md:h-[550px]  overflow-y-auto p-6 mt-6">
              <div className="flex justify-center items-center w-full h-full">
                <textarea
                  value={editedLyrics}
                  onChange={(e) => setEditedLyrics(e.target.value)}
                  className="w-[750px] h-full resize-none bg-transparent outline-none text-3xl leading-relaxed font-['Libre_Caslon_Text'] p-2 whitespace-pre-wrap"
                  placeholder="Type your lyrics here..."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);
}

export default AddNewSong;
