# How testing works
## Where testing happens:
testing happens in the backend inside the gametime folder. the file that will be used is test.py and django makes this alot easier than most. 

## How to test:
Go to the command line and navigate to the root of the backend portion of the project,
run: python manage.py test and it will run every single test in the test.py file

## why only backend
the frontend is really tested through the backend implementation so it didn't really need to have unit tests. We usually just do a: bun run dev and navigate around to make sure it works, but because the backend is connected to the database and IGDB, we really needed to automated unit tests there to make sure it works. I put this in the docker file so everytime you build the project, it runs the tests automattically.

