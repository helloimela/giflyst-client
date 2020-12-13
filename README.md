# Giflyst

Spice up your day with fun GIF based on your Spotify playlist mood!

### Demo

[https://giflyst.herokuapp.com/](https://giflyst.herokuapp.com/)

![image](https://user-images.githubusercontent.com/1199101/101691612-3af75280-3a6f-11eb-82e4-604177922e1c.png)

### How to run application

1. Make sure you clone and follow installation guides for the backend. [https://github.com/helloimela/giflyst-backend](https://github.com/helloimela/giflyst-backend)

2. For local development, change url in `src/Home.js` to listen to local backend.

```js
<Button href='http://localhost:8888/' variant="success" className='btn-login'>Login to Spotify</Button>
```

3. It's ready now! Run `npm start` and it will open the application in your browser in the address `http://localhost:3000/`


### API

This application is built using spotify web API library from [https://github.com/jmperez/spotify-web-api-js](https://github.com/jmperez/spotify-web-api-js) .
Go check his repository for the complete documentation available helper functions to access all Spotify's endpoint.

### Deploy to heroku

Follow this guideline to deploy react application to heroku [https://blog.heroku.com/deploying-react-with-zero-configuration](https://blog.heroku.com/deploying-react-with-zero-configuration).
