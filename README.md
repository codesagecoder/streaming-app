## MERN video (movies/series) streaming app
A streaming web app, similar to Netflix. 

## Demo
Live demo hosted on heroku, [stream-all.herokuapp.com](https://stream-all.herokuapp.com/).
Might be slow on initial load.

## How to run the App
#### Must have nodejs with npm installed (preferrably latest version).
1. Download the app and open the folder in the cli
2. cd into the `/server` folder and Insall all the dependencies using `npm i` command
3. Create a .env file with key `SECRET_KEY = YOUR_OWN_SECRET` for jwt authentication
4. In the .env, you may if you have a mongodb database, setup another key `MONGO_URL = URL_TO_YOUR_DATABASE`
5. Launch the server with `npm start` command. The server will launch on port 8080.

6. cd back into downloaded directory then cd into `/client` folder and Insall all the dependencies using `npm i` command
7. Launch client side with `npm start` command, localhost:3000 will automatically open up in browser.
#### Without any data in database there will not be anything rendered on screen(it will be a blank screen)

## Features
- REST api
- Register and Login system
- Fully responsive
- JWT for session storage and authentication
- Via [admin](https://github.com/codesagecoder/streaming-app-admin), firebase storage bucket
- State management with react context
- fully functioning carousel for navigation

## Tools/Dependencies
- react
- axios
- mongodb (mongoose)
- express
- sass
- JWT
- cors