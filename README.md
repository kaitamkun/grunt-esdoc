# grunt-esdoc

Grunt plugin for the ES6 documentation tool [ESDoc](https://esdoc.org/).

## Install

```bash
npm install grunt-esdoc --save-dev
```

## Documentation

### Configuration

Configure the plugin in your project's Gruntfile.js.

First, add an `esdoc` entry to the options for the `initConfig` method:

```javascript
grunt.initConfig({
    esdoc: {
        dist: {
            options: {
                source: "./src",
                destination: "./doc"
            }
        }
    }
});
```
Then load the plugin:

```javascript
grunt.loadNpmTasks("grunt-esdoc");
```

[All ESDoc config properties are allowed under options](https://esdoc.org/config.html).

```javascript
grunt.initConfig({
    esdoc: {
        dist: {
            options: {
              source: "./path/to/src",
              destination: "./path/to/esdoc",
              includes: ["\\.(jsx?|es6?)$"],
              excludes: ["\\.config\\.(jsx?|es6?)$"],
              access: ["public", "protected"],
              autoPrivate: true,
              unexportIdentifier: false,
              undocumentIdentifier: true,
              builtinExternal: true,
              importPathPrefix: "",
              index: "./README.md",
              package: "./package.json",
              coverage: true,
              test: {
                type: "mocha",
                source: "./test/src",
                includes: ["Test\\.(jsx?|es6?)$"],
                excludes: ["\\.config\\.(jsx?|es6?)$"]
              }
              title: "Example Software Name",
              styles: ["./path/to/style.css"],
              scripts: ["./path/to/script.js"]
            }
        }
    }
});
```

Alternatively, you can use a `config` option that is a path to a file containing the configuration options for ESDoc.

```javascript
grunt.initConfig({
    esdoc: {
        dist: {
            options: {
                config: "esdoc.json"
            }
        }
    }
});
```

### Build

To generate the documentation, you need to call the `esdoc` task :

```bash
$> grunt esdoc
```

or integrate it to your build sequence :

```javascript
grunt.registerTask("default", ["lint", "test", "esdoc"]);
```

## Contributing

Any contribution is welcome! Please check the [issues](https://github.com/cleversoap/grunt-esdoc/issues).

## Release History
 * _0.0.1_ First Release - using esdoc 0.1.4 and directly passing through options using the default publisher
 * _0.0.2_ Using esdoc ~0.4.0 and updated the package metadata with relevant links
 * _0.0.3_ Upgrade to at least node 4.0.0, upgrade to esdoc 0.4.7, cleaned up output to only show coverage by default
 * _0.0.4_ Will now parse float percentages of coverage
 * _0.0.5_ Updated for esdoc 0.5.2.

## License
Copyright &copy; 2016 Cleversoap.
Licensed under the MIT license.

Modified by Kai Tamkun: [https://github.com/kaitamkun/grunt-esdoc](https://github.com/kaitamkun/grunt-esdoc)