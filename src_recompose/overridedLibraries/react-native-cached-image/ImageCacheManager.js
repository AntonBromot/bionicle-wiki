'use strict';

const _ = require('lodash');

const fsUtils = require('./utils/fsUtils');
const pathUtils = require('./utils/pathUtils');
const MemoryCache = require('react-native-clcasher/MemoryCache').default;

module.exports = (defaultOptions = {}, urlCache = MemoryCache, fs = fsUtils, path = pathUtils) => {

    const defaultDefaultOptions = {
        headers: {},
        ttl: 3600 * 24 * 30,   // 60 * 60 * 24 * 14, // 2 weeks
        useQueryParamsInCacheKey: false,
        cacheLocation: fs.getCacheDir(),
        allowSelfSignedSSL: true,   // false,
    };

    _.defaults(defaultOptions, defaultDefaultOptions);

    function isCacheable(url) {
        return _.isString(url) && (_.startsWith(url.toLowerCase(), 'http://') || _.startsWith(url.toLowerCase(), 'https://'));
    }

    function cacheUrl(url, options, getCachedFile) {
        if (!isCacheable(url)) {
            return Promise.reject(new Error('Url is not cacheable'));
        }
        _.defaults(options, defaultOptions);
        const cacheableUrl = path.getCacheableUrl(url, options.useQueryParamsInCacheKey);
        return urlCache.get(cacheableUrl)
            .then(fileRelativePath => {
                if (!fileRelativePath) {
                    throw new Error('URL expired or not in cache');
                }

                const cachedFilePath = `${options.cacheLocation}/${fileRelativePath}`;

                return fs.exists(cachedFilePath)
                    .then((exists) => {
                        if (exists) {
                            return cachedFilePath
                        } else {
                            throw new Error('file under URL stored in url cache doesn\'t exsts');
                        }
                    });
            })
            .catch(() => {
                const fileRelativePath = path.getImageRelativeFilePath(cacheableUrl);
                const filePath = `${options.cacheLocation}/${fileRelativePath}`

                return fs.deleteFile(filePath)
                    .then(() => getCachedFile(filePath))
                    .then(() => urlCache.set(cacheableUrl, fileRelativePath, options.ttl))
                    .then(() => filePath);
            });
    }

    return {
        downloadAndCacheUrl(url, options = {}) {
            return cacheUrl(
                url,
                options,
                filePath => fs.downloadFile(url, filePath, options.headers)
            );
        },
        seedAndCacheUrl(url, seedPath, options = {}) {
            return cacheUrl(
                url,
                options,
                filePath => fs.copyFile(seedPath, filePath)
            );
        },
        deleteUrl(url, options = {}) {
            if (!isCacheable(url)) {
                return Promise.reject(new Error('Url is not cacheable'));
            }
            _.defaults(options, defaultOptions);
            const cacheableUrl = path.getCacheableUrl(url, options.useQueryParamsInCacheKey);
            const filePath = path.getImageFilePath(cacheableUrl, options.cacheLocation);
            // remove file from cache
            return urlCache.remove(cacheableUrl)
                // remove file from disc
                .then(() => fs.deleteFile(filePath));
        },
        clearCache(options = {}) {
            _.defaults(options, defaultOptions);
            return urlCache.flush()
                .then(() => fs.cleanDir(options.cacheLocation));
        },
        getCacheInfo(options = {}) {
            _.defaults(options, defaultOptions);
            return fs.getDirInfo(options.cacheLocation);
        },

    };
};
