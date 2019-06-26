import React, {Component} from 'react';
import PropTypes from 'prop-types';
import DisplayMap from "../map/DisplayMap";
import Filter from "bad-words";
import LocationTypeAhead from "../map/LocationTypeAhead";
import classnames from "classnames";


class CreatePost extends Component{
    static propTypes ={
    };
    constructor(props){
        super(props);
        this.initialState ={
            content: '',
            valid: false,
            showLocationPicker: false,
            location: {
                lat: 39.683723,
                lng: -75.749657,
                name: "Newark"
            },
            locationSelected: false
        };
        this.state = this.initialState;
        this.filter = new Filter();
        this.handlePostChange = this.handlePostChange.bind(this);
        this.handleRemoveLocation = this.handleRemoveLocation.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleToggleLocation = this.handleToggleLocation.bind(this);
        this.onLocationSelect = this.onLocationSelect.bind(this);
        this.onLocationUpdate = this.onLocationUpdate.bind(this);

    }

    handleRemoveLocation(){
        this.setState(() => ({
          locationSelected: false,
          location: this.initialState.location
        }));
    }

    renderLocationControls(){
        return (
            <div className="controls">
                <button onClick={this.handleSubmit}>Post</button>
                {
                    this.state.location && this.state.locationSelected ?
                        (
                            <button onClick={this.handleRemoveLocation} className="open location-indicator">
                                <i className="fa-location-arrow fa"/>
                                <small>{this.state.location.name}</small>
                            </button>
                        )
                        :
                        (
                            <button onClick={this.handleToggleLocation} className="open">
                                {this.state.showLocationPicker ? 'Cancel' : 'Add Location'}
                                {' '}
                                <i className={classnames(`fa`,{
                                    'fa-map-o': !this.state.showLocationPicker,
                                    'fa-times': this.state.showLocationPicker
                                })}/>
                            </button>
                        )
                }

            </div>
        );
    }

    render() {
        return (<div className="create-post">
            <textarea
                value={this.state.content}
                onChange={this.handlePostChange}
                placeholder="What's on your mind?"/>
            {this.renderLocationControls()}
            <div className="location-picker" style={{display: this.state.showLocationPicker ? 'block' : 'none'}}>
                {
                    !this.state.locationSelected && [
                        <LocationTypeAhead key='LocationTypeAhead' onLocationUpdate={this.onLocationUpdate} onLocationSelect={this.onLocationSelect} />,
                        <DisplayMap key='DisplayMap' displayOnly={false} location={this.state.location} onLocationSelect={this.onLocationSelect} onLocationUpdate={this.onLocationUpdate}/>
                    ]
                }
            </div>
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
        e.preventDefault();
        if(!this.state.valid){
            console.log("Invalid Length");
            return;
        }

        if(this.props.onSubmit){
            console.log("submitting");
            const newPost={
                date: Date.now(),
                id: Date.now(),
                content: this.state.content
            };
            if(this.state.locationSelected) {
                newPost.location = this.state.location;
            }

            this.props.onSubmit(newPost);
            this.setState({
                content: '',
                valid: false,
                showLocationPicker: false,
                location: this.initialState.location,
                locationSelected: false
            })
        }

        console.log(this.state);
    }

    onLocationUpdate(location){
        this.setState(() => ({location}));
    }

    onLocationSelect(location){
        this.setState(() => ({
            location,
            showLocationPicker: false,
            locationSelected: true
        }));
    }

    handleToggleLocation(e){
        e.preventDefault();
        this.setState(state => ({
            showLocationPicker: !state.showLocationPicker
        }));
    }



}

export default CreatePost;
