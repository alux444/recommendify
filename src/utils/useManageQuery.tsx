import { useContext } from "react";
import {
    ArtistInfoContext,
    ArtistSeedContext,
    SongSeedContext,
    SongsInfoContext,
} from "../App";
import { SongInfo } from "../interfaces/songInfo";

const useManageQuery = () => {
    const { songSeeds, setSongSeeds } = useContext(SongSeedContext);
    const { artistSeeds, setArtistSeeds } = useContext(ArtistSeedContext);
    const { songs, setSongs } = useContext(SongsInfoContext);
    const { artists, setArtists } = useContext(ArtistInfoContext);

    const addSong = (song: SongInfo) => {
        if (!songSeeds.includes(song.id)) {
            const updatedSongSeeds = [...songSeeds, song.id];
            setSongSeeds(updatedSongSeeds);
            const updatedSongs = [...songs, song];
            setSongs(updatedSongs);
        }
    };

    const removeSong = (song: SongInfo) => {
        const updatedSongSeeds = songSeeds.filter((seed) => seed !== song.id);
        const updatedSongs = songs.filter(
            (thisSong) => thisSong.id !== song.id
        );
        setSongSeeds(updatedSongSeeds);
        setSongs(updatedSongs);
    };

    const addArtist = (seed: string) => {
        const updatedArtistSeeds = [...artistSeeds, seed];
        setArtistSeeds(updatedArtistSeeds);
    };

    const removeArtist = (seedToRemove: string) => {
        const updatedArtistSeeds = songSeeds.filter(
            (seed) => seed !== seedToRemove
        );
        setArtistSeeds(updatedArtistSeeds);
    };

    return { addSong, removeSong, addArtist, removeArtist };
};

export default useManageQuery;