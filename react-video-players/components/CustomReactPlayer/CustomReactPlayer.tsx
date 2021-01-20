import React, { lazy, useReducer } from 'react'
import FilePlayer from './FilePlayer/FilePlayer';
import { supportsWebKitPresentationMode } from './VideoUtils/VideoUtils';
import { canPlay, AUDIO_EXTENSIONS } from './VideoPatterns/VideoPatterns';
import ReactPlayer from 'react-player/lazy'

const filePlayerProperties = {
    key: 'file',
    name: 'FilePlayer',
    canPlay: canPlay.file,
    canEnablePIP: url => {
    //   return canPlay.file(url) && (document.pictureInPictureEnabled || supportsWebKitPresentationMode()) && !AUDIO_EXTENSIONS.test(url)
      return canPlay.file(url) && (supportsWebKitPresentationMode()) && !AUDIO_EXTENSIONS.test(url)
    },
    lazyPlayer: lazy(() => import(/* webpackChunkName: 'reactPlayerFilePlayer' */'./FilePlayer/FilePlayer'))
  }
const reducer = (state, action) => {
    const {payload, type} = action;
    const {url, played, loaded, pip, playing, controls, light, duration, loop, volume, muted, seeking, playbackRate} = payload;

    switch (type) {
        case 'LOAD':
            return {...state, url, played, loaded, pip}
        case "HANDLE_STOP":
            return {...state, url, playing}
        case "HANDLE_TOGGLE_CONTROLS":
            return {...state, url, controls}
        case "HANDLE_TOGGLE_LIGHT":
            return {...state, light}
        case "HANDLE_TOGGLE_LOOP":
            return {...state, loop}
        case "HANDLE_VOLUME_CHANGE":
            return {...state, volume}
        case "HANDLE_TOGGLE_MUTED":
            return {...state, muted}
        case "HANDLE_SET_PLAYBACK_RATE":
            return {...state, playbackRate}
        case 'HANDLE_PLAY_PAUSE':
        case "HANDLE_PLAY": 
        case "HANDLE_PAUSE": 
        case "HANDLE_ENDED": 
            return {...state, playing}
        case "HANDLE_TOGGLE_PIP":
        case "HANDLE_ENABLE_PIP": 
        case "HANDLE_DISABLE_PIP": 
            return {...state, pip}
        case "HANDLE_SEEK_MOUSE_DOWN": 
        case "HANDLE_SEEK_MOUSE_UP": 
            return {...state, seeking}
        case "HANDLE_SEEK_CHANGE": 
            return {...state, played}
        case "HANDLE_DURATION": 
            return {...state, duration}
        default:
            break;
    }

}
// function FilePlayerWrapper(){
//     return <div>FilePlayerWrapper</div>
// }
function CustomReactPlayer({url}) {
    const [reactPlayerOptions, dispatch] = useReducer(reducer, {
        url: url,
        pip: false,
        playing: true,
        controls: false,
        light: false,
        volume: 0.8,
        muted: false,
        played: 0,
        loaded: 0,
        duration: 0,
        playbackRate: 1.0,
        loop: false
    })
    const player = FilePlayer;
    const plaVideo = () => {
        dispatch({type: 'HANDLE_PLAY_PAUSE', payload: {playing: !reactPlayerOptions.playing}})
    }
    return (
        <div>
            <ReactPlayer {...reactPlayerOptions} />
            <button onClick={plaVideo}>Play</button>
            {/* <FilePlayerWrapper 
                {...reactPlayerOptions}
                key={filePlayerProperties.key}
                ref={player}
                config={config}
                activePlayer={filePlayerProperties.lazyPlayer} /> */}
        </div>
    )
}

export default CustomReactPlayer
