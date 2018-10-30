import React, { Component } from 'react'

class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playing: false,
            audioUrl: "",
            audio: null
        }

    }
    playAudio = (previewUrl) => {
        let audio = new Audio(previewUrl);
        if (!this.state.playing) {
            audio.play();
            this.setState({
                playing: true,
                audioUrl: previewUrl,
                audio
            })
        } else {
            if (this.state.audioUrl === previewUrl) {
                this.state.audio.pause();
                this.setState({
                    playing: false
                })
            } else {
                this.state.audio.pause();
                audio.play();
                this.setState({
                    playing: true,
                    audioUrl: previewUrl,
                    audio
                })
            }
        }
    }

  render() {
    const tracks = this.props.tracks;
    return (
      <React.Fragment>
          <div>
              {
                  tracks.map((tracks, index) => {
                      return (
                        <div key={index} className="col-md-4">
                            <p>{tracks.album.name}</p>
                            <img onClick={() => this.playAudio(tracks.preview_url)} src={tracks.album.images[0].url} alt=""/>
                        </div>
                      )
                  })
              }
          </div>
      </React.Fragment>
    )
  }
}

export default Gallery;