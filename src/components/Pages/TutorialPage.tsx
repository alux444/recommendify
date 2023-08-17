const TutorialPage = () => {
    return (
        <div className="flex justify-center text-center flex-wrap flex-col p-4">
            <h2 className="text-lg grad">How to use TrackTrekker</h2>
            <br />
            <hr></hr>
            <br />
            <p>Select at least one song, artist or genre for your search.</p>
            <small>
                Note: Not all songs will be avaliable, nor will all songs have
                previews or stats.
            </small>
            <br />
            <p>
                After making a selection, click get results to receive your
                recommendations.
            </p>
            <p>
                Using the reroll function, you can reroll the selection of songs
                avaliable
            </p>
            <small>
                Note: Sometimes your search will be too complicated, or you have
                too many obscure songs/artists. You'll just have to simplify
                your search.
            </small>
            <br />
            <p>
                You can add songs from your search to further refine it. Click
                get results again to use this new search.
            </p>
            <br />
            <p>
                Through the "extras" section you can filter and sort the
                results.
            </p>
            <p>
                All results will be filtered within your maximum and minimum
                range.
            </p>
            <br />
            <p>
                The target will define how your results are sorted. Results will
                be sorted by the closest values to your given target(s).
            </p>
            <br />
            <p>
                For example, having a target with popularity 0 would result in
                the results being sorted from ascending popularity.
            </p>
        </div>
    );
};

export default TutorialPage;
