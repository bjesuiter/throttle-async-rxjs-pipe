module.exports = function (wallaby) {
    var compilerOptions = Object.assign(
        require('./dev.tsconfig.json').compilerOptions
    );

    compilerOptions.module = 'CommonJs';

    // noinspection JSUnresolvedFunction
    return {
        files: [
            {pattern: 'tsconfig.json', load: false},
            {pattern: 'dev.tsconfig.json', load: false},
            {pattern: 'jest.config.js', load: false},
            {pattern: 'src/setup-jest.ts', load: false, instrument: false},
            {pattern: 'src/jest-global-mocks.ts', load: false, instrument: false},
            '!src/**/*.spec.ts'
        ],

        tests: ['src/**/*.spec.ts'],

        env: {
            type: 'node',
            runner: 'node'
        },

        testFramework: 'jest',
        compilers: {
            '**/*.ts': wallaby.compilers.typeScript(compilerOptions)
        },

        setup: function (wallaby) {
            const jestConfig = require('./jest.config.js');
            // noinspection JSUnresolvedFunction
            wallaby.testFramework.configure(jestConfig);
        }
    };
};