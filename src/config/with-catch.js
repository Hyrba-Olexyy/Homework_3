module.exports = function withCatch(callback) {

    return async function intersept(req, res, next) {
        try { 
            await callback(req, res, next);
    
        } catch(error) { 
            console.error('error:', error);
            if(error.name === 'CastError') return res.status(404).send(error);
            res.status(500).send(error);
            next(error);
        }
    }
}
