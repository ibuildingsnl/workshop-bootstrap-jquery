# Part 2: jQuery

## Exercise 1: try out HTML5 validation

Open `app/Resources/views/default/register.html.twig` and add `required` to the `email` input.

Open the registration form in your browser and check that it uses HTML5 validation.

## Exercise 2: install Parsley

Install Parsley.js:

```
bower install --save parsleyjs
```

Edit the Gruntfile to make sure `parsley.js` and `parsley.css` are copied and include it in `base.html.twig`.

Then add the `data-parsley-validate` to the registration form.

Check to see if it works, then maybe tweak the layout so the error message looks a bit better.

## Exercise 3: check password

Require that the password be filled, is at least 8 characters long and contains at least one lower case letter, upper case letter and number.

A helpful error message should be displayed if the password is not valid.

The password should also be entered twice.

## Exercise 4: check email against existing accounts

Check out `DefaultController::checkEmailAvailableAction()`. This end-point returns information on whether an email address is available or not.

Now create a file named `register.js` in `app/Resources/js`. Start with the following content:

```js
(function ($, Parsley) {

    console.log('test');

}(window.jQuery, window.Parsley));
```

Start by getting this to work in your browser before we continue.

The next step is to do a test-request to the server. Read the documentation on [`jQuery.ajax`](http://api.jquery.com/jquery.ajax/) and get it working.

The last step is to turn this into a [Custom Parsley Validator](http://parsleyjs.org/doc/index.html#custom). Pay attention to the following passage:

> Validating functions should return either true if the value is valid, or false otherwise. It can instead return a jQuery promise that will be resolved if the value is valid, or be rejected otherwise.

There are a number of ways to create a jQuery promise, but I would recommend the following way, because it looks most
like the new [ES6 Promise](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise):

```js
new $.Deferred(function (deferred) {
    setTimeout(function () {
        deferred.resolve('OK');
    }, 3000);
});
```

## Exercise 5: install ESLint

Install [ESLint](https://www.npmjs.com/package/eslint)
with the [Airbnb config preset](https://www.npmjs.com/package/eslint-config-airbnb)
and the [Grunt plugin](https://www.npmjs.com/package/grunt-contrib-eslint).

Override the following rules:

```json
{
  "extends": "airbnb",
  "rules": {
    "indent": [2, 4],
    "id-length": [2, {"exceptions": ["$", "_"]}]
  }
}
```

We want to run ESLint through grunt. Let's add it to the default task, and add it to a new `test` task as well:

```js
grunt.loadNpmTasks("grunt-eslint");

grunt.initConfig({
    // ...
    eslint: {
        src: ['app/Resources/js/**/*.js']
    },
    watch: {
        // ...
        files: {
            files: ['app/**/*.js'],
            tasks: ['copy', 'eslint']
        }
    }
});

grunt.registerTask('default', ['sass', 'copy', 'eslint']);
grunt.registerTask('test', ['eslint']);
```

If you run grunt now, you will probably get errors. Some of these are because the Airbnb style guide assumes you are working in ECMAScript 6.

Since we're not, we can override the following rules as well:

```json
{
  "rules": {
    "strict": 0,
    "no-var": 0,
    "func-names": 0,
    "object-shorthand": 0,
    "prefer-arrow-callback": 0
  }
}
```
