import { useContext, useState } from "react";
import { ArtistInfo } from "../../interfaces/artistInfo";
import useManageQuery from "../../utils/useManageQuery";
import FeatureLevel from "./FeatureLevel";
import { StatsContext } from "../Pages/HomePage";

const ArtistDisplay = ({
    artist,
    fromSearch,
    type,
}: {
    artist: ArtistInfo;
    fromSearch: boolean;
    type: number;
}) => {
    const { showStats } = useContext(StatsContext);
    const [thisShowStats, setThisShowStats] = useState<boolean>(false);
    const [selected, setSelected] = useState(false);
    const { addArtist, removeArtist } = useManageQuery();

    const imageSrc =
        artist.images && artist.images.length >= 3 ? artist.images[0].url : "";

    return (
        <div className="flex flex-col gap-2 items-center border-[1px] p-2 xl:w-[15vw] lg:w-[20vw] sm:w-[30vw] w-[40vw] justify-between rounded-[30px]">
            <h2>{artist.name}</h2>
            <a href={artist.external_urls.spotify}>
                <img
                    className="lg:w-[15vw] w-[25vw] rounded-[20px]"
                    src={imageSrc}
                    alt={artist.name}
                />
            </a>
            <div className="flex items-center flex-wrap gap-2 justify-center align-center">
                {fromSearch && !selected && (
                    <button
                        className="buttonselect"
                        onClick={() => {
                            addArtist(artist);
                            setSelected(true);
                        }}
                    >
                        <span>+</span>
                    </button>
                )}
                {(!fromSearch || selected) && (
                    <button
                        className="buttoncancel"
                        onClick={() => {
                            removeArtist(artist);
                            setSelected(false);
                        }}
                    >
                        <span>&times;</span>
                    </button>
                )}
                {!showStats && type === 1 && (
                    <button
                        className="button1 w-[150pxs]"
                        type="button"
                        onClick={() => setThisShowStats(!thisShowStats)}
                    >
                        <span className="button1-content">
                            {thisShowStats ? "Hide" : "Stats"}
                        </span>
                    </button>
                )}
            </div>
            {(type === 1 || type === 3) && (showStats || thisShowStats) && (
                <>
                    <div>
                        <small>Followers: {artist.followers.total}</small>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex justify-between">
                            <small>Popularity: {artist.popularity}</small>
                        </div>
                        <FeatureLevel inputVal={artist.popularity} gap={10} />
                    </div>
                </>
            )}
        </div>
    );
};

export default ArtistDisplay;