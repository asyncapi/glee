export default function (event) {
    const user = event.payload;
    console.log(user);
    return {
        reply: [{
            payload: 'Hello'
        }]
    }
}