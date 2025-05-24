import { Axios } from "../utils/axiosInstance";

export const createSong = async (name: string, lyrics: string) => {
  return await Axios.post(
    "/song/create",
    { songName: name, songLyrics: lyrics },
    { withCredentials: true }
  );
};
