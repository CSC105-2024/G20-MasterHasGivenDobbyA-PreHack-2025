import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import { CiSearch } from "react-icons/ci";

const songList = [
  { id: "1", title: "Love Story", artist: "Taylor Swift" },
  { id: "2", title: "Lonely", artist: "Akon" },
  { id: "3", title: "Light", artist: "BTS" },
  { id: "4", title: "Lies", artist: "BIGBANG" },
  { id: "5", title: "Hello", artist: "Adele" },
  { id: "6", title: "Lonely", artist: "Akon" },
  { id: "7", title: "Light", artist: "BTS" },
  { id: "8", title: "Lies", artist: "BIGBANG" },
  { id: "9", title: "Hello", artist: "Adele" },
  { id: "10", title: "Love Story", artist: "Taylor Swift" },
  { id: "11", title: "Lonely", artist: "Akon" },
  { id: "12", title: "Light", artist: "BTS" },
  { id: "13", title: "Lies", artist: "BIGBANG" },
  { id: "14", title: "Love Story", artist: "Taylor Swift" },
  { id: "15", title: "Lonely", artist: "Akon" },
  { id: "16", title: "Light", artist: "BTS" },
  { id: "17", title: "Lies", artist: "BIGBANG" },  
  { id: "18", title: "Esspesso", artist: "Sabina Carpanter" },
];

export default function Home() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<typeof songList>([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (query.trim() === "") {
      setResult([]);
      return;
    }
    const matched = songList.filter(
      (song) =>
        song.title.toLowerCase().startsWith(query.toLowerCase()) ||
        song.artist.toLowerCase().startsWith(query.toLowerCase())
    );
    setResult(matched);
  }, [query]);
  return (
    <>
      <div className="h-screen flex flex-row">
        <NavBar />
        <div className="w-full bg-gradient-to-b from-black via-zinc-800 to-white justify-center flex flex-col font-[libre-caslon-text]cc">
          <div className="justify-center flex flex-col items-center">
            <div className="text-5xl sm:text-6xl md:text-9xl text-[#8B73A0] font-extrabold justify-center flex flex-row items-center mb-20 font-[libre-caslon-text]">
              Lyriverse
            </div>
            <div className="justify-center w-full flex flex-row items-center ">
              <div className="w-2/3 sm:w-2/3 m-8 flex flex-row bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-3 shadow-sm">
                <input
                  className="w-full sm:w-full text-lg font-[libre-caslon-text]"
                  placeholder="Search for song name, artist name"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button className=" flex items-center justify-center text-3xl text-gray-400 bg-gray-50 rounded-lg hover:bg-gray-200">
                  <CiSearch />
                </button>
              </div>
            </div>
            {query && (
              <div className="flex flex-col h-[45vh] mt-4 gap-2 w-2/3 sm:w-2/3 bg-white rounded-xl p-8 font-[libre-caslon-text] overflow-scroll">
                {result.length > 0 ? (
                  result.map((song) => (
                    <button
                      key={song.id}
                      onClick={() => navigate(`/getsongbyid/${song.id}`)}
                      className="text-lg text-left group"
                    >
                      <div className="flex flex-row gap-4 text-xl ">
                        <div className="text-[#8B73A0] group-hover:text-[#491C70] ">
                          {song.title}
                        </div>
                        <div className="text-gray-400 group-hover:text-[#491C70]">
                          by {song.artist}
                        </div>
                      </div>
                    </button>
                  ))
                ) : query ? (
                  <div className="flex flex-col items-center justify-center gap-2 w-full h-full">
                    <p className="text-black text-lg font-semibold">
                      Music Not Found
                    </p>
                    <button
                      onClick={() => navigate("/addnewsong")}
                      className="text-sm text-white px-4 py-2 bg-[#491C70]  hover:bg-gray-500 rounded-xl"
                    >
                      Add New Song
                    </button>
                  </div>
                ) : null}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
