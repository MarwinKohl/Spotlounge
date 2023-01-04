const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const SpotifyWebApi = require('spotify-web-api-node');
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/login', (req, res) => {
    const code = req.body.code;
    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'https://localhost:3000',
        clientId: 'd191edcba8b84b3a939f442b560fe205',
        clientSecret: 'a4d93f16b5864e9d8b2b7e9117dde0df'
    })

    spotifyApi.authorizationCodeGrant(code).then(data => {
        res.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in
        })
    }).catch(err => {
        res.sendStatus(400)
    })
})

app.listen(3000)