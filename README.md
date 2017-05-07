# SprinklesJS

Super tiny (1.1kb) library for DOM manipulation. This is sprinkles for VanillaJS.

# A simple example

``` javascript
s("button").on('click', function(){
  alert("Hello world");
});
```

# Support API

Here is a list of support API.

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