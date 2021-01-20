import players from '../players'
import { createReactPlayer } from './react-player'

// Fall back to FilePlayer if nothing else can play the URL
const fallback = players[players.length - 1]

export default createReactPlayer(players, fallback)