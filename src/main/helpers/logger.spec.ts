/* eslint-disable no-console */
import { Logger, COLORS } from './logger';

describe('Logger', () => {
    beforeEach(() => {
        console.log = jest.fn();
        console.dir = jest.fn();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should log a message', () => {
        Logger.log('Test message');
        const message = '[' + COLORS.blue + 'LOG' + COLORS.reset + '] ' + 'Test message';

        expect(console.log).toHaveBeenCalledWith(message);
    });

    it('should log an object', () => {
        const testObject = { key: 'value' };

        Logger.dir(testObject);

        expect(console.dir).toHaveBeenCalledWith(testObject);
    });

    it('should log an initial message', () => {
        Logger.initial('Initial message');
        const message = COLORS.blue + 'Initial message' + COLORS.reset;

        expect(console.log).toHaveBeenCalledWith(message);
    });
});
