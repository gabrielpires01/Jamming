import React from 'react'
import './Track.css'

class Track extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isRemoval: this.props.isRemoval
        }

        this.addTrack = this.addTrack.bind(this)
        this.removeTrack = this.removeTrack.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    renderAction() {

        if (this.state.isRemoval) {
            return <button className="Track-action" onClick={this.removeTrack} >-</button>
        }
        return <button className="Track-action" onClick={this.addTrack}>+</button>
    }

    addTrack() {
        this.props.onAdd(this.props.track);
    }

    removeTrack() {
        this.props.onRemove(this.props.track)
    }

    handleClick() {
        this.props.sampleTrack(this.props.track)
    }

    render() {
        return (
            <div className="Track">
                <div className="Track-information" onClick={this.handleClick}>
                    <h3>{this.props.track.name}</h3>
                    <p>{this.props.track.artist} | {this.props.track.album}</p>
                </div>
                {this.renderAction()}
            </div>
        )
    }
}

export default Track