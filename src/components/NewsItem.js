import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title, description, imageurl, newsurl, author, date, source} = this.props;
    return (
      <div className="my-3">
        <div className="card">
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          position: 'absolute',
          right: '0'
          }}>
          <span className="badge rounded-pill bg-danger"> {source} </span>
        </div>
        <img src= {imageurl} className="card-img-top" alt="..."/>
        <div className="card-body">
            <h5 className="card-title">{title}<span class="badge bg-secondary">New</span></h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small class="text-body-secondary">By {!author? "Unknown": author} on {new Date(date).toGMTString()}</small></p>
            <a rel = "noreferrer" href={newsurl} target="blank" className="btn btn-primary">Read More</a>
        </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
