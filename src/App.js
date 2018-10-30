import React, { Component } from 'react';
import Profile from './Components/Profile';
import Gallery from './Components/Gallery'; 
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      query: "",
      artist: null,
      tracks: []
    }
  }

  search = () => {
    console.log(this.state.query);
    const BASE_URL  = "https://api.spotify.com/v1/search?";
    let   FETCH_URL = BASE_URL + "q=" + this.state.query + "&type=artist&limit=1";
    const TOP_TRACK = '	https://api.spotify.com/v1/artists/';
    const accessToken = "BQB4pzfTp7WjwRprlxl7Q3fAxzP-lOwjJ60FUJ7-F2OnuK2f349T-JOLdCktSVMlHd875G5LdEP47DXu_1QCTLJL_mwX3zqoCccZvrWnc4-vCckbGpNFmyQ_WEHzJi8V828XOM_3kN9BoOFRTUPYCNBpB-5-5v6s2HeqEChVUq8HDx0M8WEUEM0nG8j8r7V5mNsETUA_Y9r7LmaorfeF4rwC4XNKgPK3xe558LNBnqHGHQZn9Fh_CAlzafUHihQyaqpiBYQSfxBczLCnFYhrZWBKJVbqYvoca48D-NE";
    


    var myOptions = {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + accessToken
      },
      mode: 'cors',
      cache: 'default'
    };
    fetch(FETCH_URL, myOptions)
      .then(response => response.json())
      .then(json => {
        const artist = json.artists.items[0];
        console.log('artist', artist);
        this.setState({artist});

        FETCH_URL = TOP_TRACK + artist.id + "/top-tracks?country=US&";
        fetch(FETCH_URL, {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + accessToken
          },
          mode: 'cors',
          cache: 'default'          
        })
        .then(response => response.json())
        .then(json => {
          console.log('Artist Top Track', json);
          const tracks = json.tracks;
          this.setState({tracks});
        })
      })

  } 

  render() {
    return (
      <div className="App">
        <div className="App-title">Music Master</div>
        <div className="form-search">
          <input placeholder="Search an artist"
           value={this.state.query}
           onChange={e => this.setState({query: e.target.value})} 
           onKeyPress={e => {if (e.key === "Enter") {
              this.search();
           }}}
           />
          <button className="btn btn-primary">Search</button>
        </div>
        {
          this.state.artist !== null ?
            <div>
              <Profile artist={this.state.artist} />
              <div className="gallery" >
                <div className="container" >
                  <div className="row">
                    <Gallery tracks={this.state.tracks} />
                  </div>
                </div>
              </div>
            </div>
          :
          <div></div>
        }
        <footer>
          <p>made by <a href="https://fb.com/apiyaue06"> Said Mounaim</a> ♡</p>
        </footer>       
      </div>
    );
  }
}

export default App;
