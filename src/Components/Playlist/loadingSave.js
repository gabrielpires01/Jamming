import React from 'react'
import './Playlist.css'

class LoadingSave extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: false
        }

        this.handleClick = this.handleClick.bind(this)
    }


    /*componentDidMount() {
        setTimeout(() => {
            fetch('http://localhost:3000')
                .then( response => response.json())
                    .then(jsonResponse => this.setState({
                        loading: false
                    }))
        }, 2000)
    }*/
                              
    handleClick() {
        this.setState({
            loading: true
        })
        setTimeout(() => {
            this.props.onSave()
            this.setState({
                loading: false
            })
        },2000)
        
    }

    render() {
        if (this.state.loading) { 
        return (<button className="Playlist-save">
                    <div className="bouncing-loader">
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </button>
        )} else {
            return <button className="Playlist-save" onClick={this.handleClick}>SAVE TO SPOTIFY</button>}
    }
}

export default LoadingSave