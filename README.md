# jq-quickvalidate

A small & extensible jQuery validation plugin.

**Demo:** [jsfiddle](http://jsfiddle.net/elclanrs/ZsS2D/embedded/result/)  
**Tested:** IE8+, Webkit, Firefox 3.6+, Opera 11+

* * *


# How to use jq-quickvalidate:

Load the latest [jQuery library](http://jquery.com), the `jq-quickvalidate.js` plugin and the `jq-quickvalidate.css` stylesheet into your project as well as the [`normalize.css`](http://necolas.github.com/normalize.css/) reset. Feel free to customize the CSS to your needs if you need to adjust the layout.

## HTML:

```html
<form id="my-form" action="action.php" method="post">

    <p><label>Date: <span>*</span>:</label><input type="text" placeholder="mm/dd/yy" class="required date"/></p>
    
    ...

</form>
```

**jq-quickvalidate** adds support for `placeholder` in browsers that don't support this feature.
      
**Default filters:**

You may use the `required` filter plus ONE other filter from the list. 

* required
* number
* name
* username
* pass
* strongpass
* email
* phone
* zip
* date

## JavaScript:

```javascript
$('#my-form').quickValidate({
    speed: 'fast' // Popup fade speed
    easing: 'linear' // Popup easing (requires easing plugin)
    onFail: function(){
        // On submit if form does NOT validate
    },
    onSuccess: function(){
        // On submit if form validates
    },
    filters: {
        // Add new filters or overwrite the default 
        // ones following this pattern
        custom: {
            regex: /something/,
            error: 'Custom error message.'
        }
        another: {
            // `regex` also takes a function:
            // function(value) { return @boolean }
            regex: function(value){
                var re = /hello world/i;
                return re.test(value);
            },
            error: 'another error'
        }
    }
});
```