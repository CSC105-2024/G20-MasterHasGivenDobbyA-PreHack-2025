import React from "react";
import NavBar from "../components/NavBar";
import { CiSearch } from "react-icons/ci";

export default function Home()  {
  return (
    <>
      <div className="h-screen flex flex-row">
        <NavBar />
        <div className="w-screen bg-gradient-to-b from-black via-zinc-800 to-white justify-center flex flex-col ">
          <div>
            <div className="text-5xl sm:text-6xl md:text-9xl text-[#8B73A0] justify-center flex flex-row items-center">
              Lyriverse
            </div>
            <div className="justify-center flex flex-row items-center">
              <input
                className="w-2/3 sm:w-2/3 m-8 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-3 shadow-sm"
                placeholder="Search for song name, artist name"
              />
              <button className="w-12 mr-8 h-12 flex items-center justify-center text-3xl text-gray-400 bg-gray-50 rounded-lg border border-gray-300 hover:bg-gray-200 shadow-sm">
                <CiSearch />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


