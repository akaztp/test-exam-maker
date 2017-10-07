# Typescript Coding Style Guide

The style guide builds on top of existing guides:
- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript): One of the most used javascript guides.
- [Angular Style Guide](https://angular.io/guide/styleguide): Angular preferred conventions.
- [Codelyzer](https://github.com/mgechev/codelyzer): A set of tslint rules for static code analysis of Angular TypeScript projects.

## TSLint Rules

TSLint Rules come from a variety of sources, by this order:
- AngularCLI preset rules: tslint-config/tslint-angularcli-preset.json
- Codelyzer preset rules: tslint-config/tslint-codelyzer-preset.json
- Codelyzer custom rules: tslint-config/tslint-codelyzer-custom.json
- [TSLint Config Airbnb](https://github.com/progre/tslint-config-airbnb): (external package)
- My custom rules: tslint-config/tslint-.json
- Project Rules: tslint.json

## My AirBnb styling overrides

- [AirBnb 3.8](https://github.com/airbnb/javascript#objects--rest-spread): Prefer the Object.assign() because it preserves type information
- [AirBnb 16.1](https://github.com/airbnb/javascript#blocks--braces): single line block statement do not need braces and no inline statements:
```
// good
if (something === otherthing)
    return something;
```
- [AirBnb 16.2](https://github.com/airbnb/javascript#blocks--cuddled-elses): brace style in "[allman](https://en.wikipedia.org/wiki/Indentation_style#Allman_style)" style
```
// good
if (something === otherthing)
{
    return something;
}
else
{
    return otherthing;
}
```
- [AirBnb 18.1](https://github.com/airbnb/javascript#comments--multiline): 4 space indentation
- [AirBnb 19.12](https://github.com/airbnb/javascript#whitespace--max-len): max line length from 100 to 140

## My code styling overrides (not AirBnb)

- [no-increment-decrement](https://github.com/Microsoft/tslint-microsoft-contrib): false
- [no-var-self](https://github.com/Microsoft/tslint-microsoft-contrib): false
- arrow functions do not trail:
```
// good
takeCallback(
    (num) =>
    {
        num = Math.round(num / 100);
        return num + '%';
    },
);
```