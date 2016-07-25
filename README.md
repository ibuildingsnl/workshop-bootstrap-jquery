# Workshop Bootstrap/jQuery

## Setup (vagrant)

If you don't want to install Node, Ruby, etc. on your workstation, you can use the Vagrant box. Make sure you have
[Vagrant](https://www.vagrantup.com/docs/installation/) and [VirtualBox](https://www.virtualbox.org/wiki/Downloads)
installed, as well as [Ansible](http://docs.ansible.com/ansible/intro_installation.html), and then run:

```
vagrant up
```

Finish by running `composer install`, using the following parameters:

```
database_host: <enter for default>
database_port: <enter for default>
database_name: db
database_user: user
database_password: password
mailer_transport: <enter for default>
mailer_host: <enter for default>
mailer_user: <enter for default>
mailer_password: <enter for default>
secret: <enter for default>
```

## Setup (workstation)

If you are doing a lot of front-end work already, and you have a couple of these tools installed already, you can install the rest locally:

  - [Node](https://nodejs.org/en/download/)
  - [npm](https://docs.npmjs.com/getting-started/installing-node#updating-npm)
  - [Grunt](http://gruntjs.com/getting-started#installing-the-cli)
  - [Bower](https://bower.io/#install-bower)
  - [Ruby](https://www.ruby-lang.org/en/documentation/installation/)
  - [Sass](http://sass-lang.com/install)

Finish by running `composer install`, using the following parameters:

```
database_host: <enter for default>
database_port: <enter for default>
database_name: db
database_user: user
database_password: password
mailer_transport: <enter for default>
mailer_host: <enter for default>
mailer_user: <enter for default>
mailer_password: <enter for default>
secret: <enter for default>
```

## Exercises

This workshop has two parts.

In [Part 1](PART1.md) we use Bootstrap to style the homepage.

In [Part 2](PART2.md) we use jQuery to build an AJAX form.
