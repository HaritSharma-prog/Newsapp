import React, { Component } from 'react'
export default class Cards extends Component {
    render() {
        return (
                <div className="card mx-3 my-3 container">
                    <div style={{display:'flex', justifyContent:'flex-end',
                    position:'absolute',
                    right:0}}>
                    <span className="badge rounded-pill bg-danger">{this.props.Source}</span>
                    </div>
                    <img src={this.props.img} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{this.props.title.slice(0,80)}....</h5>
                        <p className="card-text">{this.props.content}</p>
                        <p className="card-text"><small className="text-muted">by: {this.props.author?this.props.author:"UnKnown"} on {new Date(this.props.Date).toGMTString()}</small></p>
                        <a href={this.props.link} target="_blank_" className="btn btn-primary">Read More</a>
                    </div>
                </div>
        )
    }
}
