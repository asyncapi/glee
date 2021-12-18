import ValidationError from '../errors/validation.js';
import { validateData } from '../lib/util.js';
export default schema => (event, next) => {
    const { humanReadableError, errors, isValid } = validateData(event.payload, schema);
    if (!isValid) {
        return next(new ValidationError({
            humanReadableError,
            errors,
        }));
    }
    next();
};
