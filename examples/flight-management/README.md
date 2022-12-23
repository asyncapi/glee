# Flight Management Example

This example was created to demonstrate the usage of Glee with WebSockets and Next.js.

# Architecture

This project consists of three parts: backend, board, and admin front-end.
## Backend
The backend is developed with Glee and uses a JSON server to store data. If you want to add more flights you can add them to the `db.json` file in `backend` folder.

## Board
This will show a list of flights for a specific airport. See the flights for a specific airport by using this URL format `http://localhost:{PORT}/{AIRPORT_CODE}`.
## Admin Front-End
You can edit flight info here to see them change in your board project in real time. Browse `http://localhost:{PORT}/{AIRPORT_CODE}` to see and edit flight info.

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