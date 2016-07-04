# Pokedex
Simple CRUD app to list and sort collections of Pokemon cards. The database is Nedb, so no additional dependencies are required.

---

## Installation
```
git clone git@github.com:wgoodall01/Pokedex.git
cd pokedex
npm install
export SESSION_SECRET=ayylmao # Change this - used for session security
node app.js
```
Navigate to `localhost:8080` to get started.

## Configuration
|Environment Var|What it does|
|---|---|
|`PORT`|Sets the port the app will listen on|
|`DEBUG`| set to `yes`, `true`, or `1` for debug mode|

