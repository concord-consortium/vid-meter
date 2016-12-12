import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import VideoMeter from './components/video-meter'

const message = "hi";

render(
  <VideoMeter width={400}></VideoMeter>,
  document.getElementById('app')
)
