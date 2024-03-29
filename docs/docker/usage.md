Tentative usage. still buggy


# developing the functionality
## Concept
- Spawn glee project
- Install the project
- File the image
- Run container from this image where glee project is bound to local file system 
- Make container persitent with sleep command
- Open command-prompt in container for Glee commands (npm run dev, ctrl-c) and monitoring glee log
- open editor in local file system to edit the glee project

## Usage
### prepare your project
- install docker on your workstation (see docker website)
- create a local folder to host your Glee project
- download docker-compose.yaml into this folder
- run the docker compose up command. This brings up a container with Glee
- run docker command to open a container command prompt: docker exec -it name-of-container sh 
### at container command prompt
- launch glee server with npm: npm run dev
- terminate glee with ctrl-C
- monitor glee log
### in local workstation
- edit asyncapi.yaml to bind Glee server to your broker of preference (server: host, protocol).
On file of change Glee notices and rebuilds/relaunches the server
- edit a function in function folder to define new behavior
- add operations to asyncapi.yaml
- refer to Glee tutorial for help with Glee itself (https://www.asyncapi.com/docs/tools/glee, https://www.asyncapi.com/docs/tutorials/generate-code)

## Pitfalls
- you may want to reset your Glee contents. Do not remove the local folder (this gives weird Docker issues). Recommended approach: 
    - open a container command prompt
    - go one directory up (cd ..)
    - force-write new glee project e.g. asyncapi new glee --name=tutorial --template tutorial --force-write
    - Follow instructions to start Glee

