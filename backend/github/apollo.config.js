module.exports = {
    client: {
        service: {
            name: 'github',
            url: 'https://api.github.com/graphql',
            headers: {
                authorization: 'Bearer ' + process.env.GITHUB_API_KEY
            },
        }
    }
};
