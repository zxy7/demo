import React from "react";
import "./style.css";
export default class Pic extends React.Component {
  state = {
    imgList: [],
    paint: false,
    isCircle: false,
    canvasHistory: [],
    step: -1,
    lastX: null,
    lastY: null
  };

  cPush = () => {
    this.setState({
      step: this.state.step + 1
    });
    // if (this.state.step < this.state.canvasHistory.length) {
    //   this.state.canvasHistory.length = this.state.step;
    // }
    this.state.canvasHistory.push(
      document.getElementById("canvas").toDataURL()
    );
    this.setState({
      canvasHistory: this.state.canvasHistory
    });
  };
  drawPic = (x, y, isDown) => {
    let ctx = document.getElementById("canvas").getContext("2d");
    console.log(x + "===" + y);
    if (isDown) {
      ctx.beginPath();
      ctx.strokeStyle = "red";
      ctx.lineWidth = "2";
      ctx.lineJoin = "round";
      ctx.moveTo(this.state.lastX, this.state.lastY);
      ctx.lineTo(x, y);
      ctx.closePath();
      ctx.stroke();
    }
    this.setState({
      lastX: x,
      lastY: y
    });
  };
  readFile = e => {
    // console.log(e.target.files);
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = e => {
      var img = new Image(),
        canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d");
      img.src = e.target.result;
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
        this.cPush();
      };
    };
  };
  mousedown = e => {
    if (!this.state.isCircle) return;
    this.setState({
      paint: true
    });
    const canvas = document.getElementById("canvas");
    this.drawPic(
      e.pageX - canvas.offsetLeft,
      e.pageY - canvas.offsetTop,
      false
    );
  };
  mousemove = e => {
    if (!this.state.isCircle) return;
    if (this.state.paint) {
      const canvas = document.getElementById("canvas");
      this.drawPic(
        e.pageX - canvas.offsetLeft,
        e.pageY - canvas.offsetTop,
        true
      );
    }
  };
  mouseup = () => {
    if (!this.state.isCircle) return;
    if (this.state.paint) {
      this.setState({
        paint: false
      });
      this.cPush();
    }
  };
  mouseleave = () => {
    if (!this.state.isCircle) return;
    if (this.state.paint) {
      this.setState({
        paint: false
      });
      this.cPush();
    }
  };
  undo = () => {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    if (this.state.step > 0) {
      let canvasPic = new Image();
      const canvasHistory = this.state.canvasHistory;
      canvasHistory.pop();
      canvasPic.src = canvasHistory[canvasHistory.length - 1];
      canvasPic.onload = () => {
        context.clearRect(0, 0, canvasWidth, canvasHeight);
        context.drawImage(canvasPic, 0, 0);
      };
      this.setState({
        step: this.state.step - 1,
        canvasHistory
      });
    } else {
      console.log("不能再继续撤销了");
    }
  };
  exportCanvas = () => {
    this.state.imgList.push({
      src: this.state.canvasHistory[this.state.canvasHistory.length - 1]
    });
    this.setState({
      imgList: this.state.imgList
    });
  };
  render() {
    return (
      <div>
        <input
          type="file"
          onChange={this.readFile}
          accept="image/png, image/jpeg"
        />
        <div>
          <canvas
            id="canvas"
            onMouseDown={this.mousedown}
            onMouseMove={this.mousemove}
            onMouseUp={this.mouseup}
            onMouseLeave={this.mouseleave}
          />
        </div>
        <div>
          <button
            className={this.state.isCircle ? "active" : ""}
            onClick={() => {
              this.setState({ isCircle: !this.state.isCircle });
            }}
          >
            笔
          </button>
          <button onClick={this.undo}>撤销</button>
          <button onClick={this.exportCanvas}>导出</button>
        </div>
        <div className="imgListContainer">
          {this.state.imgList.map((item, index) => {
            return <img src={item.src} key={index} alt="" />;
          })}
        </div>
      </div>
    );
  }
}
