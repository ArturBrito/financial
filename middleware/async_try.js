/**
 * @author Artur Brito
 * @email artur.brito95@gmail.com
 * @create date 07-07-2020 00:35:08
 * @modify date 07-07-2020 00:35:08
 * @desc Error handler middleware
 */

module.exports = function asyncMiddleware(handler) {
    return async (req, res, next) => {
        try {
            await handler(req, res);
        }
        catch (ex) {
            next(ex);
        }
    };
}