# Node.js Hello World Sample

This application demonstrates a simple, reusable Node.js web application based on the Express framework.

## Run the app locally

1. [Install Node.js][]
1. cd into this project's root directory
1. Run `npm install` to install the app's dependencies
1. Run `npm start` to start the app
1. Access the running app in a browser at <http://localhost:6001>

[Install Node.js]: https://nodejs.org/en/download/

## API endpoints

Path                  |  Descriprion
----------------------|-----------------------------------------------
**POST `/signup`**    | To regestr an new user. It takes the user inforamtion in json format, for more see `regestration.json` json schema
**POST `/login`**      | Log the user in. it takes the user inforamtion and if it's correct respode with a token. You have to provid this token in the recuest body like this `{"token: "put your valid token here"}` whenever you want to access a protected path.
**GET `/user`**       | exist to check the authentication you have to log in first and then put the token in the http header or in the url query.
**GET `/home/posts` (protected path)**  | get all posts
**POST `/home/posts` (protected path)** | create a new post
**GET `/home/posts/:postId` (not implimented yet)** | get a given post
**PUT `/home/posts/:postId` (protected path)** | edit a post
**DELETE `/home/posts/:postId` (protected path)** | delete a post