# Contributing to Tune/In

## Code Style

### Formatting

- Indent with 2 spaces (not tab characters!)
- Lines should not be longer than 80 characters

### Delimiters

- Statements should all have a trailing semicolon
- All elements in a list should have a trailing comma
- Single-line lists should have spaces inside the brackets
- Strings should be delimited with double quotes
- Arrow functions should always have parens around their parameters

## Scripts

Formatting and linting rules are also defined in the top-level .prettierrc and
workspace-specific eslint.config.js files. This repository contains a few 
scripts to simplify styling your code before you commit. 

To lint the current workspace: ```npm run lint```

To format the current workspace: ```npm run format```

You can also use ```npm run style``` to run both of the above scripts.

## Editor Integration

Both Prettier and ESLint provide instructions for integrating with your editor.

Prettier: [Editor Integration](https://prettier.io/docs/editors)
ESLint: [Integrations](https://eslint.org/docs/latest/use/integrations)
