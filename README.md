# project-gametime
This website gives anyone a space to give their opinions on video games that they have played and share it for everyone to see.

The core purpose of the platform is to build a community of passionate users that get together and discuss the games they are interested in.

## Getting Started:

- You need to have docker installed on your local machine if you want this to work.
- Make sure that docker is in your PATH so that you can call it in the command line
- If you are on Windows or mac, you will need to use Docker Desktop to activate Docker, but after it is running in the background, everything is done in the command line

## Runtime:

to run the program use this command:
```
docker compose up --build
```
when you do that, the frontend is on:
```
http://localhost:5173/
```


The backend is exposed on:
```
http://localhost:8000/gametime/games
```


## setting up dependencies 
If you want to contribute then run this in the backend directory:
```
pip install --no-cache-dir -r requirements.txt
```

And this in the frontend directory:

```
npm install
```

## populating database
For testing purposes, you can populate the database with randomly generated data by running `Database.py` in `backend/src/restapi/Database`


 
