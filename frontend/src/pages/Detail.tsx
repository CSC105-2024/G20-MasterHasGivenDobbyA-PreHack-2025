import Axios from "../utils/axiosInstance";
import Nav from "../components/NavBar";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";

export function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [editedLyrics, setEditedLyrics] = useState("");
  const [song, setSong] = useState<any>({});
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState<string>("");
  const [myUserId, setMyUserId] = useState<number | null>(null);
  const [query, setQuery] = useState("");
  const [allSongs, setAllSongs] = useState<any[]>([]);
  const [result, setResult] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      try {
        const resSong = await Axios.get(`/song/getsongbyid?id=${id}`);
        const songData = resSong.data.data;
        setSong(songData);
        setEditedLyrics(songData.songLyrics);

        const resUser = await Axios.get(`/user/getuser?id=${songData.UserId}`);
        setUsername(resUser.data.UserName);

        const resMe = await Axios.get("/user/me", { withCredentials: true });
        setMyUserId(resMe.data.data.id);
      } catch (e) {
        console.error(" Error fetching song or user:", e);
      }
    };
    fetchData();
  }, [id]);

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

  const handleSave = async () => {
    try {
      await Axios.put(`/song/edit?id=${id}`, {
        lyrics: editedLyrics,
      });
      setSong({ ...song, SongLyrics: editedLyrics });
      setIsEditing(false);
      console.log("saving successfully");
    } catch (e) {
      console.error(" Error saving:", e);
    }
  };

  const handleDelete = async () => {
    try {
      await Axios.delete(`/song/delete?id=${id}`, { withCredentials: true });
      console.log("delete successfully");
      navigate("/home");
    } catch (e) {
      console.error(" Error delete", e);
    }
  };

  return (
    <div className="min-h-screen flex md:flex-row flex-col font-libre-caslon-text">
      <Nav />
      <div className="bg-neutral-800 flex-1 w-full px-4 py-6">
        <div className="flex flex-col items-start w-full max-w-[1024px] mx-auto">
          <div className="mb-6">
            <div className="flex flex-col gap-2">
              <h1 className="text-4xl md:text-5xl text-[#8B73A0]">
                {song.SongName}
              </h1>
              <p className="text-2xl md:text-3xl text-white">
                {song.SongAuthor}
              </p>
              <p className="text-2xl md:text-3xl text-white">
                Lyrics provided by {username}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full mb-4">
            <div className="flex flex-grow items-center bg-gray-50 border border-gray-300 text-sm rounded-lg p-3 shadow-sm">
              <input
                className="flex-grow text-lg font-[libre-caslon-text] bg-transparent focus:outline-none"
                placeholder="Search for song name, artist name"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button className="text-3xl text-gray-400 hover:bg-gray-200 rounded-lg px-2">
                <CiSearch />
              </button>
            </div>

            <div className="flex flex-row gap-3 flex-shrink-0">
              {isEditing ? (
                <button
                  className="text-white bg-purple-900 hover:bg-[#8B73A0] px-4 py-2 rounded-2xl text-lg"
                  onClick={handleSave}
                >
                  Save
                </button>
              ) : (
                <button
                  className="text-white bg-purple-900 hover:bg-[#8B73A0] px-4 py-2 h-14 rounded-2xl text-lg"
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </button>
              )}
              {myUserId === song.UserId && (
                <button
                  onClick={handleDelete}
                  className="text-purple-900 bg-zinc-300 hover:bg-[#8B73A0] h-14 hover:text-white px-4 py-2 rounded-2xl text-lg"
                >
                  Delete
                </button>
              )}
            </div>
          </div>

          {query && (
            <div className="relative w-full">
              <div className="absolute top-0 w-full max-h-[300px] overflow-y-auto bg-white rounded-xl p-3 shadow-xl border border-gray-300 z-50">
                {result.length > 0 ? (
                  result.map((song) => (
                    <button
                      key={song.SongId}
                      onClick={() => navigate(`/detail/${song.SongId}`)}
                      className="text-left group w-full mb-3"
                    >
                      <div className="w-full flex flex-col sm:flex-row gap-2 text-base sm:text-lg">
                        <div className="text-[#8B73A0] group-hover:text-[#491C70] truncate">
                          {song.SongName}
                        </div>
                        <div className="text-gray-400 group-hover:text-[#491C70] truncate">
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
            </div>
          )}

          <div className="Lyrics bg-white rounded-3xl w-full h-[50vh] md:h-[500px] overflow-y-auto p-6 mt-6">
            <div className="flex justify-center items-center w-full h-full">
              {isEditing ? (
                <textarea
                  value={editedLyrics}
                  onChange={(e) => setEditedLyrics(e.target.value)}
                  className="h-full w-full resize-none bg-transparent outline-none text-2xl md:text-3xl leading-relaxed font-['Libre_Caslon_Text'] p-2 whitespace-pre-wrap"
                  placeholder="Type your lyrics here..."
                />
              ) : (
                <textarea
                  value={song.SongLyrics}
                  className="h-full w-full resize-none bg-transparent outline-none text-2xl md:text-3xl leading-relaxed font-['Libre_Caslon_Text'] p-2 whitespace-pre-wrap"
                  readOnly
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;
