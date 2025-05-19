import React from "react";

export function Detail() {
  return (
    <>
      <div className="bg-neutral-800  w-full min-h-svh ">
        <div className=" Make it center flex justify-center i ">
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

                <button className=" text-purple-900 flex items-center justify-center bg-zinc-400 w-28 h-[50px] px-8 py-3.5 rounded-2xl text-2xl">
                  Delete
                </button>
                <button className="text-white flex items-center bg-purple-900 w-28 h-[50px] px-8 py-3.5 rounded-2xl text-2xl">
                  Edit
                </button>
              </div>
            </div>

            <div className="Lyrics bg-white rounded-3xl h-[608px] w-[916px] overflow-y-auto p-6 mt-6">
              <div className="flex justify-center items-center w-full h-full">
                <textarea
                  className="w-[750px] h-full resize-none bg-transparent outline-none text-3xl leading-relaxed font-['Libre_Caslon_Text'] p-2 whitespace-pre-wrap"
                  placeholder="Type your lyrics here..."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Detail;
