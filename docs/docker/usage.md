# Issues in developing the functionality
## Concept
- Build image on base async/cli dressed up with python and .gyp
- Spawn glee project
- Install the project
- File the image
- Run container from this image where glee project is bound to local file system and run Glee

## Issues
- When you delete glee project in local file, this is somehow remembered. Glee project does not come back at next "docker compose up"
- When you locally change a file in glee project, server is not aware. You can "kick the server"e.g. with local chown but that is strange workaround


## Way forward
- improve my understanding of docker (but both two issues relate to how binding works. And that is very tricky stuff with big risk to go into platform dependent approaches)
- explore devcontainer

Devcontainer (github codespaces; codesandbox) looks quite interesting. But be careful. The solution only has to be "more simple" than maintaining a proper local development environment. 
