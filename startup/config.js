/**
 * @author Artur Brito
 * @email artur.brito95@gmail.com
 * @create date 07-07-2020 00:33:49
 * @modify date 07-07-2020 00:33:49
 * @desc .
 */

const config = require('config');

module.exports = function() {
    if(!config.get('jwtPrivateKey')){
        throw new Error('FATA ERROR: jwtPrivateKey is not defined.');    
    }
}