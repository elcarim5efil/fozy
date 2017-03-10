import mkdir from 'mkdirp';

module.exports = async (path) =>{
    return new Promise(function(resolve, reject) {
        mkdir(path, function(err){
            if(err) {
                reject(err);
            } else {
                resolve(null);
            }
        });
    })
}
