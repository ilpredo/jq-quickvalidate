# jq-quickvalidate

A small & extensible jQuery validation plugin.

**Demo:** http://jsfiddle.net/elclanrs/ZsS2D/

* * *


# How to use quickValidate:

Load the latest [jQuery library](http://jquery.com), the `jq-quickvalidate.js` plugin and the `jq-quickvalidate.css` stylesheet into your project as well as the [`normalize.css`](http://necolas.github.com/normalize.css/) reset. Feel free to customize the CSS to your needs if you need to adjust the layout.

## HTML:

```html
<form id="my-form" action="action.php" method="post">

    <p><label>Name <span>*</span>:</label><input type="text" class="required name"/></p>
    
    ...

</form>
```
      
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
            // `regex` also takes a function
            // with the input's `value` as only
            // parameter. The function must
            // return a boolean or falsy value
            regex: function(value){
                var re = /hello world/i;
                return re.test(value); // returns boolean
            }
        }
    }
});
```