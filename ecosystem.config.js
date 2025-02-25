module.exports = {
    apps: [
        {
            name: 'next-client',
            script: 'npm',
            args: 'run dev-client',
        },
        {
            name: 'api-server',
            script: 'npm',
            args: 'run dev-api',
            watch: ['src/app/api']
        }
    ]
};
