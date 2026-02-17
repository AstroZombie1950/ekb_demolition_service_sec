// var lazyLoadInstance = new LazyLoad({
//   elements_selector: ".lazy"

// });


var number = 0;
var maxNumber = $(".test-item").length;
var $element = $(".test-item").find("input, select, textarea");
var btnPrev = $(".quiz__prev");
var btnNext = $('.quiz__next');
var isValid;
var dataBlock;
var activeSlede = [];

for (var i = 0; i < maxNumber; i++) {
    activeSlede[i] = false;
}

$(".test-num-current").text(number + 1);
$(".test-num-all").text(maxNumber - 2);

$element.on('change input', function (e) {
    var value = $(this).val().trim();

    isValid = value !== "";
    btnActive(!isValid);

});

function btnActive(isValid) {
    if (number === 0) {
        btnPrev.prop('disabled', 'false');
        btnPrev.hide();
        btnNext.prop('disabled', isValid);
        $('.btn-lbs').hide();
    } else {
        btnPrev.fadeIn();
        btnPrev.prop('disabled', false);
        $('.btn-lbs').hide();
        if (activeSlede[number] === true || isValid === false) {
            btnNext.prop('disabled', false);
            $('.btn-lbs').hide();
        } else {
            btnNext.prop('disabled', true);
            $('.btn-lbs').show();
        }

    }

}

// btnPrev.hide();

var lbs = false;
$('.btn-lbs').on('click', function (event) {
    event.preventDefault();
    $(this).addClass('act');

    if (!lbs) {
        setTimeout(function () {
            $('.btn-lbs').removeClass('act');
            lbs = false;
        }, 3000);
        lbs = true;
    }

});

$(".social-inp").on('change input', function () {

    if ($(this).hasClass('vit')) {
        $('.inp-enp-ph').attr('placeholder', '*Ваш телефон в Viber');
        $('.eml').hide();
    } else if ($(this).hasClass('wat')) {
        $('.inp-enp-ph').attr('placeholder', '*Ваш телефон в WhatsApp');
        $('.eml').hide();
    } else if ($(this).hasClass('phn')) {
        $('.inp-enp-ph').attr('placeholder', '*Ваш телефон');
        $('.eml').hide();
    } else if ($(this).hasClass('emli')) {
        $('.inp-enp-ph').attr('placeholder', '*Ваш телефон ');
        $('.eml').fadeIn();
    }

});
// sidebar
var $barLevel = 100 / (maxNumber - 1);
var $barWidth = $barLevel;

function progress(num) {
    $(".progress-bar__line").css({"width": $barWidth + '%'});
    $('.pc').text(Math.floor($barWidth) + '%');
}

progress(0);

var smt = Number($('.summ-t-js').data('prc'));
var nextSumm = Math.floor(smt / (maxNumber - 2));
var nextSumm1 = nextSumm;
$('.summ-t-js').text(nextSumm);

// btn

function btnClick() {
    btnPrev.on('click', function (event) {
        event.preventDefault();
        --number;

        $('.test-item').hide();
        $('.test-item').eq(number).fadeIn(1000);
        // $(".test-wh-wrap").hide();
        // $(".test-wh-wrap").eq(number).fadeIn(500);
        btnActive(!isValid);


        // animateTop ();
    });


    btnNext.on('click', function (event) {
        event.preventDefault();
        activeSlede[number] = true;
        ++number;

        btnActive(!isValid);

        if (activeSlede[number] === true) {
            btnNext.prop('disabled', false);
            $('.btn-lbs').hide();
        } else {
            btnNext.prop('disabled', true);
            $('.btn-lbs').show();
        }

        if (number === maxNumber - 2) {
//       $(".test__visual, .rh-one").hide();
//       $(".rh-two").fadeIn(500);
            $(".test__quests-progress-text").text('Готово !');
            $(".test-item").hide();
            $(".test-item").eq(number).fadeIn(600);
            $barWidth = 100;
            nextSumm1 = smt;
            $('.summ-t-js').text(nextSumm1);
        } else {
            $(".test-item").hide();
            $(".test-item").eq(number).fadeIn(600);
            $(".test-num-current").text(number + 1);
            $barWidth += $barLevel;
            nextSumm1 += nextSumm;
            $('.summ-t-js').text(nextSumm1);
            // $(".test-wh-wrap").hide();
            // $(".test-wh-wrap").eq(number).fadeIn(500);
        }
        progress(number);
        if ($('.test-item').eq(number).find('input[type="file"]').length > 0) {
            btnActive(false);
            console.log('dsdsd')
        }
        animateTop();

    });


}

btnClick();

function animateTop(eq) {
    var elem = $('.test-scroll-js');
    var top = elem.offset().top - 15;
    $('body,html').animate({scrollTop: top}, 400);
}


$.fn.hasAttr = function (name) {
    return this.attr(name) !== undefined;
};

var nForm = false;
$(function () {
    'use strict';
    var action = $('.ajax-url').val();
    $('form').on('submit', function (e) {
        e.preventDefault();
        var formThis = $(this);
        // === НОВОЕ: даём формам с data-ds-calc="1" работать самим ===
        if (formThis.is('[data-ds-calc="1"]')) {
            return; // не делаем preventDefault, даём сработать JS плагина
        }
        // === конец нового блока ===
        var fd = new FormData(this);
        formThis.find('.btn').attr({
            'disabled': 'true'
        });
        if (formThis.find('input[name="formname"]').val() === "catalog") {
            var link = document.createElement('a');
            link.setAttribute('href', $('.pdf-pdf').val());
            link.setAttribute('target', "_blank");
            link.setAttribute('download', '');
            if (navigator.userAgent.indexOf('Mac') > 0) {
                window.location = $('.pdf-pdf').val();
            } else {
                simulate(link, "click");
            }
        } else if (formThis.find('input[name="formname"]').val() === "test") {
            formThis.find('input').attr({
                'disabled': 'true',
            });
            formThis.find('button').attr({
                'disabled': 'true',
            });

        } else {
            formThis.find('.btn').removeAttr('disabled');
        }
        $('form').trigger('reset');
        $.ajax({
            url: action,
            type: 'POST',
            contentType: false,
            processData: false,
            data: fd,
            success: function (msg) {
                window.location.href = $('.thank-url').val();
                formThis.find('.btn').removeAttr('disabled');
                $('form').trigger('reset');
            },

        });
    });
});


// ---------------------

function simulate(element, eventName) {
    var options = extend(defaultOptions, arguments[2] || {});
    var oEvent, eventType = null;

    for (var name in eventMatchers) {
        if (eventMatchers[name].test(eventName)) {
            eventType = name;
            break;
        }
    }

    if (!eventType)
        throw new SyntaxError('Only HTMLEvents and MouseEvents interfaces are supported');

    if (document.createEvent) {
        oEvent = document.createEvent(eventType);
        if (eventType == 'HTMLEvents') {
            oEvent.initEvent(eventName, options.bubbles, options.cancelable);
        } else {
            oEvent.initMouseEvent(eventName, options.bubbles, options.cancelable, document.defaultView,
                options.button, options.pointerX, options.pointerY, options.pointerX, options.pointerY,
                options.ctrlKey, options.altKey, options.shiftKey, options.metaKey, options.button, element);
        }
        element.dispatchEvent(oEvent);
    } else {
        options.clientX = options.pointerX;
        options.clientY = options.pointerY;
        var evt = document.createEventObject();
        oEvent = extend(evt, options);
        element.fireEvent('on' + eventName, oEvent);
    }
    return element;
}

function extend(destination, source) {
    for (var property in source)
        destination[property] = source[property];
    return destination;
}

var eventMatchers = {
    'HTMLEvents': /^(?:load|unload|abort|error|select|change|submit|reset|focus|blur|resize|scroll)$/,
    'MouseEvents': /^(?:click|dblclick|mouse(?:down|up|over|move|out))$/
}
var defaultOptions = {
    pointerX: 0,
    pointerY: 0,
    button: 0,
    ctrlKey: false,
    altKey: false,
    shiftKey: false,
    metaKey: false,
    bubbles: true,
    cancelable: true
}

// var closeMod = false;
//    $(document).mouseleave(function(event) {
//        event = event || window.event;
//        if (event.clientY < 0 || event.clientY < 3) {
//            if (!closeMod) {
//                $('#modal-wait').fadeIn();
//                $('html').addClass('stop');
//                closeMod = true;
//            }

//        }
//    });
setTimeout(function () {
    $('#modal-cons').fadeIn();
}, 5000);
$('.close-cons').on('click', function (event) {
    event.preventDefault();
    $('.modal-cons').slideToggle();
    $('.mod-im').toggleClass('active');
});

$('.mod-im').on('click', function (event) {
    event.preventDefault();
    $('.modal-cons').slideToggle();
    $(this).toggleClass('active');

});
var cookiesTest3 = get_cookie("test3");
if (cookiesTest3 !== '' && cookiesTest3 !== null) {
    // return false;
} else {

    setTimeout(function () {
        $('#modal-calc').addClass('active');
        $('#modal-calc').fadeIn();
    }, 45000);
    var date3 = new Date();
    date3.setDate(date3.getDate() + 7);
    date3 = date3.toUTCString();
    document.cookie = "test3=1;expires=" + date3;
    // lb3 = true;

}

var cookiesTest2 = get_cookie("test2");
if (cookiesTest2 !== '' && cookiesTest2 !== null) {
    // return false;
} else {
    var closeMod = false;
    $(document).mouseleave(function (event) {
        event = event || window.event;
        if (event.clientY < 0 || event.clientY < 3) {
            if (!closeMod) {

                $('html').addClass('stop');
                $('#modal-promo').fadeIn();


                closeMod = true;


                var date2 = new Date();
                date2.setDate(date2.getDate() + 7);
                date2 = date2.toUTCString();
                document.cookie = "test2=1;expires=" + date2;
            }

        }
    });

}

// Обязательная функция для 1 и 2
function get_cookie(cookie_name) {
    var results = document.cookie.match('(^|;) ?' + cookie_name + '=([^;]*)(;|$)');

    if (results)
        return (unescape(results[2]));
    else
        return null;
}


function getFileName2() {
    var file = '';
    var files = this.files;
    for (var a = 0; a < files.length; a++) {

        file += files[a].name + ' , ';

    }

    if (file === '') {
        file = "Выберите файл"
    }

    $(this).parents('.file-wrap').find('.file-text').text(file);

    btnActive(true);
}

$('.test input[type="file"]').on('input', getFileName2);

function testActive() {
    var number = 0;
    var maxNumber = $(".overlay-models .test-item").length;
    var $element = $(".overlay-models .test-item").find("input, select, textarea");
    var btnPrev = $(".overlay-models .quiz__prev");
    var btnNext = $('.overlay-models .quiz__next');
    var isValid;
    var dataBlock;
    var activeSlede = [];

    for (var i = 0; i < maxNumber; i++) {
        activeSlede[i] = false;
    }

    $(".overlay-models .test-num-current").text(number + 1);
    $(".overlay-models .test-num-all").text(maxNumber - 2);

    $element.on('change input', function (e) {
        var value = $(this).val().trim();

        isValid = value !== "";
        btnActive(!isValid);

    });


    function btnActive(isValid) {
        if (number === 0) {
            btnPrev.prop('disabled', 'false');
            btnPrev.hide();
            btnNext.prop('disabled', isValid);
            $('.overlay-models .btn-lbs').hide();
        } else {
            btnPrev.fadeIn();
            btnPrev.prop('disabled', false);
            $('.overlay-models .btn-lbs').hide();
            if (activeSlede[number] === true || isValid === false) {
                btnNext.prop('disabled', false);
                $('.overlay-models .btn-lbs').hide();
            } else {
                btnNext.prop('disabled', true);
                $('.overlay-models .btn-lbs').show();
            }

        }

    }

// btnPrev.hide();

    var lbs = false;
    $('.overlay-models .btn-lbs').on('click', function (event) {
        event.preventDefault();
        $(this).addClass('act');

        if (!lbs) {
            setTimeout(function () {
                $('.overlay-models .btn-lbs').removeClass('act');
                lbs = false;
            }, 3000);
            lbs = true;
        }

    });

    $(".overlay-models .social-inp").on('change input', function () {

        if ($(this).hasClass('vit')) {
            $('.overlay-models .inp-enp-ph').attr('placeholder', '*Ваш телефон в Viber');
            $('.overlay-models .eml').hide();
        } else if ($(this).hasClass('wat')) {
            $('.overlay-models .inp-enp-ph').attr('placeholder', '*Ваш телефон в WhatsApp');
            $('.overlay-models .eml').hide();
        } else if ($(this).hasClass('phn')) {
            $('.overlay-models .inp-enp-ph').attr('placeholder', '*Ваш телефон');
            $('.overlay-models .eml').hide();
        } else if ($(this).hasClass('emli')) {
            $('.overlay-models .inp-enp-ph').attr('placeholder', '*Ваш телефон ');
            $('.overlay-models .eml').fadeIn();
        }

    });
// sidebar
    var $barLevel = 100 / (maxNumber - 1);
    var $barWidth = $barLevel;

    function progress(num) {
        $(".overlay-models .progress-bar__line").css({"width": $barWidth + '%'});
        $('.overlay-models .pc').text(Math.floor($barWidth) + '%');
    }

    progress(0);

    var smt = Number($('.overlay-models .summ-t-js').data('prc'));
    var nextSumm = Math.floor(smt / (maxNumber - 2));
    var nextSumm1 = nextSumm;
    $('.overlay-models .summ-t-js').text(nextSumm);

// btn

    function btnClick() {
        btnPrev.on('click', function (event) {
            event.preventDefault();
            --number;

            $('.overlay-models .test-item').hide();
            $('.overlay-models .test-item').eq(number).fadeIn(1000);
            btnActive(!isValid);

        });


        btnNext.on('click', function (event) {
            event.preventDefault();
            activeSlede[number] = true;
            ++number;

            btnActive(!isValid);

            if (activeSlede[number] === true) {
                btnNext.prop('disabled', false);
                $('.overlay-models .btn-lbs').hide();
            } else {
                btnNext.prop('disabled', true);
                $('.overlay-models .btn-lbs').show();
            }

            if (number === maxNumber - 2) {

                $(".overlay-models .test__quests-progress-text").text('Готово !');
                $(".overlay-models .test-item").hide();
                $(".overlay-models .test-item").eq(number).fadeIn(600);
                $barWidth = 100;
                nextSumm1 = smt;
                $('.overlay-models .summ-t-js').text(nextSumm1);
            } else {
                $(".overlay-models .test-item").hide();
                $(".overlay-models .test-item").eq(number).fadeIn(600);
                $(".overlay-models .test-num-current").text(number + 1);
                $barWidth += $barLevel;
                nextSumm1 += nextSumm;
                $('.overlay-models .summ-t-js').text(nextSumm1);
            }
            progress(number);

            animateTop();
            if ($('.overlay-models .test-item').eq(number).find('input[type="file"]').length > 0) {
                btnActive(false);
                console.log('dsdsd')
            }

        });


    }

    btnClick();

    function animateTop(eq) {
        var elem = $('.overlay-models .test-scroll-js');
        var top = elem.offset().top - 15;
        $('.overlay-models').animate({scrollTop: top}, 400);
    }

    function getFileName() {
        var file = '';
        var files = this.files;
        for (var a = 0; a < files.length; a++) {

            file += files[a].name + ' , ';

        }

        if (file === '') {
            file = "Выберите файл"
        }

        $(this).parents('.file-wrap').find('.file-text').text(file);
        console.log('3232')
        btnActive(false);
    }

    console.log('3232')
    $('.overlay-models input[type="file"]').on('input', getFileName);


    var nForm = false;
    $(function () {
        'use strict';
        var action = $('.ajax-url').val();
        $('.overlay-models form').on('submit', function (e) {
            e.preventDefault();
            var formThis = $(this);
            // === НОВОЕ: даём формам с data-ds-calc="1" работать самим ===
            if (formThis.is('[data-ds-calc="1"]')) {
                return; // не делаем preventDefault, даём сработать JS плагина
            }
            // === конец нового блока ===
            var fd = new FormData(this);
            formThis.find('.btn').attr({
                'disabled': 'true'
            });
            if (formThis.find('input[name="formname"]').val() === "catalog") {
                var link = document.createElement('a');
                link.setAttribute('href', $('.pdf-pdf').val());
                link.setAttribute('target', "_blank");
                link.setAttribute('download', '');

                if (navigator.userAgent.indexOf('Mac') > 0) {
                    window.location = $('.pdf-pdf').val();
                } else {
                    simulate(link, "click");
                }

            } else if (formThis.find('input[name="formname"]').val() === "test") {
                formThis.find('input').attr({
                    'disabled': 'true',
                });
                formThis.find('button').attr({
                    'disabled': 'true',
                });
            } else {
                formThis.find('.btn').removeAttr('disabled');
            }
            $('form').trigger('reset');
            $.ajax({
                url: action,
                type: 'POST',
                contentType: false,
                processData: false,
                data: fd,
                success: function (msg) {
                    window.location.href = $('.thank-url').val();
                    formThis.find('.btn').removeAttr('disabled');
                    $('form').trigger('reset');
                },
            });
        });
    });


}