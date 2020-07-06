module.exports = function asyncMiddleware(handler) {
    return async (req, res, next) => {
        try {
            console.log("NAo deu erro");
            await handler(req, res);
        }
        catch (ex) {
            console.log("DEU ERROR");
            next(ex);
        }
    };
}