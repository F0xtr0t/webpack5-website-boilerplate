module.exports = (api) => {
    return {
        plugins: {
            "postcss-preset-env" : {},
            'cssnano': api.env === 'production' ? {} : false
        }
    }
};