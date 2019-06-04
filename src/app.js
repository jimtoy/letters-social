import React, { Component } from 'react';
import PropTypes from 'prop-types';
import parseLinkHeader from 'parse-link-header';
import orderBy from 'lodash/orderBy';

import ErrorMessage from './components/error/Error';
import Navbar from './components/nav/navbar';
import Loader from './components/Loader';

import * as API from './shared/http';
import Ad from './components/ad/Ad';
import Post from './components/post/Post';
import Welcome from './components/welcome/Welcome';

/**
 * The app component serves as a root for the project and renders either children,
 * the error state, or a loading state
 * @method App
 * @module letters/components
 */
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            loading: false,
            posts: [],
            endpoint: `${process.env
                .ENDPOINT}/posts?_page=1&_sort=date&_order=DESC&_embed=comments&_expand=user&_embed=likes`,
        };
    }
    static propTypes = {
        children: PropTypes.node
    };
    render() {
        return (
            <div className="app">
                <Navbar />
                {this.state.loading ? (
                    <div className="loading">
                        <Loader />
                    </div>
                ) : (
                    <div className="home">
                        <Welcome />
                        <div>
                            <button className="block">
                                Load more posts
                            </button>
                        </div>
                        <div>
                            <Ad
                                url="https://ifelse.io/book"
                                imageUrl="/static/assets/ads/ria.png"
                            />
                            <Ad
                                url="https://ifelse.io/book"
                                imageUrl="/static/assets/ads/orly.jpg"
                            />
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default App;
