module.exports = {
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended','plugin:prettier/recommended'],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint','prettier','eslint-plugin-prettier'],
    rules: {
        'prettier/prettier': [
            'error',
            {
                endOfLine: 'auto',
            },
        ],
    },
    overrides: [
        {
            files: ['*.ts', '*.tsx'],
            rules: {
                'prettier/prettier': [
                    'error',
                    {
                        endOfLine: 'auto',
                    },
                ],
            },
        },
    ],
    root: true,
};