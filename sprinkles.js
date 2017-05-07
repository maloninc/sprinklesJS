// sprinklesJS
// -----------
// Super tiny library for DOM manipulation. This is sprinkles for VanillaJS.
// @author Hiroyuki Nakamura http://maloninc.com/
// @inspiration http://youmightnotneedjquery.com, http://umbllerajs.com/, https://github.com/jaszhix/vquery

// Initialize the library
var s = function (parameter, context) {
  // Make it an instance of s() to avoid needing 'new' as in 'new s()' and just
  // use 's().bla();'.
  // @reference http://umbllerajs.com/
  if (!(this instanceof s)) {
    return new s(parameter, context);
  }

  // No need to further processing it if it's already an instance
  if (parameter instanceof s) {
    return parameter;
  }

  // Parse it as a CSS selector if it's a string
  if (typeof parameter === 'string') {
    try {
      // Try to parse as CSS selector
      parameter = document.querySelectorAll(parameter);
    }catch(e){
      // If fail to parse as CSS, then try it as HTML
      this.init(this.create(parameter));
    }
  }

  // If we're referring a specific node as in on('click', function(){ s(this) })
  // or the select() function returned a single node such as in '#id'
  if (parameter && parameter.nodeName) {
    parameter = [parameter];
  }

  // Convert to an array, since there are many 'array-like' stuff in js-land
  this.init(parameter);
};

// Basically s() object is Array
s.prototype = new Array;

s.prototype.version = '1.0.0';

// Internal use only
s.prototype.init = function(parameter){
  var _this = this;
  this.slice(parameter).forEach(function(el, idx){
    _this.push(el);
  });
};

// Internal use only
s.prototype.filteredMap = function(callback){
  return this.map(function(el){
    return callback(el)
  }).filter(function(el){
    return el != null && el != undefined;
  });
}

// Internal use only
s.prototype.slice = function (pseudo) {
  // Check that it's not a valid object
  if (!pseudo ||
      pseudo.length === 0 ||
      typeof pseudo === 'string' ||
      pseudo.toString() === '[object Function]') return [];

  return pseudo.length ? [].slice.call(pseudo) : [pseudo];
};

// Internal use only
s.prototype.create = function(htmlStr){
  return new DOMParser().parseFromString(htmlStr, 'text/html').body.childNodes[0];
}

// Internal use only
s.prototype.getNode = function(target){
  if(target instanceof s){
    return target[0];
  }else if(target instanceof Node){
    return target;
  }else if(typeof target == 'string'){
    return s.prototype.create(target);
  }else{
    throw('Argument must be instace of Node or string or s()');
  }
}

//
// DOM manipulate API
//

s.prototype.find = function(selector){
  var results = this.map(function(el){
    return s.prototype.slice(el.querySelectorAll(selector));
  });
  var concatnatedArray = results.reduce(function(prev, current, idx){
    return prev.concat(current)
  });

  var uniqArray = concatnatedArray.filter(function (el, idx, self) {
    return self.indexOf(el) === idx;
  });

  return s(uniqArray);
};

s.prototype.parent = function(){
  var results = this.filteredMap(function(el){
    return el.parentNode;
  });
  return s(results);
};

s.prototype.children = function(){
  var results = this.map(function(el){
    return s.prototype.slice(el.children);
  });
  concatnatedArray = results.reduce(function(prev, current, idx){
    return prev.concat(current)
  });

  return s(concatnatedArray);
};

s.prototype.next = function(){
  var results = this.filteredMap(function(el){
    return el.nextElementSibling;
  });
  return s(results);
};

s.prototype.prev = function(){
  var results = this.filteredMap(function(el){
    return el.previousElementSibling;
  });
  return s(results);
};

s.prototype.append = function(target) {
  target = s.prototype.getNode(target);
  this.forEach(function(el){
    el.appendChild(target);
  });
  return this;
};

s.prototype.prepend = function(target){
  target = s.prototype.getNode(target);
  this.forEach(function(el){
    el.insertBefore(target, el.firstChild);
  });
  return this;
};

s.prototype.remove = function(){
  this.forEach(function(el){
    el.parentNode.removeChild(el);
  });
  return this;
};

s.prototype.attr = function(attr, val){
  if(val == undefined){
    return this[0].getAttribute(attr);
  }else{
    this.forEach(function(el){
      el.setAttribute(attr, val);
    });
    return this;
  }
};

s.prototype.removeAttr = function(attr){
    this.forEach(function(el){
      el.removeAttribute(attr);
    });
    return this;
};

s.prototype.addClass = function(className){
  this.forEach(function(el){
    el.classList.add(className);
  });
  return this;
};

s.prototype.removeClass = function(className){
  this.forEach(function(el){
    el.classList.remove(className);
  });
  return this;
};

s.prototype.toggleClass = function(className){
  this.forEach(function(el){
    el.classList.toggle(className);
  });
  return this;
};

s.prototype.text = function(val){
  if(val == undefined){
    return this[0].innerText
  }else{
    this.forEach(function(el){
      el.innerText = val;
    });
    return this;
  }
};

s.prototype.css = function(prop, val){
  if(val == undefined){
    getComputedStyle(this[0]).getPropertyValue(prop)
  }else{
    this.forEach(function(el){
      el.style.setProperty(prop, val);
    });
    return this;
  }
};

s.prototype.val = function(val){
  if(val == undefined){
    return this[0].value;
  }else{
    this.forEach(function(el){
      el.value = val;
    });
    return this;
  }
};

s.prototype.hide = function(){
  this.forEach(function(el){
    el.style.display = 'none';
  });
  return this;
};

s.prototype.show = function(){
  this.forEach(function(el){
    el.style.display = 'block';
  });
  return this;
};

s.prototype.on = function(eventName, selector, callback){
  if(typeof selector == 'string'){
    this.forEach(function(el){
      el.addEventListener(eventName, function(e){
          var target = e.target;
          var candidates = document.querySelectorAll(selector);

          candidates.forEach(function(candidate){
              if(candidate.contains(target)){
                  callback(e);
              }
          })
      });
    });
  }else if(typeof selector == 'function'){
    var callback = selector;
    this.forEach(function(el){
      el.addEventListener(eventName, callback);
    });
  }else{
    throw "Wrong argument. It requires (selector,eventName,callback) or (eventName,callback)";
  }
};

s.prototype.ready = function(callback){
  if(this[0] == document){
    if (document.readyState != 'loading'){
      callback();
    } else {
      document.addEventListener('DOMContentLoaded', callback);
    }
  }else{
    throw "Sorry, ready function is only for document object."
  }
};
