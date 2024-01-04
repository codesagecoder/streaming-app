## MERN Stack Streaming App
A simple streaming web app.
### Demo [Here](https://google.com).

## How To Run
#### Must have nodejs with npm installed (preferrably latest version).
1. Download/clone the repository.

2. Open a cli in the `api` folder and install all the dependencies using `npm i` command.
3. Run `npm run dev` to launch the server.
4. Open a new cli in the `client` folder and install all the dependencies using `npm i` command.
5. Launch client side with `npm run dev` command.

#### Environment values within the server (.env):
| Variable    | Description |
|-------------| ----------- |
| SECRET_KEY  | jwt secret key|
| MONGO_URL   | mongodb database uri|
| PORT   | your prefferred port|


## Features
- REST api
- Register and Login system
- Fully responsive
- JWT for managed session authentication
- State management with react context
- No library/dependency based carousel

## Tools/Dependencies
- react
- axios
- mongodb (mongoose)
- express
- sass
- JWT

#### NOTE: Additional setup is required via the [admin](https://github.com/codesagecoder/streaming-app-admin), dashboard.