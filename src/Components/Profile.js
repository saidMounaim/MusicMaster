import React, { Component } from 'react';

class Profile extends Component {
  render() {
    console.log('this.props', this.props);

    let artist = { name: '', followers: {total: ''}, images: [{url: ''}], genres: [] };

    if (this.props.artist !== null) {
      artist = this.props.artist;
    }

    return (
      <React.Fragment>
          <div className="container">
            <div className="row">
              <div className="col-md-6 img">
                <img src={artist.images[0].url} alt="" className="img-rounded" />
              </div>
              <div className="col-md-6 details">
                <h5>Name : {artist.name}</h5>
                <small>
                  {artist.genres.map((genre, id) => {
                    genre = genre !== artist.genres[artist.genres.length - 1] ? genre + ", " : "& " + genre;
                    return (
                      <span key={id} >{genre}</span>
                    )
                  })}
                </small>
                <p>
                {artist.followers.total} Followers
                </p>
              </div>
            </div>
          </div>  
      </React.Fragment>
    )
  }
}

export default Profile;