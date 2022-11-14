import { debounce } from "./commom"

    window.onload = function(){
    const canvas = document.querySelector("#canvas")
    const ctx = canvas.getContext("2d")
    let round = []
    const pointNumber = 300
    const configure = (options) =>{
      const { width, height } = options || { width: window.innerWidth, height: window.innerHeight}
      canvas.width = width
      canvas.height = height
      return{
        width,
        height
      }
    }
    const {width, height} = configure()
    const cancalDebounce = debounce(configure,300)
    window.addEventListener("resize",cancalDebounce)
    function Round_point(index, X, Y){
      this.index = index
      this.X = X
      this.Y = Y
      this.r = Math.random()*6 + 1;
      const alpha = (Math.floor(Math.random()*20) + 1) / 10 / 2
      const red =  (Math.floor(Math.random()*255) + 1)
      const green =  (Math.floor(Math.random()*255) + 1)
      const blue =  (Math.floor(Math.random()*255) + 1)
      this.color = "rgba("+red+","+green+","+blue+","+alpha+")"
    }
    Round_point.prototype.draw = function(){
      // 画圆饼
      ctx.beginPath()
      ctx.fillStyle = this.color
      ctx.shadowBlur = this.r * 2
      ctx.arc(this.X, this.Y, this.r, 0, 2*Math.PI, false)
      ctx.fill()
      ctx.closePath()
      // 画圆环
      // ctx.beginPath()
      // ctx.arc(this.X, this.Y, this.r+5, 0, 2*Math.PI, false)
      // ctx.lineWidth = 2
      // ctx.strokeStyle = this.color
      // ctx.stroke()
      // ctx.closePath()

      // ctx.beginPath()
      // ctx.arc(this.X, this.Y, this.r+10, 0, 2*Math.PI, false)
      // ctx.lineWidth = 2
      // ctx.strokeStyle = this.color
      // ctx.stroke()
      // ctx.closePath()

      // ctx.beginPath()
      // ctx.arc(this.X, this.Y, this.r+15, 0, 2*Math.PI, false)
      // ctx.lineWidth = 2
      // ctx.strokeStyle = this.color
      // ctx.stroke()
      // ctx.closePath()

    }
    Round_point.prototype.move = function(){
      this.X += 0.1
      this.Y += 0.5
      if(this.X > (width + 100)){
        this.X = -100
      }
      if(this.Y > (height + 100)){
        this.Y = -100
      }
      round[this.index].draw()
    }
    function animations(){
      ctx.clearRect(0, 0, width, height)
      for(let index = 0; index < pointNumber; index++){
        round[index].move()
      }
      requestAnimationFrame(animations)
    }
    function init(){
      for(let index = 0;index < pointNumber;index++){
        round[index] = new Round_point(index, Math.random()*width, Math.random()*height)
        round[index].draw()
      }
      animations()
    }
    init()
  }