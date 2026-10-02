const cache = {};
const ttlInMs = 60 * 1000;

function checkCache(req, res, next) {
    const key = req.originalUrl;
    const value = cache[key];
    if(value){
        const timeElapsed = Date.now() - value.createdAt;
        if(timeElapsed < ttlInMs){
            res.set('X-Cache', 'HIT');
            return res.json(value.value);
        }
        delete cache[key];
    }

    res.set('X-Cache', 'MISS');
    res.locals.cacheKey = key;
    next();
}

function storeCache(key, value) {
    cache[key] = { value, createdAt: Date.now() };
}

function clearCache() {
    for (const key of Object.keys(cache)) delete cache[key];
}

function invalidateCacheOnSuccess(req, res, next) {
    res.once('finish', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) clearCache();
    });
    next();
}

module.exports = {
    cache,
    checkCache,
    storeCache,
    clearCache,
    invalidateCacheOnSuccess
};
