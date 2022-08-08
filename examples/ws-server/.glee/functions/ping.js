module.exports = (event) => {
    console.log(event.payload.message);
    return {
        send: [
            {
                channel: '/send',
                payload: event.payload
            }
        ]
    };
};
