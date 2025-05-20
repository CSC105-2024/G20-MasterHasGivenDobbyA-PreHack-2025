import { Hono } from "hono";
import * as songController from '../controllers/songs.controller.ts';

export const songsRouter = new Hono();

songsRouter.get('/getallsongs', songController.getAllSongs);
songsRouter.get('/getsongbyid', songController.getAllSongsById);
songsRouter.put('/edit', songController.editSongs);
songsRouter.get('/search', songController.searchSongsByName);
songsRouter.delete('/delete', songController.deleteSong);
songsRouter.post('/create', songController.createSong);