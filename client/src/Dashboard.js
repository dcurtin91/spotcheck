import { useState, useEffect } from "react"
import { accessToken } from "./spotify"
import Player from "./Player"
import TrackSearchResult from "./TrackSearchResult"
import Tooltip from "./Tooltip"
import SpotifyWebApi from "spotify-web-api-node"
import './App.css'



const spotifyApi = new SpotifyWebApi({
    clientId: "f1f3f5e5168447909b5f76ad89ed17da",
})


export default function Dashboard() {
    const [search, setSearch] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [playingTrack, setPlayingTrack] = useState()

    function chooseTrack(track) {
        setPlayingTrack(track)
        setSearch("")
    }



    useEffect(() => {
        if (!accessToken) return
        spotifyApi.setAccessToken(accessToken)
    })
    useEffect(() => {
        if (!search) return setSearchResults([])
        if (!accessToken) return

        let cancel = false
        spotifyApi.searchTracks(search).then(res => {
            if (cancel) return
            setSearchResults(
                res.body.tracks.items.map(track => {
                    const smallestAlbumImage = track.album.images.reduce(
                        (smallest, image) => {
                            if (image.height < smallest.height) return image
                            return smallest
                        },
                        track.album.images[0]
                    )

                    return {
                        artist: track.artists[0].name,
                        title: track.name,
                        uri: track.uri,
                        albumUrl: smallestAlbumImage.url,
                    }
                })
            )
        })

        return () => (cancel = true)
    }, [search])

    return (
        <div>
            <h1 className="compare">Compare to Spotify</h1>
            <form>
                <input type="text" className="search" placeholder="Search Songs/Artists" value={search} onChange={e => setSearch(e.target.value)} />
            </form>
            <div className="flex5" style={{ overflowY: "auto" }}>
                {searchResults.map(track => (
                    <TrackSearchResult
                        track={track}
                        key={track.uri}
                        chooseTrack={chooseTrack}
                    />
                ))}

            </div>
            <div className="spotifyplayer">
                <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
            </div>
            <div className="flex6"><Tooltip /></div>
        </div>
    )
} 