### Installation
Just  run:
```sh
$ [sudo] npm install
```
It will install dependencies and `postInstall` will run bower,  if it does'nt happened, please run:

```sh
$ bower install
```

### Execution

The default task just adds watchers and runs BrowserVerify, it  is useful to test and debug.

```sh
$ gulp
```

Otherwise, if you just want to see it working, you could run:

```sh
$ gulp build
$ gulp server-build
```

Tasks:

`build` will apply the optimized files 
 
`server-build` runs everything that is in `_build` folder generated with the above task

### Tests

Unit tests:
```sh
$ npm test
```


### Libraries 

| Plugin | README |
| ------ | ------ |
| AngularJs | [https://github.com/angular/angular.js/blob/master/README.md] |
| Bootstrap | [http://getbootstrap.com/]  |
| BrowserVerify | [https://www.npmjs.com/package/browserverify] |
| Gulp | [http://gulpjs.com/]  |
| Jasmine | [https://jasmine.github.io/] |
| Karma | [https://github.com/karma-runner/karma/blob/master/README.md] |
