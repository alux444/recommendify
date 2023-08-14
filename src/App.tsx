import { createContext, useState } from "react";
import { SongInfo } from "./interfaces/songInfo";
import { ArtistInfo } from "./interfaces/artistInfo";
import { ExtraInfo } from "./interfaces/extrasInfo";
import { SelectOption } from "./components/Multiselect/Select";
import Views from "./components/Pages/Views";

export const TokenContext = createContext<{
    token: string | null;
    setToken: React.Dispatch<React.SetStateAction<string | null>>;
}>({
    token: null,
    setToken: () => {},
});

export const SongSeedContext = createContext<{
    songSeeds: string[];
    setSongSeeds: React.Dispatch<React.SetStateAction<string[]>>;
}>({
    songSeeds: [],
    setSongSeeds: () => {},
});

export const ArtistSeedContext = createContext<{
    artistSeeds: string[];
    setArtistSeeds: React.Dispatch<React.SetStateAction<string[]>>;
}>({
    artistSeeds: [],
    setArtistSeeds: () => {},
});

export const SongsInfoContext = createContext<{
    songs: SongInfo[];
    setSongs: React.Dispatch<React.SetStateAction<SongInfo[]>>;
}>({
    songs: [],
    setSongs: () => {},
});

export const ArtistInfoContext = createContext<{
    artists: ArtistInfo[];
    setArtists: React.Dispatch<React.SetStateAction<ArtistInfo[]>>;
}>({
    artists: [],
    setArtists: () => {},
});

export const GenreContext = createContext<{
    genres: SelectOption[];
    setGenres: React.Dispatch<React.SetStateAction<SelectOption[]>>;
}>({
    genres: [],
    setGenres: () => {},
});

export const ExtrasContext = createContext<{
    extras: ExtraInfo;
    setExtras: React.Dispatch<React.SetStateAction<ExtraInfo>>;
}>({
    extras: {},
    setExtras: () => {},
});

function App() {
    const [token, setToken] = useState<string | null>(null);
    const [songSeeds, setSongSeeds] = useState<string[]>([]);
    const [artistSeeds, setArtistSeeds] = useState<string[]>([]);
    const [songs, setSongs] = useState<SongInfo[]>([]);
    const [artists, setArtists] = useState<ArtistInfo[]>([]);
    const [genres, setGenres] = useState<SelectOption[]>([]);
    const [extras, setExtras] = useState<ExtraInfo>({});

    return (
        <TokenContext.Provider value={{ token, setToken }}>
            <SongSeedContext.Provider value={{ songSeeds, setSongSeeds }}>
                <ArtistSeedContext.Provider
                    value={{ artistSeeds, setArtistSeeds }}
                >
                    <SongsInfoContext.Provider value={{ songs, setSongs }}>
                        <ArtistInfoContext.Provider
                            value={{ artists, setArtists }}
                        >
                            <GenreContext.Provider
                                value={{ genres, setGenres }}
                            >
                                <ExtrasContext.Provider
                                    value={{ extras, setExtras }}
                                >
                                    <div className="flex justify-between align-center items-center min-h-screen w-screen overflow-auto">
                                        <Views />
                                    </div>
                                </ExtrasContext.Provider>
                            </GenreContext.Provider>
                        </ArtistInfoContext.Provider>
                    </SongsInfoContext.Provider>
                </ArtistSeedContext.Provider>
            </SongSeedContext.Provider>
        </TokenContext.Provider>
    );
}

export default App;
