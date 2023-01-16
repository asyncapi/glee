export default async function () {
    return {
        websocket: {
            websockets: {
                authentication: {
                    token: process.env.TOKEN
                }
            }
        }
    }
}