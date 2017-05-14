describe('Initilization', function() {
    it('with selector "html". s("html")', function(){
        var obj = s('html');
        expect(obj instanceof Array).toBe(true);
        expect(obj[0]).toBe(document.querySelectorAll('html')[0]);
    });

    it('with HTML tag. s("<div")', function(){
        var div = s('<div>');
        expect(div instanceof Array).toBe(true);
        expect(div[0] instanceof Node).toBe(true);
    })
});

describe('Event', function() {
    var App = {};
    var response = null;

    it('is register by normal event, "click"', function(){
        s(document).on('click', '#myButton', function(){
            response = this;
        })
        expect(response == null).toBe(true);
    });

    it('is triggered by normal event, "click"', function(){
        s('#myButton').trigger('click', true);
        expect(response == s('#myButton')[0]).toBe(true);
        response = null;
    });

    it('is registerd by on("hi")', function(){
        var obj = s(App);
        expect(obj[0].sprinkles != undefined).toBe(true);

        s(App).on('hi', function(){
            response = 'Hello';
        })
        expect(response == null).toBe(true);
    });

    it('is triggered by trigger("hi")', function(){
        s(App).trigger('hi', true);
        expect(response == 'Hello').toBe(true);
    });

    it('is registerd by s(document).ready()', function(){
        s(document).ready(function(){
            expect(document.getElementsByClassName('ready-test')[0] != undefined).toBe(true);
        })
    });
});

describe('DOM manupilation', function(){
    it('finds nodes from s() object. find()', function(){
        var obj = s('.root');
        expect(obj.find('li').length).toBe(3);
    });

    it('finds parent node. parent()', function(){
        var obj = s('#item1');
        expect(obj.parent()[0]).toBe(s('#list')[0]);
    });

    it('finds children. children()', function(){
        var obj = s('#list');
        expect(obj.children().length).toBe(3);
    });

    it('finds next node. next()', function(){
        var item1 = s('#item1');
        var item2 = s('#item2');
        expect(item1.next()[0]).toBe(item2[0]);
    });

    it('finds prev node. prev()', function(){
        var item1 = s('#item1');
        var item2 = s('#item2');
        expect(item2.prev()[0]).toBe(item1[0]);
    });

    it('appends node. append()', function(){
        var obj = s('<p>');
        var list = s('#list');
        list.append(obj);
        expect(obj.parent()[0]).toBe(list[0]);
        expect(obj.prev()[0]).toBe(s('#item3')[0]);
    })

    it('prepends node. prepend()', function(){
        var obj = s('<p>');
        var list = s('#list');
        list.prepend(obj);
        expect(obj.parent()[0]).toBe(list[0]);
        expect(obj.next()[0]).toBe(s('#item1')[0]);
    })

    it('removes node. remove()', function(){
        s('#item1').remove();
        expect(s('#list li').length).toBe(2);
    });

    it('hides node. hide()', function(){
        var item2 = s('#item2').hide();
        expect(item2[0].style.display).toBe('none');
    });

    it('shows node. show()', function(){
        var item2 = s('#item2').show();
        expect(item2[0].style.display).toBe('block');
    });

    it('sets attribute. attr()', function(){
        var item2 = s('#item2').attr('myAttr', 'myValue');
        expect(item2[0].attributes.myattr.value).toBe('myValue');
    });

    it('removes attribute. removeAttr()', function(){
        var item2 = s('#item2').removeAttr('myAttr');
        expect(item2[0].attributes.myattr).toBe(undefined);
    });

    it('adds class. addClass()', function(){
        var item2 = s('#item2').addClass('myClass1').addClass('myClass2');
        expect(item2[0].classList[0]).toBe('myClass1');
        expect(item2[0].classList[1]).toBe('myClass2');
    });

    it('removes class. removeClass()', function(){
        var item2 = s('#item2').removeClass('myClass1');
        expect(item2[0].classList[0]).toBe('myClass2');
        expect(item2[0].classList[1]).toBe(undefined);
    });

    it('toggles class. toggleClass()', function(){
        var item2 = s('#item2').toggleClass('toggle-class');
        expect(item2[0].classList.value.includes('toggle-class')).toBe(true);
        item2.toggleClass('toggle-class');
        expect(item2[0].classList.value.includes('toggle-class')).toBe(false);
    });

    it('sets text. text()', function(){
        s('.root p').text('Hello');
        expect(s('.root p')[0].innerText).toBe('Hello');
        expect(s('.root p')[1].innerText).toBe('Hello');
    });

    it('gets text. text()', function(){
        var text = s('.root p').text();
        expect(text).toBe('Hello');
    });

    it('sets css. css()', function(){
        s('.root').css('display', 'block');
        expect(s('.root')[0].style.display).toBe('block');
    });

    it('gets css. css()', function(){
        s('.root').css('display', 'none');
        expect(s('.root')[0].style.display).toBe('none');
    });

    it('sets value. val()', function(){
        s('.input input').val('Hi!');
        expect(s('.input input')[0].value).toBe('Hi!');
    });

    it('gets value. val()', function(){
        var value = s('.input input').val();
        expect(value).toBe('Hi!');
    });
});