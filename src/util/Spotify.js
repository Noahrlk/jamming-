const spotifyAuthorizeURIBase = 'https://accounts.spotify.com/authorize'
const spotifyAPIURIBase = 'https://api.spotify.com/v1/'

const clientId = '278ebc3a13644cac871cd095b39c8b81'
const redirectURI ='http://localhost:3000/'

let accessToken;

const Spotify = {

    getAccessToken() {
      if(accessToken) {
        return accessToken
      }

      const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
      const expiresInMatch = window.location.href.match(/expires_in([^&]*)/);

      if(accessTokenMatch && expiresInMatch) {
         this.accessToken = accessTokenMatch[1];
         const expiresIn = Number(expiresInMatch[1]);
         window.setTimeout(() => this.accessToken = '', expiresIn * 1000);
         window.history.pushState('Access Token', null, '/');
         return accessToken;
      } else {
        const spotifyAuthorizeURI = `${spotifyAuthorizeURIBase}?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`
        window.location = spotifyAuthorizeURI;
      }
   }, //getAccessToken

   search(term) {
     const accessToken = Spotify.getAccessToken();
     return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
     headers: {
       Authorization: `Bearer ${accessToken}`
       }
     }).then(response => {
         if (response.ok) {
           return response.json();
         } else {
             console.log('Reaqust failed')
         }
     }).then(jsonresponse => {
         if(!jsonresponse.Track) {
           return [];
         }
     return jsonresponse.tracks.items.map(track => ({
       id: track.id,
       name: track.name,
       artist: track.artists[0].name,
       album: track.album.name,
       uri: track.uri
      }));
    });
  },//search

  savePlaylist(playlistName, trackURIs) {
    if(!playlistName || !trackURIs.length) {
      return;
    }
    const accessToken = Spotify.getAccessToken();
    const headers = {Authorization: `Bearer ${accessToken}`};

    let userId;

    return fetch('https://api.spotify.com/v1/me', {
      headers: headers
    }).then (response => {
         if (response.ok) {
           return response.json();
         }
    }).then (jsonResponse => {
        userId = jsonResponse.id;
          return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
            headers: headers,
            method: 'POST',
            body: JSON.stringify({name: playlistName})
    }).then(response => {
         if(response.ok) {
           return response.json();
         } else {
           console.log('Request failed')
         }
    }).then(jsonResponse => {
        const playlistId = jsonResponse.id;
          return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
            headers: headers,
            method:'POST',
            body: JSON.stringify({uris: trackURIs})
        });
      });
    });
  }//savePlaylist
}//Spotify

export default Spotify;
