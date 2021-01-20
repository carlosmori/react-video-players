import { rootCertificates } from "tls";

import React, { useEffect, useReducer, useState } from 'react'
import ReactPlayer from '../react-player/index';

interface Props {
    url: string;
}

/* 
    ! Mux API Tokens
    Access Token ID:
    13c0a589-ac91-4e04-9caa-5b475665b3a9

    Secret Key:
    Sq2a4/rZmhQE+yatsS8SHFrfKMymSnAFltrVNjQbo9zoCIx9Bc3RTQflHoJSOKGJnP+fC6rE77i
*/

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

const ReactPlayerWrapper: React.FC<Props> = props => {

    const [videoOptions, dispatch] = useReducer(reducer, {
        url: props.url,
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
    const {url, played, loaded, pip, playing, controls, light, duration, loop, volume, muted, seeking, playbackRate} = videoOptions;
    const SEPARATOR = ' · '

    const load = url => {
        dispatch({type: "LOAD", payload: {url, played: 0, loaded: 0, pip: false}})
    }

    const handlePlayPause = () => {
        dispatch({type: "HANDLE_PLAY_PAUSE", payload: {playing: !videoOptions.playing}})
    }
    const handleStop = () => {
        dispatch({type: "HANDLE_STOP" , payload: {url: null, playing: false}});
      }
    
    const handleToggleControls = () => {
        const url = videoOptions.url
        dispatch({type: "HANDLE_TOGGLE_CONTROLS" , payload: {controls: !videoOptions.controls, url: null}}) 
        // !Todo check if this callback gets called
        load(url)
            // this.setState({
            //     controls: !this.state.controls,
            //     url: null
            // }, () => this.load(url))
    }
    
    const handleToggleLight = () => {
        dispatch({type: "HANDLE_TOGGLE_LIGHT" , payload: {light: !videoOptions.light}}) 
    }
    
    const handleToggleLoop = () => {
        dispatch({type: "HANDLE_TOGGLE_LOOP" , payload: {loop: !videoOptions.loop}}) 
    }

    const handleVolumeChange = e => {
        dispatch({type: "HANDLE_VOLUME_CHANGE" , payload: {volume: parseFloat(e.target.value)}})
    }

    const handleToggleMuted = () => {
        dispatch({type: "HANDLE_TOGGLE_MUTED" , payload: {muted: !videoOptions.mute}})
    }
    

    const handleSetPlaybackRate = e => {
        dispatch({type: "HANDLE_SET_PLAYBACK_RATE" , payload: {playbackRate: parseFloat(e.target.value)}}) 
    }
    
    const handleTogglePIP = () => {
        dispatch({type: "HANDLE_TOGGLE_PIP" , payload: {pip: !videoOptions.pip}})
    }
    

    const handlePlay = () => {
        dispatch({type: "HANDLE_PLAY" , payload: {playing: true}});
    }
    
    const handleEnablePIP = () => {
        dispatch({type: "HANDLE_ENABLE_PIP" , payload: {pip:true}})
    }

    const handleDisablePIP = () => {
        dispatch({type: "HANDLE_DISABLE_PIP" , payload: {pip:false}})
    }
    
    const handlePause = () => {
        dispatch({type: "HANDLE_PAUSE" , payload: {playing: false}})
    }
      
    const handleSeekMouseDown = () => {
        dispatch({type: "HANDLE_SEEK_MOUSE_DOWN" , payload: {seeking: true}})
    }
    
    const handleSeekChange = e => {
        dispatch({type: "HANDLE_SEEK_CHANGE" , payload: {
            played: parseFloat(e.target.value)
        }})
    }
    
    const handleSeekMouseUp = e => {
        dispatch({type: "HANDLE_SEEK_MOUSE_UP" , payload: {seeking: false}}) 
        // !CHECK THIS
        // this.player.seekTo(parseFloat(e.target.value))
    }
    
    // !CHECK THIS
      const handleProgress = state => {
        // We only want to update time slider if we are not currently seeking
        if (!videoOptions.seeking) {
        //   dispatch({type: "" , payload: {...}}) 
        //   this.setState(state)
        }
      }
    
    const handleEnded = () => {
     dispatch({type: "HANDLE_ENDED" , payload: {playing: videoOptions.loop}})
    }
    
    const handleDuration = (duration) => {
        dispatch({type: "HANDLE_DURATION" , payload: {duration}})
    }
    // !Check This
    // const handleClickFullscreen = () => {
    // screenfull.request(findDOMNode(this.player))
    // }
    const renderLoadButton = (url, label) => {
        return (
          <button onClick={() => load(url)}>
            {label}
          </button>
        )
      }
    
      const ref = player => {
        player = player
      }
      
    return (
        <div className='app'>
        <section className='section'>
          <h1>ReactPlayer Demo</h1>
          <div className='player-wrapper'>
            <ReactPlayer
              ref={ref}
              className='react-player'
              width='100%'
              height='100%'
              url={url}
              pip={pip}
              playing={playing}
              controls={controls}
              light={light}
              loop={loop}
              playbackRate={playbackRate}
              volume={volume}
              muted={muted}
              onReady={() => console.log('onReady')}
              onStart={() => console.log('onStart')}
              onPlay={handlePlay}
              onEnablePIP={handleEnablePIP}
              onDisablePIP={handleDisablePIP}
              onPause={handlePause}
              onBuffer={() => console.log('onBuffer')}
              onSeek={e => console.log('onSeek', e)}
              onEnded={handleEnded}
              onError={e => console.log('onError', e)}
              onProgress={handleProgress}
              onDuration={handleDuration}
            />
        </div>
          </section>
          {/* <div>
              React Player
              <ReactPlayer url='https://stream.mux.com/RYCzMFUMGpjpDPS3102Sl1gfDxLf1TAbFYfqGjww2zdk.m3u8' />
          </div> */}
          </div>
    )
}

export default ReactPlayerWrapper
