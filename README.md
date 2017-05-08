# SprinklesJS

Super tiny (1.1kb) library for DOM manipulation. This is sprinkles for VanillaJS.

![Size(minified)](https://img.shields.io/badge/minified-4kb-green.svg?style=flat) ![Size(gzipped)](https://img.shields.io/badge/gzipped-1.1kb-green.svg?style=flat) [![License MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/maloninc/sprinklesJS/blob/master/LICENSE.txt)

# A simple example

``` javascript
s("button").on('click', function(){
  alert("Hello world");
});
```

# API

Here is a list of API.

- s.find
- s.parent
- s.children
- s.next
- s.prev
- s.append
- s.prepend
- s.remove
- s.attr
- s.removeAttr
- s.addClass
- s.removeClass
- s.toggleClass
- s.text
- s.css
- s.val
- s.hide
- s.show
- s.on
- s.ready

# Note

Thre is no ajax() API. You shoud use fetch API.

## Author and License

Created and maintained by [Hiroyuki Nakamura](http://maloninc.com/) under the MIT license.