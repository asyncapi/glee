export default (event, next) => {
    if (!event.connection)
        return next();
    const { connection, channel } = event;
    if (!connection.hasChannel(channel)) {
        return next(new Error(`Can't send a message to channel ${channel} using this connection.`));
    }
    next();
};
