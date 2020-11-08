####### What All I have Implemented #####

Basic Requirement - All Implemented
Advanced Requiredment - Everything is implemented except databae storage. Currently I have used map for the parallel gaming experience.

Please Note : Parallel Games feature is implemented in the current code with the help of unique token code for each newly started game.

####### Deployment Instructions ######

--------------- Local Setup ------------------


1. Node.js version installation from their website : https://nodejs.org/en/
2. Unzip the project
3. mkdir myapp && cd myapp
3. npm install
4. node index.js

Output:

Server running at http://localhost:3000/


--------------- API Information ------------------

1) Introductory API :
    https://keylatedistributedcomputing.animeshbote.repl.co/
2) START API - get API
    https://keylatedistributedcomputing.animeshbote.repl.co/start
3) move API - post API
    https://keylatedistributedcomputing.animeshbote.repl.co/:move
    json body: 
    {
  	"gameToken": "token_code_returned_from_start"
    } 
4) please see the screenshots for the sample calls
	

-------------- Server Setup On Heroku ------------

1.Create a new directory and initialise a Git repository
2.Login to the Heroku CLI and create a new project
3.Initialise a new npm project and install Express.js
4.Edit the contents of app.js
5.Create a Procfilea by adding this command on command line
  a) $ echo "web: node app.js" > Procfile
6.Add and commit to Git, then push to your Heroku master branch