import { useContext, useEffect, useState } from "react";
import { SongInfo } from "../../interfaces/songInfo";
import useManageQuery from "../../utils/useManageQuery";
import useSpotify from "../../utils/useSpotify";
import { AudioFeatures } from "../../interfaces/audioFeatures";
import FeaturesDisplay from "./FeaturesDisplay";
import { StatsContext } from "../Pages/HomePage";

const SongDisplay = ({
    songInfo,
    type,
}: {
    songInfo: SongInfo;
    type: number;
}) => {
    const { showStats } = useContext(StatsContext);
    const [thisShowStats, setThisShowStats] = useState<boolean>(false);
    const [selected, setSelected] = useState(false);
    const [features, setFeatures] = useState<AudioFeatures | undefined>();
    const { addSong, removeSong } = useManageQuery();

    const { getFeatures } = useSpotify();

    useEffect(() => {
        const fetchFeaturesForThisSong = async () => {
            const res: AudioFeatures | undefined = await getFeatures(
                songInfo.id
            );
            setFeatures(res);
        };
        fetchFeaturesForThisSong();
    }, []);

    const artists = songInfo.artists.slice(0, 3).map((artist, index) => (
        <a key={artist.id} href={artist.external_urls.spotify}>
            <small>
                <span>{artist.name}</span>
                {index === 2 && songInfo.artists.length > 3 && (
                    <span className="">
                        {" "}
                        ...+{songInfo.artists.length - 3} more
                    </span>
                )}
            </small>
        </a>
    ));

    return (
        <div className={`md:flex justify-center w-full text-[rgba(0,0,0,0.8)]`}>
            <div
                className={`flex justify-between flex-col xs:flex-row items-center p-5 w-full lg:w-[40%] md:w-[70%] border-[${
                    type === 2 ? "0px" : "1px"
                }] rounded-[30px] backdrop-blur-3xl`}
            >
                <div className="flex p-1 gap-5 items-center flex-col xs:flex-row">
                    <img
                        src={songInfo.album.images[2].url}
                        className="rounded-[10px]"
                    />
                    <div className="block">
                        <a href={songInfo.external_urls.spotify}>
                            <h2 className="text-lg flex gap-2 items-center flex-wrap break-all">
                                {songInfo.explicit && (
                                    <div className="border-[1px] rounded-lg text-gray-400 px-[7px]">
                                        E
                                    </div>
                                )}
                                {songInfo.name.length < 30
                                    ? songInfo.name
                                    : songInfo.name.substring(0, 29) + "..."}
                            </h2>
                        </a>
                        <div>
                            <div className="flex flex-col gap-1s">
                                {artists}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex xs:flex-col align-center  gap-2 items-center">
                    {type === 1 && !selected && (
                        <button
                            className="buttonselect"
                            onClick={() => {
                                addSong(songInfo);
                                setSelected(true);
                            }}
                        >
                            <span>+</span>
                        </button>
                    )}{" "}
                    {(type === 2 || selected) && (
                        <button
                            className="buttoncancel"
                            onClick={() => {
                                removeSong(songInfo);
                                setSelected(false);
                            }}
                        >
                            <span>&times;</span>
                        </button>
                    )}
                    {!showStats && (type === 1 || type === 3) && (
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
            </div>

            {features &&
                (type === 1 || type === 3) &&
                (showStats || thisShowStats) && (
                    <div className="w-full lg:w-[20vw] md:w-[30vw] p-2">
                        <FeaturesDisplay
                            features={features}
                            popularity={songInfo.popularity}
                        />
                    </div>
                )}
        </div>
    );
};

export default SongDisplay;