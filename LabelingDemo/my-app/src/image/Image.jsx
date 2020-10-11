import PropTypes from 'prop-types';
import React, { Component } from "react";
import "./image.css";
const MAX_WIDTH = 1920;
const MAX_HEIGHT = 1080;

/**
  Image Component for a single image, its label, and the bounding box overlay.
*/
class Image extends Component {

  static propTypes = {
    box: PropTypes.array,
    onClick: PropTypes.func,
    scale: PropTypes.number,
    shouldShowLabel: PropTypes.bool,
    src: PropTypes.string,
  };

  componentDidMount() {
    this.drawBoundingBox();
  }

  componentDidUpdate() {
    this.drawBoundingBox();
  }

  drawBoundingBox() {
    if (!this.props.box) {
      return;
    }

    // Box Dimensions
    const upperLeftX = this.props.box[1] * this.props.scale;
    const upperLeftY = this.props.box[0] * this.props.scale;
    const width = this.props.box[2] * this.props.scale;
    const height = this.props.box[3] * this.props.scale;

    let canvas = document.getElementById(`canvas_${this.props.src}`);
    let context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    context.rect(upperLeftX, upperLeftY, width, height);
    context.lineWidth = this.props.scale * 10;
    context.strokeStyle = "red";
    context.stroke();
  }

  renderImage() {
    const src = `${process.env.PUBLIC_URL}/train_images/${this.props.src}`;
    const width = MAX_WIDTH * this.props.scale;
    const height = MAX_HEIGHT * this.props.scale;
    return <img src={src} width={width} height={height} alt="filtered result"/>;
  }

  renderLabel() {
    if (!this.props.shouldShowLabel) {
      return null;
    }
    return <p> {this.props.label} </p>;
  }


  render() {
    return (
      <div className="image">
        <div className="image__wrapper">
          <div className="image__wrapper--image">{this.renderImage()}</div>
          <div className="image__wrapper--canvas">
            <canvas
              width={MAX_WIDTH * this.props.scale}
              height={MAX_HEIGHT * this.props.scale}
              id={`canvas_${this.props.src}`}
              onClick={this.props.onClick}
            ></canvas>
          </div>
        </div>
        <div className="image__content">{this.renderLabel()}</div>
      </div>
    );
  }
}

export default Image;
