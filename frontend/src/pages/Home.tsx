import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import { CiSearch } from "react-icons/ci";
import { Axios } from "../utils/axiosInstance";

export default function Home() {
  const [query, setQuery] = useState("");
  const [allSongs, setAllSongs] = useState<any[]>([]);
  const [result, setResult] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const res = await Axios.get("/song/getallsongs");
        setAllSongs(res.data.data);
      } catch (e) {
        console.error("Failed to fetch songs:", e);
      }
    };

    fetchSongs();
  }, []);

  useEffect(() => {
    try {
      if (query.trim() === "") {
        setResult([]);
        return;
      }
      const matched = allSongs.filter(
        (song) =>
          song.SongName.toLowerCase().includes(query.toLowerCase()) ||
          song.SongAuthor.toLowerCase().includes(query.toLowerCase())
      );
      setResult(matched);
    } catch (e) {
      console.error("Error filtering songs:", e);
    }
  }, [query, allSongs]);

  return (
    <div className="h-screen flex flex-row">
      <NavBar />
      <div className="w-full bg-gradient-to-b from-black via-zinc-800 to-white justify-center flex flex-col font-[libre-caslon-text]">
        <div className="justify-center flex flex-col items-center">
          <div className="text-5xl sm:text-6xl md:text-9xl text-[#8B73A0] font-extrabold mb-20">
            Lyriverse
          </div>

          <div className="justify-center w-full flex flex-row items-center">
            <div className="w-2/3 m-8 flex flex-row bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-3 shadow-sm">
              <input
                className="w-full text-lg font-[libre-caslon-text] bg-transparent focus:outline-none"
                placeholder="Search for song name, artist name"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button className="text-3xl text-gray-400 hover:bg-gray-200 rounded-lg px-2">
                <CiSearch />
              </button>
            </div>
          </div>

          {query && (
            <div className="flex flex-col h-[45vh] mt-4 gap-2 w-2/3 bg-white rounded-xl p-8 overflow-scroll">
              {result.length > 0 ? (
                result.map((song) => (
                  <button
                    key={song.SongId}
                    onClick={() => navigate(`/detail/${song.SongId}`)}
                    className="text-left group"
                  >
                    <div className="flex flex-row gap-4 text-xl">
                      <div className="text-[#8B73A0] text-xs sm:text-xl group-hover:text-[#491C70]">
                        {song.SongName}
                      </div>
                      <div className="text-gray-400  text-xs sm:text-xl group-hover:text-[#491C70]">
                        by {song.SongAuthor}
                      </div>
                    </div>
                  </button>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center gap-2 w-full h-full">
                  <p className="text-black text-lg font-semibold">
                    Music Not Found
                  </p>
                  <button
                    onClick={() => navigate("/addnewsong")}
                    className="text-sm text-white px-4 py-2 bg-[#491C70] hover:bg-gray-500 rounded-xl"
                  >
                    Add New Song
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
