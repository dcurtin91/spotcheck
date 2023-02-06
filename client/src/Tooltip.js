import React, { useEffect, useRef, useState } from "react";
import info from './info_circle_icon_160028.png';

export default function Tooltip() {
    const ref = useRef()

    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        const handleClickOutside = event => {
            if (ref.current && !ref.current.contains(event.target)) {
                setIsOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [isOpen, ref]
    )


    return (
        <div ref={ref}>

            <img src={info} alt={"info"} className="infobutton" onClick={() => setIsOpen(!isOpen)} />
            {isOpen && <div className="span">You're connected to the desktop version of Spotify where, unlike on mobile, audio is not normalized. <br></br><a href='https://artists.spotify.com/en/help/article/loudness-normalization' target="_blank" rel="noreferrer">According to Spotify</a>, all tracks on the mobile app are normalized to -14 LUFS.
                <h2 onClick={() => setIsOpen(false)}>close</h2></div>}
        </div>
    )
}
