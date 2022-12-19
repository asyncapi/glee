# Flight Management Example

This example was created to dimunstrate the usage of glee with websockets and Nextjs.

# Architecture

this project consists of three parts.
## Backend
the backend is developed with glee and uses a json server to store data. if you want to add more flights you can add them to the `db.json` file in ./backend folder.

## Board
this will show a list of flights for an specific airport. see the flights for an specific airport by using this url format `http://localhost:{PORT}/{AIRPORT_CODE}`.
## Admin Front-End
You can edit flight info here to see them change in your board project in real-time. you can use `http://localhost:{PORT}/{AIRPORT_CODE}` to see and edit flight info.

## Run it

1) run the backend.

```
cd ./backend
npm run dev
```
2) run the board project.

```
cd ./front-end-board
npm run dev
```
2) run the admin dashboard project.

```
cd ./front-end-admin
npm run dev
```