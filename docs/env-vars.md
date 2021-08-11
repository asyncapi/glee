# Environment Variables

Glee provides a few environment variables for you to customize the experience:

|Variable|Description|Example|
|---|---|---|
|GLEE_SERVER_NAMES|A comma-separated list of the servers to load on startup.|`GLEE_SERVER_NAMES=websockets,mosquitto`
|GLEE_SERVER_CERTS|A comma-separated list of `${serverName}:${pathToCertificateFile}`. These are the certificates to use when establishing the connection to the given server.|`GLEE_SERVER_CERTS=mosquitto:mosquitto.org.crt`
|GLEE_SERVER_VARIABLES|A comma-separated list of `${serverName}:${serverVariable}:${value}`. These are the values to use for each server variable.|`GLEE_SERVER_VARIABLES=websockets:namespace:public`
