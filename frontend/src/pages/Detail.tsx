import axios from "axios";
import Nav from "../components/NavBar";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";



export function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lyrics, setLyrics] = useState("");
  const [editedLyrics, setEditedLyrics] = useState("");
  const [songName, setSongName] = useState("");
  const [songAuthor, setSongAuthor] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3000/songs/${id}`, {
        withCredentials: true, 
      })
      .then((res) => {
        console.log(res.data);    
        setLyrics(res.data.SongLyrics);
        setEditedLyrics(res.data.SongLyrics);
        setSongName(res.data.SongName);
        setSongAuthor(res.data.SongAuthor);
      })
      .catch((err) => {
        console.error("Failed to fetch lyrics:", err);
      });
  }, [id]);


const handleSave = () => {
  axios
    .put(
      `http://localhost:3000/songs/${id}`,
      {
        SongLyrics: editedLyrics,
      },
      {
        withCredentials: true,
      }
    )

    .then(() => {
      setLyrics(editedLyrics);
      console.log("Lyrics updated");
    })
    .catch((err) => console.error("Failed to save:", err));
};
const handleDelete = () => {
  axios
    .delete(`http://localhost:3000/songs/${id}`, {
      withCredentials: true,
    })

    .then(() => {
      console.log("Deleted song ja");
      navigate("/");
    })
    .catch((err) => console.error("Failed to delete:", err));
};



  return (
    <>
      <div className="min-h-screen flex md:flex-row flex-row font-libre-caslon-text">
        <div>
          <Nav />
        </div>

        <div className="bg-neutral-800 flex-1 w-full min-h-svh ">
          <div className=" Make it center flex justify-center  px-4">
            <div className=" All content flex flex-col items-start w-full max-w-[1024px]">
              <div className="mt-18 mb-6 md:mt-4">
                <div className="Song details contet flex justify-between items-center ">
                  <div className=" gap-4 flex-col inline-flex items-start">
                    <div className="md:text-5xl text-4xl justify-start text-[#8B73A0] font-['Libre_Caslon_Text'] mt-9">
                    {songName}
                    </div>
                    <div className="text-2xl md:text-3xl justify-start font-['Libre_Caslon_Text'] text-white  capitalize leading-normal">
                      {songAuthor}
                    </div>
                    <div className="md:text-3xl  text-2xl justify-start font-['Libre_Caslon_Text']  text-white  capitalize leading-normal">
                      lyrics provided by Belle
                    </div>
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

export default Detail;
