import { rootCertificates } from "tls";

import React from 'react'
import ReactPlayer from 'react-player'


interface Props {
    text: string
}

/* 
! Mux API Tokens
Access Token ID:
13c0a589-ac91-4e04-9caa-5b475665b3a9

Secret Key:
Sq2a4/rZmhQE+yatsS8SHFrfKMymSnAFltrVNjQbo9zoCIx9Bc3RTQflHoJSOKGJnP+fC6rE77i

*/
const ReactPlayerWrapper: React.FC<Props> = () => {
    return (
        <div>
            React Player
            <ReactPlayer url='https://stream.mux.com/RYCzMFUMGpjpDPS3102Sl1gfDxLf1TAbFYfqGjww2zdk.m3u8' />
        </div>
    )
}

export default ReactPlayerWrapper
