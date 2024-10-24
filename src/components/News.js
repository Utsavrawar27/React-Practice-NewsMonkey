import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
    static defaultProps = {
        country: "us",
        pageSize: 8,
        category: "general"
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    constructor() {
        super();
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0
        }
    }

    async updateNews(pageNo) {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2b3fac5cff224acc814c05ebf6f37705&page=${this.state.page}&pageSize=${this.props.pageSize}`
        this.setState({loading: true})
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false})
    }

    async componentDidMount () {
        this.updateNews();
        }

    handlePreviousClick = async () => {
        // console.log("Previous clicked")
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2b3fac5cff224acc814c05ebf6f37705&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
        // this.setState({loading: true})
        // let data = await fetch(url);
        // let parsedData = await data.json()
        // console.log(parsedData)
        // this.setState({
        //     page: this.state.page - 1,
        //     articles: parsedData.articles,
        //     loading: false
        // })
        this.setState({page: this.state.page - 1})
        this.updateNews()
    }

    handleNextClick = async() => {
        // console.log("Next clicked")
        // if (this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)) {
            
        // } else {
        //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2b3fac5cff224acc814c05ebf6f37705&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        //     this.setState({loading: true})
        //     let data = await fetch(url);
        //     let parsedData = await data.json()
        //     console.log(parsedData)
        //     this.setState({
        //         page: this.state.page + 1,
        //         articles: parsedData.articles,
        //         loading: false
        //     })
        // }
        //  if (this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)
            this.setState({page: this.state.page + 1})
            this.updateNews()
    }

    fetchMoreData = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2b3fac5cff224acc814c05ebf6f37705&page=${this.state.page}&pageSize=${this.props.pageSize}`
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({articles: this.state.articles.concat(parsedData.articles), 
            totalResults: parsedData.totalResults})
      };

  render() {
    return (
      <>
        <h2 className="text-center my-3">NewsMonkey - Top {this.props.category} Headlines</h2>
        {/* {this.state.loading && <Spinner/>} */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.totalResults}
          loader={<Spinner/>}
        >
        <div className="container">

        <div className="row">
            {this.state.articles.map((element)=>{
                return <div key={element.url} className="col-md-4">
                    <NewsItem title={element.title} description={element.description} imageurl={element.urlToImage} newsurl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                    </div>
            })}
        </div>
        </div>
        </InfiniteScroll>
        {/* <div  className="container d-flex justify-content-between">
            <button disabled={this.state.page<=1} type="button" className="btn btn-dark"onClick={this.handlePreviousClick}>&larr; Previous</button>
            <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}
      </>
    )
  }
}

export default News
