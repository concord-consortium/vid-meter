import React, { Component } from 'react'
import '../../css/video-meter.less'
import Butn from './button'

export default class VideoMeter extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.dataPoints = [
      // {x: 70, y:130, t:0},
      // {x: 85, y:130, t:2}
    ];
    this.defaultWidth = 600
    this.defaultHeight = 300
    //(this.video.videoHeight/this.video.videoWidth) * this.defaultWidth;
  }

  render() {
    const width = this.defaultWidth;
    const height = this.defaultHeight;
    return (
      <div className="video-meter">
        <video
          width={width}
          height={height}
          ref={(v) => { this.video = v; }}>
            <source src="car-clip.m4v" type="video/mp4"/>
        </video>
        <canvas
          width={width}
          height={height}
          ref={(c) => { this.setCanvas(c)}}
          onMouseDown={this.mouseDown.bind(this)}
          onMouseUp={this.mouseUp.bind(this)}
          onMouseMove={this.mouseMove.bind(this)}
          >
        </canvas>

        <div className="controlls">
            <input
              type="range"
              min="0"
              max="100"
              defaultValue="0"
              name="position"
              onChange={this.setTime.bind(this)}/>
          <div className="buttons">
            <Butn name="play" onClick={this.play.bind(this)} />
            <Butn name="pause" onClick={this.pause.bind(this)}/>
            <Butn name="add" onClick={this.addDataPoint.bind(this)}/>
          </div>
        </div>
      </div>
    )
  }

  setTime(e) {
    const sliderPercent = e.target.value
    const timeFraction = sliderPercent / 100
    const timeIndex = this.video.duration * timeFraction
    console.log(timeIndex)
    this.video.currentTime = timeIndex
  }

  setCanvas(canv) {
    this.canvas = canv
    this.ctx = this.canvas.getContext("2d")
  }

  seeked(e) {
    this.draw(true);
  }

  componentDidMount() {
    if (this.canvas && this.video) {

      this.video.addEventListener('play', this.draw.bind(this), false)
      this.video.addEventListener('seeked', this.seeked.bind(this, false));
      this.video.currentTime = 1;
      this.video.currentTime = 0;
    }
  }


  draw(forced=false) {
    // TODO: use this.video.videoHeight and this.video.videoWidth to get Aspect Ratio
    if (this.video && this.ctx) {
      if ( !forced && (this.video.paused || this.video.ended)) {
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
      this.defaultWidth,
      this.defaultHeight)
  }

  drawMarker(datum) {
    const ctx = this.ctx
    const markerRadius = 5
    ctx.beginPath()
    ctx.moveTo(datum.x, datum.y)
    ctx.arc(datum.x, datum.y, markerRadius, 0, Math.PI*2, true)
    ctx.stroke()
  }

  drawLines() {
    const ctx = this.ctx
    const points = this.state.dataPoints
    let index = 0
    if (points.length < 1) { return; }
    ctx.beginPath()
    while(index < points.length) {
      if(index == 0){
        ctx.moveTo(points[index].x, points[index].y)
      }
      else {
        ctx.lineTo(points[index].x, points[index].y)
      }
      index++;
    }
    ctx.stroke()
  }

  drawMarkers() {
    const ctx = this.ctx
    ctx.strokeStyle = "white"
    ctx.lineWidth = 2
    this.state.dataPoints.forEach(this.drawMarker.bind(this))
    this.drawLines()
  }

  drawTime() {
    const ctx = this.ctx
    const time = this.video.currentTime
    ctx.font = "14px sans-serif";
    ctx.fillStyle = "white"
    ctx.fillText(time, 14, 14);
  }

  play() {
    this.video.play();
  }

  pause() {
    this.video.pause();
  }

  mouseCoordintes(e) {
    const x = e.clientX - e.target.offsetLeft
    const y = e.clientY - e.target.offsetTop
    return ({x: x, y:y})
  }

  lastDataPoint() {
    return this.state.dataPoints[this.state.dataPoints.length-1]
  }

  mouseDown(e) {
    const coordinates = this.mouseCoordintes(e)
    const dataPoint = this.lastDataPoint();
    dataPoint.x = coordinates.x
    dataPoint.y = coordinates.y
    this.repaint()
  }

  repaint() {
    this.video.currentTime = this.video.currentTime
  }

  addDataPoint() {
    const newDataPoint = {x:100, y:100, t:this.video.currentTime}
    this.state.dataPoints.push(newDataPoint);
    this.repaint()
  }
  mouseMove(e) {
    console.log(e);
  }

  mouseUp(e) {
    console.log(e);
  }

}

