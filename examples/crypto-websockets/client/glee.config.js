export default async function() {
    return {
        websocket: {
            client: {
                authentication: {
                    token: "bearer Token"
                }
            }
        }
    }
}