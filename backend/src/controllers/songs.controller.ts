import * as songsModel from '../models/songs.model.ts'
import type { Context } from 'hono'
import { ConstructResponse } from '../utils/constructResponse.ts';
import { db } from '../index.ts';

export const getAllSongs = async (c: Context) => {
  try {
    const data = await songsModel.getAllSongs();
    return c.json(
      {
        success: true,
        data: data,
      },
      200
    );

  } catch (e) {
    return c.json(
      {
        success: false,
        data: null,
        msg: `${e}`,
      },
      500
    );
  }
};

export const getAllSongsById = async (c: Context) => {
  try {
    const param = c.req.query("id");
    if (!param) {
      return c.json(
        {
          success: false,
          data: null,
          msg: "Missing required field"
        },
        400
      );
    }

    const data = await songsModel.getSongsById(parseInt(param));
    return c.json(
      {
        success: true,
        data: data,
      },
      200
    );
  } catch (e) {
    return c.json(
      {
        success: false,
        data: null,
        msg: `${e}`,
      },
      500
    );
  }
};


export const editSongs = async (c: Context) => {
  try {
    const param = c.req.query("id");
    const { lyrics } = await c.req.json<{ lyrics: string }>();

    if (!param || !lyrics) {
      return c.json(
        {
          success: false,
          data: null,
          msg: "Missing required fields"
        },
        400
      );
    }
    const data = await songsModel.editSongs(parseInt(param), lyrics);
    return c.json(
      {
        success: true,
        data: data,
        msg: "Edit lyrics successful",
      },
      200
    );
  } catch (e) {
    return c.json(
      {
        success: true,
        data: null,
        msg: `${e}`,
      },
      500
    );
  }
};

export const searchSongsByName = async (c: Context) => {
  try {
    const param = c.req.query("keyword") || ''

    if (!param.trim()) {
      return c.json(
        {
          success: false,
          data: null,
          msg: "Keyword is required",
        },
        400
      );
    }

    const data = await songsModel.searchSongsByName(param);
    return c.json(
      {
        success: true,
        data: data,
      },
      200
    );
  } catch (e) {
    return c.json(
      {
        success: false,
        data: null,
        msg: `${e}`,
      },
      500
    );
  }
};


export const deleteSong = async (c: Context) => {
    try {
        const userId = c.get("userId");
        const songId = parseInt(c.req.query("id") || '');

        console.log(userId);
        

        if (!userId || isNaN(songId)) {
            return c.json(ConstructResponse(false, "userId or songId is required"), 400);
        }

        if(!await songsModel.getSongsById(songId)) {
            return c.json(ConstructResponse(false, "Music not found"), 400);
        }
        
        const deleted = await songsModel.deleteSongs(userId, songId);

        if(!deleted) {
            return c.json(ConstructResponse(false, "You are not authorize or Song not found"), 400)
        }

        return c.json(ConstructResponse(true, "Delete Successful", deleted), 200);

    } catch (e) {
        return c.json(ConstructResponse(false, "Internal Server Error"), 500);
    }
}

type createBody = {
  songName: string,
  songLyrics: string,
}

export const createSong = async(c: Context) => {
  try{
    const userId = c.get("userId");
    const body = await c.req.json<{
      songName: string;
      songLyrics: string;
      songAuthor: string;
    }>();

    if (!body.songName || !body.songLyrics || !body.songAuthor) {
      return c.json(ConstructResponse(false, "Missing required fields"), 400);
    }

    const user = await db.user.findUnique({
      where: { UserId: userId },
    });

    if (!user) {
      return c.json(ConstructResponse(false, "User not found"), 404);
    }

    const newSong = await songsModel.createSong(
      body.songName,
      body.songLyrics,
      body.songAuthor,
      userId
    );

    return c.json(ConstructResponse(true, "Song created", newSong), 200);
  } catch (e) {
    return c.json(ConstructResponse(false, "Internal Server Error", e), 500);
  }
};
