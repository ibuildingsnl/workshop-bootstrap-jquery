# workshop-bootstrap-jquery

## setup (vagrant)

If you don't want to install Node, Ruby, etc. on your workstation, you van use the Vagrant box. Make sure you have
[Vagrant](https://www.vagrantup.com/docs/installation/) and [VirtualBox](https://www.virtualbox.org/wiki/Downloads)
installed, as well as [Ansible](http://docs.ansible.com/ansible/intro_installation.html), and then run:

```
vagrant up
```

## setup (workstation)

First, install [Node](https://nodejs.org/en/download/) and [npm](https://docs.npmjs.com/getting-started/installing-node#updating-npm).

Next, install [Grunt](http://gruntjs.com/getting-started#installing-the-cli) [Bower](https://bower.io/#install-bower).

Finally, install [Ruby](https://www.ruby-lang.org/en/documentation/installation/) and [Sass](http://sass-lang.com/install).

## exercise 1: set up Bootstrap for Sass

Start by opening the homepage, for the vagrant box the URL is:

```
http://192.168.33.88/app_dev.php
```

You can see that the homepage has no styling whatsoever. We will be using Bootstrap to fix this.

But before we can start installing packages, we need to initialize or npm and bower configs:

```
bower init
npm init
```

We'll be styling the homepage using Bootstrap for Sass, so we need a number of packages:

```
bower install --save bootstrap-sass
npm install --save-dev grunt
npm install --save-dev grunt-contrib-sass
npm install --save-dev grunt-contrib-watch
```

Now, create a file called `Gruntfile.js` and put in the following content:

```js
module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-sass');

    grunt.initConfig({
        sass: {
            dist: {
                options: {
                    sourcemap: 'inline',
                    loadPath: 'bower_components/bootstrap-sass/assets/stylesheets'
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

```
@import "bootstrap";
```

If you run `grunt`, then you should see two new files:

```
web
└── css
    ├── main.css
    └── main.css.map
```

Finally, open `app/Resources/views/default/index.html.twig` and make sure the stylesheet is loaded as follows:

```html
{% block stylesheets %}
    <link rel="stylesheet" href="{{ asset('css/main.css') }}">
{% endblock %}
```

As you can see, the homepage now has some basic styling, but not nearly enough.

Before we start adding more styling, let's set up Grunt to recompile our scss code automatically:

```js
grunt.initConfig({
    sass: {
        // ...
    },
    watch: {
        scripts: {
            files: ['**/*.scss'],
            tasks: ['sass']
        }
    }
});
```

Now, if we run `grunt watch`, and we change something in `main.scss`, Grunt will recompile `main.css` and we only have to refresh our browser.

## exercise 2: style the homepage

The next step is to make sure the homepage is styled according to the design.

You can find a mockup in `doc/designs/homepage.png`.

To find out how to use Bootstrap to get there, open http://getbootstram.com/ and visit the following sections:

  - Components > Navbar (Inverted navbar, Fixed to top!)
  - Components > Jumbotron
  - `<hr>` is not documented
  - CSS > Grid system

You will need no custom styling, except for a `margin-top` to get clear from the nav bar.

## exercise 3: customize Bootstrap

The style still looks a bit prefab, so let's customize it.

We could write extra style rules to override the ones from Bootstrap, but Bootstrap let's us do something different, which is to redefine variables.

First, we should create a separate stylesheet for our custom workshop rules. Let's call this `_workshop.scss` and create an import in `main.scss`:

```scss
@import "workshop";
```

Now, create a file called `_variables.scss` in `app/Resources/css/` and import that just before Bootstrap:

```scss
@import "variables";
@import "bootstrap";
@import "workshop";
```

If you look at `doc/designs/homepage.png`, you can see that the links are no longer blue, but dark red. But what variable should we change to change the colors of the links?

To find out, start by inspecting a link in your development toolbar. We enabled source maps, which means that your browser can give you the SCSS code that is responsible for the link color.
Now the code says `$link-color`, so let's override that:

```scss
$link-color: hsl(0, 100%, 30%);
```

The links are now red! But we can do better than that. If you look in `bower_components/boostrap-sass/assets/stylesheets/bootstrap/_variables.scss`, you can see a rule:

```scss
$link-color: $brand-primary !default;
```

This means that if we override `$brand-primary`, we not only fix links, but also buttons, pagination and many other elements, so let's to that:

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
