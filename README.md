# parser-log
Node app to parser log with console

we can run the next command to start deplpy Docker container:
docker build -t node-parser-log .

check containers:
docker images

Command to access to container with another port:
docker run -it -p 4000:3000 node-parser-log
or 
docker run -d -p 4000:3000 node-parser-log

Open browser with:
http://localhost:4000/

Check containers:
docker ps

Check containers process:
docker ps -a

Stop container:
docker stop cointainer_id

Node command to create the cvs file:
node ./src/parser_file_app.js