import { rootCertificates } from "tls";

import React, { useEffect, useState } from 'react'
import videojs from 'video.js'

interface Person {
    name: string,
    age: number
}
interface Props {
    // * examples of prop validation
    /*
    text: string
    flag:boolean,
    (? makes the param optional)
    int?:number,
    fn: (param:string) => void,
    obj: {
        prop: string
    }
    person : Person
    */
}
const VideoJs: React.FC<Props> = props => {
    
    useEffect(() => {
        let player = videojs('my-player',{
            autoplay: 'muted',
            // controls: false,
            sources: [
                {
                    src: "https://stream.mux.com/fPdk4PQ8DphO6dJQO8GHhQjj3bl02xBqb8RM2C9I02UZ00.m3u8",
                    type: "application/x-mpegURL"
                }
            ],
            controlBar: true,
            loadingSpinner: false,
            bigPlayButton: false,
            textTrackSettings: false,
            errorDisplay: false,
            // children: [
            //     'bigPlayButton',
            //     'controlBar'
            //   ]
                    // controlBar: {
                    //     playToggle: false,
                    //     captionsButton: false,
                    //     chaptersButton: false,            
                    //     subtitlesButton: false,
                    //     remainingTimeDisplay: false,
                    //     progressControl: {
                    //     seekBar: true
                    //     },
                    //     fullscreenToggle: false,
                    //     playbackRateMenuButton: false,
                    // }
          });
        player.play()
        return () => {
            player.dispose()
        }
    }, [])
    return (
        <div>
            VideoJs
            <div data-vjs-player>
            <video
            id="my-player"
            className="video-js"
            // controls
            // preload="auto"
            //data-setup='{}'
            // poster="//vjs.zencdn.net/v/oceans.png"
            // data-setup='{}'>
            >
            {/* <source src="https://stream.mux.com/fPdk4PQ8DphO6dJQO8GHhQjj3bl02xBqb8RM2C9I02UZ00.m3u8" type="application/x-mpegURL"></source> */}
            </video>
            </div>
        </div>
    )
}

export default VideoJs
/*
! VisJs Video Player can be Fluid by adding 'vjs-fluid' class to the element, check https://docs.videojs.com/tutorial-layout.html
or {fluid: true}
*/