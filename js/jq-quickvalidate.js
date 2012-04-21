/* --------------------------------------------------------

    jq-quickvalidate 1.1

    * Author: Cedric Ruiz
    * License: GPLv2
    * Website: https://github.com/elclanrs/jq-quickvalidate

-------------------------------------------------------- */

(function ($) {
    
    'use strict';
    
    $.fn.quickValidate = function (ops) {
    
        // Default options
        var o = $.extend({
            onSuccess: function () 
                alert('Thank you...');
            },
            onFail: function () {
                // What happens on submit if the form
                // does NOT validate.
                alert('The form does not validate! Check again...');
            },
            filters: {
                // Add your own filters
                // ie. myfilter: { regex: /something/, error: 'My error' }
            },
            speed: 'fast', // Popup fadeIn speed
            easing: 'swing' // Popup fadeIn easing
        }, ops);
        
        // Cache variables
        var $form = this,
            // Only process these elements
            $inputs = $form.find('input:text, input:password');          
            
/* --------------------------------------------------------

    Default filters:
    
    * ie. <input type="text" class="required username"></input>
    * input will match filter name `username`
 
-------------------------------------------------------- */    
        
        var filters = {
            number: {
                regex: /\d+/,
                error: 'Must be a number.'
            },
            name: {
                regex: /^[A-Za-z]{3,}$/,
                error: 'Must be at least 3 characters long, and must only contain letters.'
            },
            username: {
                regex: /^[a-z](?=[\w.]{3,31}$)\w*\.?\w*$/i,
                error: 'Must be at between 4 and 32 characters long and start with a letter. You may use letters, numbers, underscores, and one dot (.)'
            },
            pass: {
                regex: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/,
                error: 'Must be at least 6 characters long, and contain at least one number, one uppercase and one lowercase letter.'
            },
            strongpass: {
                regex: /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
                error: 'Must be at least 8 characters long and contain at least one uppercase and one lowercase letter and one number or special character.'
            },
            email: {
                regex: /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/,
                error: 'Must be a valid e-mail address. (e.g. user@gmail.com)'
            },
            phone: {
                regex: /^[2-9]\d{2}-\d{3}-\d{4}$/,
                error: 'Must be a valid US phone number. (e.g. 555-123-4567)'
            },
            zip: {
                regex: /^\d{5}$|^\d{5}-\d{4}$/,
                error: 'Must be a valid US zip code. (e.g. 33245 or 33245-0003)'
            },
            url: {
                regex: /^(?:(ftp|http|https):\/\/)?(?:[\w\-]+\.)+[a-z]{3,6}$/i,
                error: 'Must be a valid URL. (e.g. www.google.com)'
            },
            date: {
                regex: function (value) {
                    var match = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(value),
                        isDate = function (m, d, y) {
                            return m > 0 && m < 13 && y > 0 && y < 32768 && d > 0 && d <= (new Date(y, m, 0)).getDate();
                        };
                    return (match) ? isDate(match[1], match[2], match[3]) : null;
                },
                error: 'Must be a valid date. (e.g. mm/dd/yyyy)'
            }
        };
        
        // Merge custom and default filters
        $.extend(true, filters, o.filters);
        
/* --------------------------------------------------------

    Validate(klass, value):
    
    * klass: a string containg all classes of a given input
    * value: the value of the given input
 
-------------------------------------------------------- */
        
        var validate = function (klass, value) {
            var isValid = true,
                error = '';
            if (!value && /required/.test(klass)) {
                error = 'This field is required.';
                isValid = false;
            }
            if (value) {
                klass = klass.split(/\s/);
                $.each(klass, function(i, k){
                    if (filters[k]) {
                        if (
                            typeof filters[k].regex === 'function' && !filters[k].regex(value) || 
                            filters[k].regex instanceof RegExp && !filters[k].regex.test(value)
                        ) {
                            isValid = false;
                            error = filters[k].error;
                        }
                        return false;
                    }
                });
            }
            return {
                isValid: isValid,
                error: error
            };
        };
        
/* --------------------------------------------------------

    Analyze($input):
    
    * $input: an input jQuery object.
 
-------------------------------------------------------- */
        
        var analyze = function ($input) {
            var klass = $input.attr('class'),
                value = $input.val(),
                test = validate(klass, value),
                $error = $('<span class="error">' + test.error + '</span>'),
                $info = $('<i class="error-icon"></i>'),
                $ok = $('<i class="valid-icon"></i>');
            $info.hover(function () {
                $(this).siblings('.error').stop(1, 1).fadeToggle(o.speed, o.easing);
            });    
            $input.removeClass('invalid').siblings('.error, .error-icon, .valid-icon').remove();
            if (!test.isValid) {
                $input.addClass('invalid');
                $error.add($info).insertAfter($input);
            }
            if (value && test.isValid) {
                $ok.insertAfter($input);
            }
        };
        
/* --------------------------------------------------------

    Events:
 
-------------------------------------------------------- */   
            
        $inputs
            .each(function () {
                if ($(this).is('.required')) {
                    analyze($(this));
                }
            })
            .keyup(function () {
                analyze($(this));
            });

        $form.submit(function (e) {
            if ($form.find('input.invalid').length) {
                e.preventDefault();
                o.onFail();
            } else {
                o.onSuccess();
            }
        });
        return this;
    };
}(jQuery));