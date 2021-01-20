import Head from 'next/head'
import styles from '../styles/Home.module.css'
import VideoJs from '../components/video-js/video-js';
import ReactPlayerWrapper from '../components/react-player-wrapper/react-player-wrapper';
import CustomReactPlayer from '../components/CustomReactPlayer/CustomReactPlayer';
export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>React Video Players</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to React Video Player Demos
        </h1>
        <CustomReactPlayer url="https://stream.mux.com/P1CE00U1Ro9y4R35Srk8PzFPER7gogUQncNMVwxbv3ZE.m3u8"/>
        {/* <h3>Library <a href="https://www.npmjs.com/package/react-player">react-player</a></h3>
        <ReactPlayerWrapper url='https://stream.mux.com/013Z4TWLev8u61JmoXyx5q02yABUq9L3hR7se1b102V3og.m3u8' /> */}
        {/* <h3>Library <a href="https://www.npmjs.com/package/video.js">video.js</a></h3>
        <VideoJs/> */}
      </main>
    </div>
  )
}
