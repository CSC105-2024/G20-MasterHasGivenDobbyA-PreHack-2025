import React from "react";
import Nav from "../components/NavBar";
import { useState } from "react";

export function Detail() {
  const [lyrics, setLyrics] =
    useState(`Now he's thinkin' 'bout me every night, oh
Is it that sweet? I guess so
Say you can't sleep, baby, I know
That's that me espresso
Move it up, down, left, right, oh
Switch it up like Nintendo
Say you can't sleep, baby, I know
That's that me espresso
I can't relate to desperation
My give-a-fucks are on vacation
And I got this one boy, and he won't stop callin'
When they act this way, I know I got 'em
Too bad your ex don't do it for ya
Walked in and dream-came-trued it for ya
Soft skin and I perfumed it for ya
(Yes) I know, I Mountain Dew it for ya
(Yes) that morning coffee, brewed it for ya
(Yes) one touch and I brand-newed it for ya (oh)
Now he's thinkin' 'bout me every night, oh
Is it that sweet? I guess so
Say you can't sleep, baby, I know
That's that me espresso
Move it up, down, left, right, oh
Switch it up like Nintendo
Say you can't sleep, baby, I know
That's that me espresso
Holy shit
Is it that sweet? I guess so
I'm working late, 'cause I'm a singer
Oh, he looks so cute wrapped 'round my finger
My twisted humor makes him laugh so often
My honey bee, come and get this pollen
Too bad your ex don't do it for ya
Walked in and dream-came-trued it for ya
Soft skin and I perfumed it for ya
(Yes) I know, I Mountain Dew it for ya
(Yes) that morning coffee, brewed it for ya
(Yes) one touch and I brand-newed it for ya (stupid)
Now he's thinkin' 'bout me every night, oh
Is it that sweet? I guess so
Say you can't sleep, baby, I know
That's that me espresso
Move it up, down, left, right, oh
Switch it up like Nintendo
Say you can't sleep, baby, I know
That's that me espresso
Thinkin' 'bout me every night, oh
Is it that sweet? I guess so (yes)
Say you can't sleep, baby, I know
That's that me espresso (yes)
Move it up, down, left, right, oh
Switch it up like Nintendo (yes)
Say you can't sleep, baby, I know
That's that me espresso
Is it that sweet? I guess so, uh
That's that me espresso`);

const [editedLyrics, setEditedLyrics] = useState(lyrics);
const handleSave = () => {
  setLyrics(editedLyrics);
  localStorage.setItem("lyrics", editedLyrics); 
  console.log("✅ Lyrics saved:", editedLyrics);
};

const handleDelete = () => {
  setLyrics("");
  setEditedLyrics("");
  console.log("🗑️ Lyrics deleted.");

};

  return (
    <>
      <div className="h-screen flex flex-row font-libre-caslon-text">
        <div>
          <Nav />
        </div>
        <div className="bg-neutral-800  w-full min-h-svh ">
          <div className=" Make it center flex justify-center  ">
            <div className=" All content flex flex-col items-start ">
              <div className="Song details contet flex justify-between items-center ">
                <div className=" gap-4 flex-col inline-flex items-start">
                  <div className="text-5xl justify-start text-[#8B73A0] font-['Libre_Caslon_Text'] mt-9">
                    Espresso
                  </div>
                  <div className=" text-3xl justify-start font-['Libre_Caslon_Text'] text-white  capitalize leading-normal">
                    Sabrina Capanter
                  </div>
                  <div className="text-3xl justify-start font-['Libre_Caslon_Text']  text-white  capitalize leading-normal">
                    lyrics provided by Belle
                  </div>
                </div>
              </div>

              <div className="Search song flex justify-center items-center  py-5">
                <div className=" flex items-start gap-4">
                  <div className="w-80 max-w-[1000px] h-[50px] bg-white backdrop-blur-md rounded-lg shadow-md outline-[0.5px] outline-black flex items-center px-4 ">
                    <input
                      type="search"
                      placeholder="Search for Name"
                      className="w-full h-full bg-transparent focus:outline-none"
                    />
                  </div>
                  <div className="w-80 max-w-[1000px] h-[50px] bg-white backdrop-blur-md rounded-lg shadow-md outline-[0.5px] outline-black flex items-center px-4 ">
                    <input
                      type="search"
                      placeholder="Search for Author"
                      className="w-full h-full bg-transparent focus:outline-none"
                    />
                  </div>

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

              <div className="Lyrics bg-white rounded-3xl h-[608px] w-[916px] overflow-y-auto p-6 mt-6">
                <div className="flex justify-center items-center w-full h-full">
                  <textarea
                    value={editedLyrics}
                    onChange={(e) => setEditedLyrics(e.target.value)}
                    className="w-[750px] h-full resize-none bg-transparent outline-none text-3xl leading-relaxed font-['Libre_Caslon_Text'] p-2 whitespace-pre-wrap"
                    placeholder="Type your lyrics here..."
                    defaultValue={`Now he's thinkin' 'bout me every night, oh
Is it that sweet? I guess so
Say you can't sleep, baby, I know
That's that me espresso
Move it up, down, left, right, oh
Switch it up like Nintendo
Say you can't sleep, baby, I know
That's that me espresso
I can't relate to desperation
My give-a-fucks are on vacation
And I got this one boy, and he won't stop callin'
When they act this way, I know I got 'em
Too bad your ex don't do it for ya
Walked in and dream-came-trued it for ya
Soft skin and I perfumed it for ya
(Yes) I know, I Mountain Dew it for ya
(Yes) that morning coffee, brewed it for ya
(Yes) one touch and I brand-newed it for ya (oh)
Now he's thinkin' 'bout me every night, oh
Is it that sweet? I guess so
Say you can't sleep, baby, I know
That's that me espresso
Move it up, down, left, right, oh
Switch it up like Nintendo
Say you can't sleep, baby, I know
That's that me espresso
Holy shit
Is it that sweet? I guess so
I'm working late, 'cause I'm a singer
Oh, he looks so cute wrapped 'round my finger
My twisted humor makes him laugh so often
My honey bee, come and get this pollen
Too bad your ex don't do it for ya
Walked in and dream-came-trued it for ya
Soft skin and I perfumed it for ya
(Yes) I know, I Mountain Dew it for ya
(Yes) that morning coffee, brewed it for ya
(Yes) one touch and I brand-newed it for ya (stupid)
Now he's thinkin' 'bout me every night, oh
Is it that sweet? I guess so
Say you can't sleep, baby, I know
That's that me espresso
Move it up, down, left, right, oh
Switch it up like Nintendo
Say you can't sleep, baby, I know
That's that me espresso
Thinkin' 'bout me every night, oh
Is it that sweet? I guess so (yes)
Say you can't sleep, baby, I know
That's that me espresso (yes)
Move it up, down, left, right, oh
Switch it up like Nintendo (yes)
Say you can't sleep, baby, I know
That's that me espresso
Is it that sweet? I guess so, uh
That's that me espresso`}
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

export default Detail;
