# Vanilla Query

A syntax-conversion for Vanilla JS & CSS3 methods using traditional jQuery conventions.

Warning: This is NOT a replacement for jQuery. It is still recommended to use jQuery if your app uses plugins and/or makes extensive use of its methods/selectors.

Use this lib if you're relying strictly in Vanilla JS or you are only using jQuery to bind events and use simple selectors, for example in a [Backbone.js](http://backbonejs.org) app.


### Scope

This is a strict Vanilla JS or CSS3 syntax conversion. No extra functionality is added - if some function is not available as Vanilla JavaScript of a CSS attribute it will not be created from scratch.


## Install

Using bower:
```
bower install vanilla-query
````

## Usage

Vanilla query will ovewrite the ```$``` namespace, so it is not recommended to be used along side jQuery, Zepto or other libs that may use that global variable.

Having said that, including it as a js dependency in your app should be enough to use the ```$``` methods as accustomed.

A simple example: [ [demo](http://rawgithub.com/makesites/vanilla-query/master/examples/index.html) ] [ [source](https://github.com/makesites/vanilla-query/blob/master/examples/index.html) ]

## Methods

These are the currently supported methods:

* addClass
* append
* attr
* click
* clone
* css
* each
* empty
* get
* getJSON
* hide
* html
* is
* next
* param
* parent
* post
* ready
* show
* toggleClass


## Credits

Initiated by [Makis Tracend](http://github.com/tracend)

Started as a weekend project of [Makesites Hackathons](https://www.eventbrite.com/e/vanilla-query-tickets-9743333573?aff=eorg)

Distributed through [Makesites.org](https://www.eventbrite.com/e/vanilla-query-tickets-9743333573?aff=eorg)

Released under the [Apatche license v2.0](http://www.makesites.org/licenses/APACHE-2.0)