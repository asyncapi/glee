module.exports = (event) => {
    const message = event.payload
    console.log('> ', message.message)

    return {
        reply: []
    }
}