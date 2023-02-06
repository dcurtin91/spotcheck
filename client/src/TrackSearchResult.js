import React from "react"

export default function TrackSearchResult({ track, chooseTrack }) {
    function handlePlay() {
        chooseTrack(track)
    }

    return (

        <div
            className="d-flex m-2 align-items-center"
            style={{ cursor: "pointer" }}
            onClick={handlePlay}
        >
            <img src={track.albumUrl} alt="album art" style={{ height: "40px", width: "40px" }} />
            <div>
                <div>{track.title} - {track.artist}</div>
            </div>
        </div>
    )
}