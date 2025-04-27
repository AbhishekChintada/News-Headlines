import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class News extends Component {
  static defaultProps = {
    country: 'in',
    category: 'general',
  };
  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
  };
  constructor() {
    super();
    this.state = {
      articles: [],
      page: 1,
      totalResults: 0, // To store the total number of articles available
      pageSize: 20, // Assuming the API returns 20 articles per page
    };
  }

  // Fetches the news articles asynchronously
  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d51ffb5faf2546d68ec21755ac04d297&page=${this.state.page}&pageSize=${this.state.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
    });
  }

  handlePreviousClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d51ffb5faf2546d68ec21755ac04d297&page=${this.state.page - 1}&pageSize=${this.state.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      page: this.state.page-1,
      articles: parsedData.articles,
    });
  };

  handleNextClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d51ffb5faf2546d68ec21755ac04d297&page=${this.state.page + 1}&pageSize=${this.state.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      page: this.state.page+1,
      articles: parsedData.articles,
    });
  };

  render() {
    const { articles, page, totalResults, pageSize } = this.state;
    const totalPages = Math.ceil(totalResults / pageSize); // Calculate total number of pages
    const hasNextPage = page < totalPages; // Check if there is a next page
    const hasPreviousPage = page > 1; // Check if there is a previous page

    return (
      <div className="container my-5">
        {/* Add a style tag for the continuous animation */}
        <style>
          {`
            @keyframes moveLeftToRight {
              0% {
                transform: translateX(-100%);
              }
              100% {
                transform: translateX(100%);
              }
            }
            .animated-heading {
              display: inline-block;
              white-space: nowrap;
              animation: moveLeftToRight 10s linear infinite;
            }
          `}
        </style>
        {/* Apply the animated-heading class */}
        <h2 className="text-center mb-4 text-primary animated-heading">
          NewsMonkey - Top Headlines
        </h2>
        <div className="row">
          {articles.map((element) => {
            return (
              <div className="col-md-4 mb-4" key={element.url}>
                <div className="card shadow-sm border-light rounded">
                  <img
                    src={element.urlToImage || 'https://via.placeholder.com/300x200'}
                    className="card-img-top"
                    alt={element.title}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{element.title ? element.title.slice(0, 45) : 'No Title Available'}</h5>
                    <p className="card-text">
                      {element.description ? element.description.slice(0, 88) : 'No description available.'}
                    </p>
                    <p class="card-text"><small class="text-body-secondary">By {element.author?element.author:"Unknown"} Date:{element.publishedAt}</small></p>
                    <a href={element.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
                      Read More
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="container d-flex justify-content-between">
          {/* Disabled is used when the page is less than 1 then don't allow to go previous */}
          <button
            disabled={!hasPreviousPage}
            type="button"
            className="btn btn-outline-warning"
            onClick={this.handlePreviousClick}
          >
            &larr; Previous
          </button>
          <button
            disabled={!hasNextPage} // Fixed condition for "Next" button
            type="button"
            className="btn btn-outline-success"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

News.defaultProps = {
  country: 'in',
  category: 'general',
};

News.propTypes = {
  country: PropTypes.string,
  category: PropTypes.string,
};

export default News;
