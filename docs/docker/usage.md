Tentative usage. still buggy


# developing the functionality
## Concept
- Run container forever (sleep infinity) for asyncapi/cli image
- Open command prompt in container
- Spawn glee project
- Glee files are now visible in local filesystem for editing

## Usage
### prepare your project
- install docker on your workstation (see docker website)
- create a local folder to host your Glee projects
- download docker-compose.yaml into this folder
- run the docker compose up command. This brings up a container with asyncapi/cli
- run docker command to open a container command prompt: docker exec -it name-of-container sh 
### at container command prompt
- create glee project e.g. asyncapi new glee --name=tutorial --template tutorial
- follow instructions to install and launch glee
- change permission on Glee files so they can be edited in local file system with command chown.....
- monitor glee log
- terminate glee server with ctrl-c
### in local workstation
- navigate to glee project (one directory down from docker-compose file)
- edit asyncapi.yaml to bind Glee server to your broker of preference (server: host, protocol).
On file of change Glee notices and rebuilds/relaunches the server
- edit a function in function folder to define new behavior
- add operations to asyncapi.yaml
- refer to Glee tutorial for help with Glee itself (https://www.asyncapi.com/docs/tools/glee, https://www.asyncapi.com/docs/tutorials/generate-code)

## Pitfalls
- websocket port at glee server: xxxxxxxx
- you may want to reset your Glee contents. Do not remove the local folder (this gives weird Docker issues). Recommended approach: 
    - open a container command prompt
    - go one directory up (cd ..)
    - force-write new glee project e.g. asyncapi new glee --name=tutorial --template tutorial --force-write
    - Follow instructions to start Glee

