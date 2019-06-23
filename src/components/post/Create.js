import React, {Component} from 'react';
import PropTypes from 'prop-types';


class CreatePost extends Component{
    static propTypes ={
    };
    constructor(props){
        super(props);
        this.state ={
            content: '',
            valid: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePostChange = this.handlePostChange.bind(this);

    }
    render() {
        return (<div className="create-post">
            <button onClick={this.handleSubmit}>Post</button>
            <textarea
                value={this.state.content}
                onChange={this.handlePostChange}
                placeholder="What's on your mind?"/>
        </div>)
    }

    handlePostChange(e){
        const content = e.target.value;
        this.setState(() =>{
            return {
                content,
                valid: content.length <= 280
            };
        });
    }

    handleSubmit(e){
        if(!this.state.valid){
            console.log("Invalid Length");
            return;
        }
        const newPost={
            content: this.state.content
        };

        console.log(this.state);
    }



}

export default CreatePost;
