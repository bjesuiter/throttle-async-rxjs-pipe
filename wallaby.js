module.exports = function () {
    return {
        files: [
            'tsconfig.json',
            'dev.tsconfig.json',
            'src/**/*.ts',
            '!src/**/*.spec.ts'
        ],

        tests: ['src/**/*.spec.ts'],

        env: {
            type: 'node',
            runner: 'node'
        },

        testFramework: 'jest'
    };
};