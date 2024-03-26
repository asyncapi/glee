# Anime-HTTP 

This application is a dummy application showcasing the use of HTTP adapter in Glee. This application makes and `GET` call to a third-party REST API to fetch the list of famous Anime. 


## Prerequisites 

- Node.js (version 12 or higher)

## How to run the Application 

The application is divided into a `server` and a `client` which needs to be run simultaneously. 

**To run Server**

```sh
cd server
npm run dev
```

**To run Client**

```sh
cd client
npm run dev
```


The Server needs to run first and then the client application. The server fetches the data from the third-party REST API when the client makes a `GET` API call to the server.