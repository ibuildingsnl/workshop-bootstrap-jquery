# Part 1: Bootstrap

## Exercise 1: set up Bootstrap for Sass

Start by opening the homepage. For the vagrant box, the URL is:

```
http://192.168.33.88/app_dev.php
```

You can see that the homepage has no styling whatsoever. We will be using Bootstrap to fix this.

But before we can start installing packages, we need to initialize our npm and bower configs:

```
bower init
npm init
```

We'll be styling the homepage using Bootstrap for Sass, so we need a number of packages:

```
bower install --save bootstrap-sass
npm install --save-dev grunt
npm install --save-dev grunt-sass
npm install --save-dev grunt-contrib-watch
```

Now, create a file called `Gruntfile.js` and put in the following content:

```js
module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-sass');

    grunt.initConfig({
        sass: {
            dist: {
                options: {
                    sourceMap: true,
                    sourceMapContents: true
                },
                files: {
                    'web/css/main.css': 'app/Resources/css/main.scss'
                }
            }
        }
    });

    grunt.registerTask('default', ['sass']);
};
```

Then, create a file called `app/Resources/css/main.scss`, containing the following:

```scss
@import "../../../bower_components/bootstrap-sass/assets/stylesheets/bootstrap";
```

If you run `grunt`, then you should see two new files:

```
web
└── css
    ├── main.css
    └── main.css.map
```

Finally, open `app/Resources/views/default/index.html.twig` and make sure the stylesheet is loaded as follows:

```twig
{% block stylesheets %}
    <link rel="stylesheet" href="{{ asset('css/main.css') }}">
{% endblock %}
```

As you can see, the homepage now has some basic styling, but not nearly enough.

Before we start adding more styling, let's set up Grunt to recompile our scss code automatically:

```js
grunt.loadNpmTasks('grunt-contrib-watch');

grunt.initConfig({
    sass: {
        // ...
    },
    watch: {
        sass: {
            files: ['**/*.scss'],
            tasks: ['sass']
        }
    }
});
```

Now, if we run `grunt watch`, and we change something in `main.scss`, Grunt will recompile `main.css` and we only have to refresh our browser.

## Exercise 2: style the homepage

The next step is to make sure the homepage is styled according to the design.

You can find a mockup in `doc/designs/homepage.png`.

To find out how to use Bootstrap to get there, open http://getbootstrap.com/ and visit the following sections:

  - Components > Navbar
    - Inverted navbar
  - Components > Jumbotron
  - `<hr>` is not documented
  - CSS > Grid system

## Exercise 3: customize Bootstrap

The style still looks a bit prefab, so let's customize it.

We could write extra style rules to override the ones from Bootstrap, but Bootstrap let's us do something different, which is to override variables.

First, we should create a separate stylesheet for our custom workshop rules. Let's call this `_workshop.scss` and create an import in `main.scss`:

```scss
@import "workshop";
```

Now, create a file called `_variables.scss` in `app/Resources/css/` and import that just before Bootstrap:

```scss
@import "variables";
@import "../../../bower_components/bootstrap-sass/assets/stylesheets/bootstrap";
@import "workshop";
```

There's a mockup for the custom styling in `doc/designs/homepage-custom.png`. In that mockup, the links are not blue, but dark red. But what variable should we change to change the colors of the links?

To find out, start by inspecting a link in your development toolbar. We enabled source maps, which means that your browser can give you the SCSS code that is responsible for the link color.
Now the code says `$link-color`, so let's override that:

```scss
$link-color: hsl(0, 100%, 30%);
```

The links are now red! But we can do better than that. If you look in `bower_components/boostrap-sass/assets/stylesheets/bootstrap/_variables.scss`, you can see a rule:

```scss
$link-color: $brand-primary !default;
```

This means that if we override `$brand-primary`, we not only fix links, but also buttons, pagination and many other elements, so let's do that:

```scss
$brand-primary: hsl(0, 100%, 30%);
```

Next, the headers. We want those in the same color as the links, and our dev tools tell us the variable we need to override is:

```scss
$headings-color: $brand-primary;
```

Finally, the menu. For this, we need to look a little closer to the variables file. There is an entire block dedicated to inverse navbars. A lot of them are fine the way they are, but three of them have to change:

```scss
$brand-secondary:           hsl(45, 100%, 50%);
$navbar-inverse-color:      $brand-secondary;
$navbar-inverse-bg:         $brand-primary;
$navbar-inverse-link-color: $brand-secondary;
```

There is no such thing as `$brand-secondary` in Bootstrap, but it makes sense to name the color that way.

Note that our menu still has rounded borders, while the one in the design doesn't. Don't worry about this, we'll fix this later.

## Exercise 4: icons and semantic tags

Replace the text "Home" in the menu with an icon. Choose the one you think is most intuitive.

Did it work? Probably not. The Sass compiler converts SCSS to CSS, but it ignores fonts. The easiest way to fix this is to copy over the fonts and rewrite the URLs in the CSS.

First, install the following package:

```
npm install --save-dev grunt-contrib-copy
```

Then, add a copy task to the Gruntfile:

```js
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.initConfig({
        sass: {
            // ...
        },
        copy: {
            fonts: {
                expand: true,
                flatten: true,
                src: 'bower_components/bootstrap-sass/assets/fonts/bootstrap/*',
                dest: 'web/fonts/bootstrap/'
            }
        },
        watch: {
            // ...
        }
    });
    
    grunt.registerTask('default', ['sass', 'copy']);
```

Now it works!

Icons are a way to add a lot of meaning in a small amount of space. They are aimed at people viewing the page through a browser.
Another way to add meaning to your page is through semantic tags, but they are aimed at screen readers and search engines.

Let's add some semantic tags to the page. Look through the HTML and choose logic places to insert these tags:

  - `<strong>`
  - `<nav>`
  - `<section>`

## Exercise 5: CSS tweaks

In real life, this is the point where the customer comes with a list of feedback points. Here it is:

  - the menu should not have rounded corners
  - neither should the jumbotron
  - (keep the rounded corners for other elements)
  - the menu should stick to the top if you scroll down (hint: `navbar-fixed-top`)
  - the space between the jumbotron and the horizontal rule should be adjusted, so that it is equal to the space between the horizontal rule and the image below
  - in the jumbotron, the "o" in "World" should be a globe icon
  - in the jumbotron, the "o" in "Markdown" should be a heart-empty icon
  - see `doc/designs/jumbotron.png` for the desired placement of the icons (note that the point of the heart is below the baseline)

## Exercise 6: dynamic content

Our page is looking better and better, but the one thing it's missing is a carousel. Bootstrap has a number of standard components, including a carousel.
Visit [the documentation](http://getbootstrap.com/javascript/#carousel) to read more.

To use the carousel, you should include `bootstrap.js` in `base.html.twig`.

Before you can include these two scripts in `base.html.twig`, you should make sure they are copied by grunt. I'll let you work out for yourself how to do that.

Finally, use the Bootstrap documentation to figure out how to add a carousel below the jumbotron, containing the following two pictures:

  - https://placekitten.com/1140/500
  - https://placekitten.com/g/1140/500

Note that the carousel has a `data-ride` attribute that is used to bind JavaScript events to the elements. Bootstrap uses `data` attributes throughout the
component library to bring elements to life.
