import { db } from "../index.ts";

export const getAllSongs = async() => {
    const songs = await db.songs.findMany();
    return songs;
};

export const getSongsById = async(songId: number) => {
    const songs = await db.songs.findUnique({
        where: {
            SongId: songId,
        },
    })
    return songs;
};

export const editSongs = async(songId: number, lyrics: string) => {
    const songs = await db.songs.update({
        where: {
            SongId: songId,
        },
        data: {
            SongLyrics:lyrics,
        }
    })
    return songs;
}

export const deleteSongs = async(userId: number, songId: number) => {
    const songs = await db.songs.findFirst({
        where: {
            UserId: userId,
            SongId: songId
        }
    });

    if(!songs) {
        return null;
    }

    return await db.songs.delete({
        where: {
            SongId: songId,
        }
    });
}

export const searchSongsByName = async(songName: string) => {
  return await db.songs.findMany({
    where: {
      SongName: {
        contains: songName,
      },
    },
    orderBy: {
      SongName: 'asc',
    },
  })
}

export const createSong = async(songName: string, SongLyrics: string, SongAuthor: string, userId: number) => {
    const songs = await db.songs.create({
        data: {
            SongName: songName,
            SongLyrics: SongLyrics,
            SongAuthor: SongAuthor,
            UserId: userId,
        }
    })
    return songs;
}

