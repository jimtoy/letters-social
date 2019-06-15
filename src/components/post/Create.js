import React, {Component} from 'react';
import PropTypes from 'prop-types';


class CreatePost extends Component{
    static propTypes ={
    }
    constructor(props){
        super(props);
    }
    render() {
        return (<div className="create-post">
            <textarea placeholder="What's on your mind?"/>
            Create a post - coming (very) soon
        </div>)
    }

}

export default CreatePost;
