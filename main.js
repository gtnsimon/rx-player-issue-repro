// load styles for demo
import './styles.scss'

import RxPlayer from 'rx-player/minimal'
import { DASH } from 'rx-player/features'

// keep reference to rx-player element to dispose it later
let oldRxPlayer

/**
 * @param {'audio' | 'video'} type
 * @param {string} url Manifest URL
 */
function createDashMediaElement (type, url) {
  const mediaElement = document.createElement(type)
  const rxPlayer = new RxPlayer({ videoElement: mediaElement })

  mediaElement.id = type
  mediaElement.controls = true

  rxPlayer.loadVideo({
    url,
    transport: 'dash',
  })

  return [ rxPlayer, mediaElement ]
}

/**
 * Destroy media element in media preview
 * @param {RxPlayer} rxPlayer
 */
function disposeRxPlayer (rxPlayer) {
  if (!rxPlayer) {
    return
  }

  rxPlayer.dispose()
  rxPlayer = undefined
}

/**
 * Set media element to play
 *
 * @param {HTMLDivElement} mediaPreview
 * @param {string} value
 */
function setMediaPreviewElement (mediaPreview, value) {
  disposeRxPlayer(oldRxPlayer)

  const [ type, url ] = value.split(',', 2)
  const [ rxPlayer, mediaElement ] = createDashMediaElement(type, url)

  mediaPreview.innerHTML = ''
  mediaPreview.appendChild(mediaElement)

  oldRxPlayer = rxPlayer
}

// add DASH feature to rx-player
RxPlayer.addFeatures([ DASH ])

// load media element when document is ready
document.addEventListener('DOMContentLoaded', () => {
  // get media selector
  const mediaSelector = document.querySelector('#mediaSelector')
  // get media preview
  const mediaPreview = document.querySelector('#mediaPreview')

  // display rx-player version
  const rxVersion = document.querySelector('#rxVersion')
  let rxVersionText = rxVersion.innerHTML + ' ' + RxPlayer.version

  rxVersionText = rxVersionText + (RxPlayer.version === '3.24.0' ? ' (should be broken)' : ' (should work)')
  rxVersion.innerHTML = rxVersionText

  // listen for media changes
  mediaSelector.addEventListener('change', (e) => {
    setMediaPreviewElement(mediaPreview, e.target.value)
  })

  // set initial media element
  setMediaPreviewElement(mediaPreview, mediaSelector.value)
})
