export default (message, next) => {
    try {
        message.payload = JSON.stringify(message.payload);
    }
    catch (e) {
        // We did our best...
    }
    next();
};
