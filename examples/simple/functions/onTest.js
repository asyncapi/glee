export default function (event) {
    const user = event.payload;
    console.log('[FROM SIMPLE]', user);
    return {
        reply: [{
            payload: `Hello ${user.name}`
        }]
    }
}