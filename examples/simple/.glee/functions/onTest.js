module.exports = async (event) => {
    console.log(event.payload);
    return {
        reply: [{
            payload: 'Hello'
        }]
    }
}