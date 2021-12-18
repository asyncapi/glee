import { logInboundMessage, logOutboundMessage } from '../lib/logger.js';
export default (message, next) => {
    if (message.inbound) {
        logInboundMessage(message);
    }
    else if (message.outbound) {
        logOutboundMessage(message);
    }
    next();
};
