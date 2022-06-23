export default async function (event) {
    console.log(event.payload)
    return {
        send: [{
            server: 'clientWs',
            payload: event.payload
        }]
    }
}