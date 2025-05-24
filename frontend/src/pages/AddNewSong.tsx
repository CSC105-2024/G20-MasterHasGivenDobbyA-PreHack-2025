import { useState, useEffect } from "react";
import Nav from "../components/NavBar";
import { Axios } from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

function AddNewSong() {
  const [songName, setSongName] = useState("");
  const [author, setAuthor] = useState("");
  const [lyrics, setLyrics] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    Axios.get("/user/me", { withCredentials: true })
      .then((res) => {
        setUsername(res.data.data.username);
      })
      .catch((err) => console.error("Failed to fetch user:", err));
  }, []);

  const handleSave = async () => {
    try {
      const response = await Axios.post(
        "/song/create",
        {
          songName,
          songLyrics: lyrics,
          songAuthor: author,
        },
        { withCredentials: true }
      );
      console.log("Song created:", response.data);
      alert("Song saved successfully!");
      navigate("/home");
    } catch (e) {
      console.error("Failed to save song:", e);
      alert("Failed to save song.");
    }
  };

  return (
    <div className="h-screen flex flex-row font-libre-caslon-text">
      <Nav />
      <div className="bg-neutral-800 flex-1 w-full min-h-svh px-4">
        <div className="flex flex-col items-start w-full max-w-[1024px] mx-auto py-6">
          <div className="flex flex-col gap-4 mb-6">
            <input
              value={songName}
              onChange={(e) => setSongName(e.target.value)}
              placeholder="Song Name"
              className="md:text-5xl text-4xl text-[#8B73A0] bg-transparent placeholder:text-[#8B73A0] font-bold outline-none"
            />
            <input
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Author"
              className="text-2xl md:text-3xl text-white bg-transparent font-semibold outline-none"
            />
            <input
              value={username}
              readOnly
              placeholder="Lyrics provided by"
              className="text-2xl md:text-3xl text-white bg-transparent font-semibold outline-none"
            />
          </div>

          <div className="flex justify-start gap-3 w-full py-4">
            <button
              onClick={handleSave}
              className="text-white bg-purple-900 w-32 h-[50px] rounded-2xl text-2xl hover:bg-purple-700"
            >
              Save
            </button>
          </div>

          <div className="Lyrics bg-white rounded-3xl w-full h-[55vh] overflow-y-auto p-6 mt-6">
            <textarea
              value={lyrics}
              onChange={(e) => setLyrics(e.target.value)}
              className="w-full h-full resize-none bg-transparent outline-none text-2xl leading-relaxed font-['Libre_Caslon_Text'] p-2"
              placeholder="Type your lyrics here..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddNewSong;
