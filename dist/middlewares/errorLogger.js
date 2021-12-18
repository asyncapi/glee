import { logError } from '../lib/logger.js';
import ValidationError from '../errors/validation.js';
export default (err, message, next) => {
    if (err instanceof ValidationError) {
        if (message && message.inbound) {
            err.message = 'You have received a malformed event or there has been error processing it. Please review the error below:';
            logError(err, { showStack: false });
        }
        else if (message && message.outbound) {
            err.message = 'One of your functions is producing a malformed event or there has been an error processing it. Please review the error below:';
            logError(err, { showStack: false });
        }
    }
    else {
        logError(err);
    }
    next();
};
