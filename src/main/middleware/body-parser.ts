import bodyParserModule from 'body-parser';

export const bodyParser = bodyParserModule.urlencoded({
    extended: true,
    limit: '500mb',
    parameterLimit: 25000,
});
