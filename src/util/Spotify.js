
let accessToken;

const clientID = '6a1500ade4cf4afd84c3266a5d987f8c';
const redirectURI = "http://localhost:3000";

const Spotify ={
    getAccessToken() {
        if (accessToken) {
            return accessToken
        }

        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/)
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/)

        if( accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1]
            const expiresIn = Number(expiresInMatch[1])
            window.setTimeout(() => accessToken= '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken
        } else {
            const accesURL = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
            window.location = accesURL;
        }
    },
    search(term) {
        const accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
                headers: { Authorization: `Bearer ${accessToken}` }
            })
            .then(response => response.json())
            .then(jsonResponse => {
                if (!jsonResponse.tracks) {
                    
                    return []
                }
                return jsonResponse.tracks.items.map(track => ({
                        id: track.id,
                        name: track.name,
                        artist: track.artists[0].name,
                        album: track.album.name,
                        uri: track.uri
                }))
            })
    },
    savePlaylist(playlistName, array) {
        const accessToken = Spotify.getAccessToken()
        
        if (!playlistName || !array.length) {   
            return []
        }
        const header = {Authorization: `Bearer ${accessToken}`};
        let userId;

        fetch('https://api.spotify.com/v1/me', {headers: header})
            .then(response => response.json())
            .then(jsonResponse => {
                userId = jsonResponse.id
                return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                    headers: header,
                    method: 'POST',
                    body: JSON.stringify({name: playlistName})
                })
                .then(response => response.json())
                .then(jsonResponse => {
                    const playlistId = jsonResponse.id
                    return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
                        headers: header,
                        method: 'POST',
                        body: JSON.stringify({uris: array})
                    })
                })
            });

        
    },
    sampleTrack(playlistName) {
        const accessToken = Spotify.getAccessToken();
        const header = {Authorization: `Bearer ${accessToken}`};
        let userId;

        fetch('https://api.spotify.com/v1/me', {headers: header})
            .then(response => response.json())
            .then(jsonResponse => {
                userId = jsonResponse.id
                return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                    headers: header,
                    method: 'POST',
                    body: JSON.stringify({name: playlistName})
                })
                .then(response => response.json())
                .then(jsonResponse => {
                    const playlistId = jsonResponse.id;
                    return fetch(`https://api.spotify.com/v1/audio-features/${playlistId}`, { headers: header })
                })
        })
    }
}

export default Spotify