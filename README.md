# leetcode-summary
A simple application that can easily get someones leetcode progress using username only.

## Installation 

1. Clone from git 
    `git clone https://github.com/H-proshanto/leetcode-summary.git`

2. cd into server from root and install dependencies
    </br>
    </br>
    `cd client && yarn`
   </br>
   </br>
    or
   </br>
   </br>
    `cd server && npm install`

3. cd into client from root and install dependencies
    </br>
    </br>
    `cd client && yarn npm install`
   </br>
   </br>
    or
   </br>
   </br>
    `cd client && npm install`

4. go into server directory and make a .env file
    the file will contain
    `PORT=SOME_PORT`

5. cd into server from root and run server
    </br>
    </br>
   `cd server && yarn start`
   </br>
   </br>
    or
   </br>
   </br>
    `cd server && npm start`

6. cd into client from root and run client
    </br>
    </br>
   `cd client && yarn run dev`
   </br>
   </br>
    or
   </br>
   </br>
    `cd client && npm run dev`

<h5>Alternatively you can do 2 - 5 using make file</h5>

## Docker
You can make docker image using the dockerfile. From root directory run
     `docker build .`

After image is built. Run the docker image with
    `docker run -p 3001:3001 -p 3000:3000 container`
     


