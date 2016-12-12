import React, { Component } from 'react'
import '../../css/video-meter.less'
import Butn from './button'

export default class VideoMeter extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const width = this.props.width ? this.props.width : 300
    return (
      <div className="video-meter">
        <video
          width={width}
          ref={(v) => { this.video = v; }}>
            <source src="car-clip.m4v" type="video/mp4"/>
        </video>
        <canvas ref={(c) => { this.setCanvas(c); }}></canvas>
        <div className="buttons">
          <Butn name="play" onClick={this.play.bind(this)} />
          <Butn name="rewind" />
          <Butn name="step" />
        </div>
      </div>
    )
  }

  setCanvas(canv) {
    this.canvas = canv
    this.ctx = this.canvas.getContext("2d")
  }

  componentDidMount() {
    if (this.canvas && this.video) {
      this.video.addEventListener('play', this.draw.bind(this), false)
      this.video.play()
      setTimeout(()=>{this.video.pause()}, 1000)
      this.drawVideo()
      this.drawMarkers()
      this.drawTime()
    }
  }

  draw() {
    // TODO: use this.video.videoHeight and this.video.videoWidth to get Aspect Ratio
    if (this.video && this.ctx) {
      if ( this.video.paused || this.video.ended) {
       return;
      }
      this.drawVideo()
      this.drawMarkers()
      this.drawTime()
      setTimeout(()=> {this.draw()},0);
    }
  }
  drawVideo() {
    this.ctx.drawImage(
      this.video,
      0,0,
      300,
      150);
  }

  drawMarkers() {
    const ctx = this.ctx
    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.arc(75,75,2,0,Math.PI*2,true);
    ctx.stroke();
  }

  drawTime() {
    const ctx = this.ctx
    const time = this.video.currentTime
    ctx.font = "12px sans-serif";
    ctx.fillText(time, 14, 14);
  }

  play() {
    if (this.video) {
      this.video.play();
      console.log("play pressed (TODO pause)");
    }
  }

}

