import React, { Component } from "react";
import Cards from "./Cards";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


export default class News extends Component {
  
  static defaulProps={
    country:'in',
    pageSize:8
  }
  static propTypes={
    country:PropTypes.string,
    pageSize:PropTypes.number
  }
  firstCapital=(string="entertainment")=>{
    let str="";
    str+=string.charAt(0).toUpperCase();
    str+=string.slice(1,string.length);
    return str;
  }
  constructor(props) {
    super(props);
    this.state = {
      content: [],
      page: 0,
      loading: true,
      totalcontent:0,
      ttlResults:0
    };
    // console.log(this.firstCapital("raju"));
    document.title=this.firstCapital(this.props.category)+"-NewsMonkey";
  }
  update=async()=>{
    this.props.setProgress(10);
    let Url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&country=${this.props.country}&apiKey=${this.props.apikey}
    &page=${this.state.page+1}&pageSize=${this.props.pages}`;
    this.setState({loading:true})
    let data = await fetch(Url);
    this.props.setProgress(40);
    let parsedata = await data.json();
    this.setState({ content: this.state.content.concat(parsedata.articles), page: this.state.page + 1, loading:false,totalcontent:this.state.totalcontent+parsedata.articles.length,ttlResults:parsedata.totalResults });
    this.props.setProgress(100);
  }
  async componentDidMount() {
    // this.props.setProgress(0);
    this.update();
    console.log("ComponentDidMount")
  }
  fetchMoreData = async() => {
    let Url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&country=${this.props.country}&apiKey=${this.props.apikey}
    &page=${this.state.page+1}&pageSize=${this.props.pages}`;
    this.setState({loading:true})
    let data = await fetch(Url);
    let parsedata = await data.json();
    this.setState({ content: this.state.content.concat(parsedata.articles), page: this.state.page + 1, loading:false,totalcontent:this.state.totalcontent+parsedata.articles.length,ttlResults:parsedata.totalResults });
  };

  render() {
    return (
      <>
        <h1 className="text-center">{`${this.firstCapital(this.props.category)}- Top Headlines`}</h1>
        {this.state.loading && <Spinner/>}
        <InfiniteScroll
          dataLength={this.state.content.length}
          next={this.fetchMoreData}
          loader={<Spinner/>}
          hasMore={this.state.totalcontent!==this.state.ttlResults}>
          <div className="containers">
          <div className="row" sytle={{margin:"40px 0px"}}>
          {this.state.content.map((Element) => {
            return <div className="col-md-4" key={Element.url}>
                <Cards
                  content={Element.description}
                  img={Element.urlToImage}
                  title={Element.title} link={Element.url} author={Element.author} Date={Element.publishedAt.slice(0,10)} Source={Element.source.name}
                  />
              </div>
            ;
          })}
          </div>
        </div>
        </InfiniteScroll>
        <div className="d-flex justify-content-between">
          {console.log("This is simply a render function")}
          {/* <button
            type="button"
            disabled={this.state.totalarticles>60?true:false}
            className="btn btn-primary"
            onClick={this.Previousclick}
          >
            &larr; Prev page
          </button>
          <button disabled={this.state.totalarticles<this.props.pages?true:false}
            type="button"
            className="btn btn-primary"
            onClick={this.Nextclick}
          >
            Next page &rarr;
          </button> */}
        </div>
        </>
    );
  }
}
