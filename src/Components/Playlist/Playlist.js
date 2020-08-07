import React from 'react'
import './Playlist.css'

import TrackList from '../TrackList/TrackList'
import LoadingSave from './loadingSave'

class Playlist extends React.Component {
    constructor(props) {
        super(props)

        this.handleNameChange =this.handleNameChange.bind(this)
    }

    handleNameChange(e) {
        this.props.onNameChange(e.target.value)
    }

    render() {
        return (
            <div className="Playlist">
                <input onChange={this.handleNameChange} 
                placeholder='Playlist Name'/>
                <TrackList tracks={this.props.playlistTracks} 
                onRemove={this.props.onRemove} 
                isRemoval={true} />
                <LoadingSave onSave={this.props.onSave}/>
            </div>
        )                                                         
    }
}

export default Playlist