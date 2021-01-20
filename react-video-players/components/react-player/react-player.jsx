import React, { Component, Suspense, lazy } from 'react'
import merge from 'deepmerge'
import memoize from 'memoize-one'
import isEqual from 'react-fast-compare'

import { propTypes, defaultProps } from '../props/props'
import Player from '../player/player';

export function omit (object, ...arrays) {
    const omitKeys = [].concat(...arrays)
    const output = {}
    const keys = Object.keys(object)
    for (const key of keys) {
      if (omitKeys.indexOf(key) === -1) {
        output[key] = object[key]
      }
    }
    return output
  }

const Preview = lazy(() => import(/* webpackChunkName: 'reactPlayerPreview' */'../preview/preview'))

const IS_BROWSER = typeof window !== 'undefined' && window.document
const SUPPORTED_PROPS = Object.keys(propTypes)

// Return null when rendering on the server
// as Suspense is not supported yet
const UniversalSuspense = IS_BROWSER ? Suspense : () => null

const customPlayers = []

export const createReactPlayer = (players, fallback) => {
  return class ReactPlayer extends Component {
    static displayName = 'ReactPlayer'
    static propTypes = propTypes
    static defaultProps = defaultProps
    static addCustomPlayer = player => { customPlayers.push(player) }
    static removeCustomPlayers = () => { customPlayers.length = 0 }

    static canPlay = url => {
      for (const Player of [...customPlayers, ...players]) {
        if (Player.canPlay(url)) {
          return true
        }
      }
      return false
    }

    static canEnablePIP = url => {
      for (const Player of [...customPlayers, ...players]) {
        if (Player.canEnablePIP && Player.canEnablePIP(url)) {
          return true
        }
      }
      return false
    }

    state = {
      showPreview: !!this.props.light
    }

    // Use references, as refs is used by React
    references = {
      wrapper: wrapper => { this.wrapper = wrapper },
      player: player => { this.player = player }
    }

    shouldComponentUpdate (nextProps, nextState) {
      return !isEqual(this.props, nextProps) || !isEqual(this.state, nextState)
    }

    componentDidUpdate (prevProps) {
      const { light } = this.props
      if (!prevProps.light && light) {
        this.setState({ showPreview: true })
      }
      if (prevProps.light && !light) {
        this.setState({ showPreview: false })
      }
    }

    handleClickPreview = () => {
      this.setState({ showPreview: false })
    }

    showPreview = () => {
      this.setState({ showPreview: true })
    }

    getDuration = () => {
      if (!this.player) return null
      return this.player.getDuration()
    }

    getCurrentTime = () => {
      if (!this.player) return null
      return this.player.getCurrentTime()
    }

    getSecondsLoaded = () => {
      if (!this.player) return null
      return this.player.getSecondsLoaded()
    }

    getInternalPlayer = (key = 'player') => {
      if (!this.player) return null
      return this.player.getInternalPlayer(key)
    }

    seekTo = (fraction, type) => {
      if (!this.player) return null
      this.player.seekTo(fraction, type)
    }

    handleReady = () => {
      this.props.onReady(this)
    }

    getActivePlayer = memoize(url => {
      for (const player of [...customPlayers, ...players]) {
        if (player.canPlay(url)) {
          return player
        }
      }
      if (fallback) {
        return fallback
      }
      return null
    })

    getConfig = memoize((url, key) => {
      const { config } = this.props
      return merge.all([
        defaultProps.config,
        defaultProps.config[key] || {},
        config,
        config[key] || {}
      ])
    })

    getAttributes = memoize(url => {
      return omit(this.props, SUPPORTED_PROPS)
    })

    renderPreview (url) {
      if (!url) return null
      const { light, playIcon } = this.props
      return (
        <Preview
          url={url}
          light={light}
          playIcon={playIcon}
          onClick={this.handleClickPreview}
        />
      )
    }

    renderActivePlayer = url => {
      if (!url) return null
      const player = this.getActivePlayer(url)
      if (!player) return null
      const config = this.getConfig(url, player.key)
      return (
        <Player
          {...this.props}
          key={player.key}
          ref={this.references.player}
          config={config}
          activePlayer={player.lazyPlayer || player}
          onReady={this.handleReady}
        />
      )
    }

    render () {
      const { url, style, width, height, wrapper: Wrapper } = this.props
      const { showPreview } = this.state
      const attributes = this.getAttributes(url)
      return (
        <Wrapper ref={this.references.wrapper} style={{ ...style, width, height }} {...attributes}>
          <h2>Inside react player</h2>
          <UniversalSuspense fallback={null}>
            {showPreview
              ? this.renderPreview(url)
              : this.renderActivePlayer(url)}
          </UniversalSuspense>
        </Wrapper>
      )
    }
  }
}