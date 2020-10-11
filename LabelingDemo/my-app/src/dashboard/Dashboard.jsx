import React, { Component } from "react";
import Image from "../image/Image";
import "./dashboard.css";
import DashboardService from "../dashboard_service.js";
import { Form, FormControl, Button } from "react-bootstrap";

const PAGE_SIZE = 16;

/**
  Dashboard Component for rendering image gallery, filtering entries by label
  tag, and controlling pagination.
*/
class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.service = new DashboardService();
    this.state = {
      searchVal: "",
      imageFocusSource: null,
      imageFocusLabel: null,
      isDetailsView: false,
      pageIndex: 0,
    };
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleImageClick(image, label) {
    return () => {
      this.setState({
        searchVal: this.state.searchVal,
        imageFocusSource: image,
        imageFocusLabel: label,
        isDetailsView: true,
      });
    };
  }

  handleSearch(event) {
    this.setState({ pageIndex: 0, searchVal: event.target.value });
    this.service.refreshFiltered(this.state.searchVal);
  }

  updatePageIndex(delta) {
    const newPage = this.state.pageIndex + delta;
    if (newPage < 0 || newPage * PAGE_SIZE >= this.service.getFilteredCount()) {
      return;
    }
    return () => this.setState({ pageIndex: newPage });
  }

  renderControls() {
    if (this.state.isDetailsView) {
      return (
        <Button onClick={() => this.setState({ isDetailsView: false })}>
          Return to Dashboard
        </Button>
      );
    }
    return (
      <FormControl
        type="text"
        placeholder="Search"
        onChange={this.handleSearch}
      />
    );
  }

  renderFilteredCount() {
    if (this.state.isDetailsView) {
      return null;
    }

    this.service.refreshFiltered(this.state.searchVal);
    return (
      <p> {`${this.service.getFilteredCount()} Matching Images found.`} </p>
    );
  }

  renderFullImage(source) {
    if (!this.state.isDetailsView) {
      return null;
    }
    const { image, label, box } = this.service.getDataBySource(
      this.state.imageFocusSource
    );
    return (
      <Image src={image} label={label} box={box} scale={0.5} shouldShowCanvas />
    );
  }

  renderGallery() {
    if (this.state.isDetailsView) {
      return null;
    }
    const gallery = [...Array(PAGE_SIZE).keys()].map((i) => {
      try {
        const idx = i + this.state.pageIndex * PAGE_SIZE;
        const { image, label, box } = this.service.getDataByIndex(
          idx,
          this.state.searchVal
        );
        return (
          <Image
            src={image}
            label={label}
            box={box}
            scale={0.1}
            onClick={this.handleImageClick(image, label)}
            shouldShowLabel={!this.state.isDetailsView}
          />
        );
      } catch (e) {
        console.log(e.name + ": " + e.message);
        return null;
      }
    });
    return gallery.filter(Boolean).length ? (
      gallery
    ) : (
      <p> No Matching Images Found </p>
    );
  }

  render() {
    return (
      <div className="dashboard">
        <Form inline>{this.renderControls()}</Form>
        <div>{this.renderFilteredCount()}</div>
        <div className="dashboard__gallery">{this.renderGallery()}</div>
        <div>{this.renderFullImage(this.state.imageFocusSource)}</div>
        <p> Enter a label tag to filter. Click an image for expanded view. </p>
        <Button
          disabled={this.state.pageIndex === 0}
          onClick={this.updatePageIndex(-1)}
        >
          Previous
        </Button>
        <Button
          disabled={
            (1 + this.state.pageIndex) * PAGE_SIZE >=
            this.service.getFilteredCount()
          }
          onClick={this.updatePageIndex(1)}
        >
          Next
        </Button>
        <p>
          Images {this.state.pageIndex * PAGE_SIZE + 1} to{" "}
          {Math.min(
            (this.state.pageIndex + 1) * PAGE_SIZE,
            this.service.getFilteredCount()
          )}
        </p>
      </div>
    );
  }
}

export default Dashboard;
