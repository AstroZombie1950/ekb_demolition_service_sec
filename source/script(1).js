// var lzt = new LazyLoad({
//      elements_selector: '.team-img'

//  });
   function getFileName () {

//       var file = this.value.replace(/\\/g, '/').replace(/.*\//, '');
       var file = '';
	var files = this.files;
	for(var a=0;a<files.length;a++){
		
		file += files[a].name +' , ';
		
	}

      if(file === ''){
        file = "Выберите файл"
      }

      $(this).parents('.file-wrap').find('.file-text').text(file);


  }

  $('input[type="file"]').on('change input', getFileName);





$(document).ready(function ($) {
	
	let clickTimer;

$(".header__menu-mobile.mobile li.menu-item-has-children > a").on("click", function(e) {
    e.preventDefault();
    let $submenu = $(this).next(".sub-menu");
    if ($submenu.is(":visible")) {
        $submenu.slideUp(200);
        $(this).removeClass("active");
    } else {
        $(".header__menu-mobile .sub-menu").slideUp(200);
        $(".header__menu-mobile a").removeClass("active");
        $submenu.slideDown(200);
        $(this).addClass("active");
    }
});
	
  $(".header__menu-btn").on("click", function () {
    $(".header__menu-mobile").fadeIn().addClass("active");
    $("html").addClass("stop");
  });
//  $(".header__menu-mob a").on("click", function () {
//    $(".header__menu-mobile").fadeOut();
//    $("html").removeClass("stop");
//  });
  $(".header__menu-close").on("click", function () {
    $(".header__menu-mobile").fadeOut();
    $("html").removeClass("overflowHidden");
  });

  var offsetTop = $(window).height() * 2;
  $(window).scroll(function (event) {
    if ($(document).scrollTop() > offsetTop) {
      $(".to_top").addClass("act");
    } else {
      $(".to_top").removeClass("act");
    }
  });
  $(".to_top").on("click", function (event) {
    var top = 0;
    $("body,html").animate({ scrollTop: top }, 1000);
  });

  $(".close, .back-close").on("click", function (event) {
    event.preventDefault();
    if ($(this).hasClass("close-nav")) {
//       $(".nav__wrap").removeClass("active");
      $(".nav__wrap").fadeOut();
    }
    $(".card-js").removeClass("zi0");
    $(".arrows").removeClass("zi0");
    if ($(this).hasClass("cln")) {
      $(".mn-right-it-1").show();
      $(".mn-right-it-2").hide();
      $(".mn-right-it-3").hide();
    }

    $(".overlay").fadeOut();
    $("html").removeClass("stop");
  });

  $(".burger__wrap").on("click", function (event) {
    event.preventDefault();
    $(".nav__wrap").addClass("active");
    $(".nav__wrap").fadeIn();
    $(".zi1").css("z-index", "0");
    $(".main").css("z-index", "20");
  });

  $(".overlay")
    .not("#modal-page")
    .mouseup(function (e) {
      var container = $(".modal-wrap");
      if (container.has(e.target).length === 0 && !container.is(e.target)) {
        $("html").removeClass("stop");
        $(".overlay").fadeOut();
        $(".mn-right-it-1").show();
        $(".mn-right-it-2").hide();
        $(".mn-right-it-3").hide();
      }
    });

  // $('.btn-prc-js').on('click', function(event) {
  //   event.preventDefault();
  //   $('html').addClass('stop');
  //   $('#modal-order').fadeIn();
  // });

  
  $(".btn-zamer-js").on("click", function (event) {
    event.preventDefault();
    $("html").addClass("stop");
    $("#modal-viez").fadeIn();
  });
	
	$(".btn-promo-js").on("click", function (event) {
    event.preventDefault();
    $("html").addClass("stop");
    $("#modal-promo").fadeIn();
  });

  $(".btn-price-js").on("click", function (event) {
    event.preventDefault();
    $("html").addClass("stop");
    $("#modal-price").fadeIn();
  });
	
	 $(".btn-call-js").on("click", function (event) {
    event.preventDefault();
    $("html").addClass("stop");
    $("#modal-call").fadeIn();
  });


  // modal-call
  // modal-zamer
  // modal-zakaz

  // tlt-js
  // inp-js

  // 1
  $(".polit-js").on("click", function (event) {
    event.preventDefault();
    $("html").addClass("stop");
    $("#politics").fadeIn();
  });

  $(".link-scroll").on("click", function (event) {
    event.preventDefault();
    var id = $(this).attr("href"),
      top = $(id).offset().top;
    $("body,html").animate({ scrollTop: top }, 1000);
  });

  $(".fancy-class, .play, .gallery__item").fancybox({
    buttons: ["slideShow", "zoom", "fullScreen", "close"],
    animationEffect: "zoom-in-out",
    animationDuration: 600,
    transitionEffect: "circular",
    transitionDuration: 420,
  });

  d = new Date();
  monthA = "января,февраля,марта, апреля, мая, июня, июля, августа, сентября, октября, ноября, декабря".split(
    ","
  );
  // d.setMonth(d.getMonth() + 1);
  $(".date-js").text(" " + d.getDate() + " " + monthA[d.getMonth()]);

  $(".footer-nav a, .contacts-bot__it a").on("click", function (event) {
    if ($(this).attr("href") === "#not") {
      return false;
    } else {
      if ($(this).parents(".nav__wrap").hasClass("active")) {
        if ($(window).width() < 900) {
          $(".nav__wrap").removeClass("active").fadeOut();
          $(".overlay").fadeOut();
          $("html").removeClass("stop");
        }
      }
      var id = $(this).attr("href"),
        top = $(id).offset().top;
      $("body,html").animate({ scrollTop: top }, 1000);
    }
  });

  $(".btn-prices-js-a").on("click", function (event) {
    event.preventDefault();
    var id = $("#pforms").offset().top;
    $("body,html").animate({ scrollTop: id }, 400);
  });

  $(".title, .title-lg , .title-b").not(".title-first").each(anime);
  $(".t-min, .t-ss, .t-min2").not(".title-first").each(anime);
  // $(".title-descr").not('.subtitle-first').each(anime);
  function anime(anim) {
    // var offsetTop = thisTitle.offset().top - $(window).height() - 10;
    var thisTitle = $(this);
    $(window).scroll(function (event) {
      var offsetTop = thisTitle.offset().top - $(window).height() - 40;
      if ($(document).scrollTop() > offsetTop) {
        thisTitle.addClass("fade_in");
      }
    });
  }

  $(".flst1 a").on("click", function (event) {
    var id = $(this).attr("href"),
      top = $(id).offset().top;
    $("body,html").animate({ scrollTop: top }, 600);
  });

  $(".to_catalog").on("click", function (event) {
    event.preventDefault();
    var id = $(".tab").offset().top - 20;
    $("body,html").animate({ scrollTop: id }, 600);
  });

  $(".gtab__tab-item").on("click", function () {
    if ($(window).width() < 767) {
      var elem = $(".garant__right");
      var top = elem.offset().top - 15;
      $("body,html").animate({ scrollTop: top }, 400);
    }
  });

  $(".read").on("click", function (event) {
    event.preventDefault();
    if (!$(this).hasClass("show")) {
      $(this).addClass("show").text("Скрыть");
      $(this).parents(".shtory-right-one").find("li").fadeIn();
    } else {
      $(this).removeClass("show").text("Читать далее");
      $(this)
        .parents(".shtory-right-one")
        .find("li")
        .each(function (index, el) {
          if (index > 2) {
            $(this).hide();
          }
        });
    }
  });


// новые скрипты
$(".gtab__top").on("click", function() {

  if ($(this).hasClass('show')) {
      
      $(".gtab__top").removeClass('show');
      $(".gtab__top").siblings('.gtab__hover').slideUp(500);
  } else {
      $(".gtab__top").removeClass('show');
     $(".gtab__top").siblings('.gtab__hover').slideUp(500);
      var $this = $(this);
      setTimeout(function(){
        $($this).addClass('show');
      },100);
      
      $(this).siblings('.gtab__hover').slideToggle(500);
  }
});

// демонтаж

var acc = document.getElementsByClassName("price-table__tit");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight){
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
  });
}
	
// счетчик стоимости
$(document).ready(function() {
	$('.price-sum__minus').click(function () {
		var $input = $(this).parent().find('.price-sum__num');
		var count = parseInt($input.val()) - 1;
		count = count < 1 ? 0 : count;
		$input.val(count);
		$input.change();

		console.log(count)
		var valPrice = count * parseInt($input.data('price'));
		$(this).parents('.price-table__resrow').find('.price-it-5').text(valPrice);
		summ ();
		if(count < 1){
			$(this).parents('.price-table__resrow').removeClass('active');
		}
		return false;
	});
	$('.price-sum__plus').click(function () {
		var $input = $(this).parent().find('.price-sum__num');
		$input.val(parseInt($input.val()) + 1);
		$input.change();

		var valPrice = (parseInt($input.val())) * parseInt($input.data('price'));
		$(this).parents('.price-table__resrow').find('.price-it-5').text(valPrice);
		
		summ ();
		$(this).parents('.price-table__resrow').addClass('active');
		return false;
	});
	
	$('.price-sum__num').on('change input',function () {
		var $input = $(this);
		var count = parseInt($input.val()) ;
		count = count < 1 ? 0 : count;
		$input.val(count);
		// $input.change();

		var valPrice = count * parseInt($input.data('price'));
		$(this).parents('.price-table__resrow').find('.price-it-5').text(valPrice);
		summ ();
		$(this).parents('.price-table__resrow').addClass('active');
		return false;
	});

	let summs = 0;
	function summ (){
		summs = 0;
		$('.price-it-5').not('.not-js').each(function(index, el) {
			if(parseInt($(this).text()) != 0 && parseInt($(this).text()) != ''){
				summs += parseInt($(this).text());
			}
		});

		let summSkidka = summs * 10 / 100
		$('.summ-js').text(summs);
		$('.skidka').text(summs - summSkidka);
// 		$('.summ-js').text(summs - summSkidka);
// 		$('.skidka').text(summSkidka);
		$('.priceSumm').val(summs - summSkidka);

		// priceName
		let cols = '';
		$('.price-sum__num').each(function(index, el) {
			if(parseInt($(this).val()) != 0 && parseInt($(this).val()) != ''){
				// summs += parseInt($(this).text());
				cols += $(this).parents('.price-table__resrow').find('.prc-name-js').text().trim() + ' - ' + $(this).val() + ' , ';
			}
		});
		$('.priceName').val(cols);
	}
});
	
$(".main-labl-slider__wr").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    // dots: true,
    // dotsClass: 'dots-style',
    prevArrow: $(".btn-pr"),
    nextArrow: $(".btn-xt"),
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
          autoplay: false,
        },
      },

      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          autoplay: false,
        },
      },

      {
        breakpoint: 567,
        settings: {
          slidesToShow: 1,
          autoplay: false,
        },
      },

    ],
    // fade: true
  });

})
if($('body').find('.seob__btn').length > 0){
	$('.seob__btn').on('click', function(event) {
	event.preventDefault();    

	if($(this).hasClass('open')){
	  $(this).parents('.container-big').find('.seob__text').addClass('act');
	  $(this).removeClass('open');
// 	  $('.seob-btn-text').text('РАСКРЫТЬ ПОЛНОСТЬЮ');
	}else{
	  $(this).addClass('open');
// 	  $('.seob-btn-text').text('СКРЫТЬ');
	  
	  var heigtText = $(this).parents('.container-big').find('.seob__text-wrap').outerHeight();

	   $(this).parents('.container-big').find('.seob__text').removeClass('act').removeAttr('style').css({
	   height: heigtText,
	 });


	}

	});
	}
$('.close-calc').on('click', function(event) {
		event.preventDefault();
		$('#modal-calc').fadeOut().removeClass('active');
	});

var slider = document.getElementById("slider_price");
var output = document.getElementById("value_slider");

if(slider) {
	output.innerHTML = slider.value; 
	slider.oninput = function() {
    output.innerHTML = this.value + ' м.п.';
}
}

document.addEventListener("DOMContentLoaded", (event) => {
 const valueForm = document.querySelector("#value");
const inputForm = document.querySelector("#pi_input");
if(inputForm) {
valueForm.textContent = inputForm.value;
inputForm.addEventListener("input", (event) => {
  valueForm.textContent = event.target.value;
});
}
	
let inputNumberForm = document.querySelectorAll('.list_razmery_form input[type="number"]');
if(inputNumberForm) {
inputNumberForm.forEach(function(item) {
item.addEventListener('input', () => {
  if (item.value < 0) item.value = 0;
});
});
}
});
document.addEventListener('DOMContentLoaded', function () {
  // Только на мобильных
  if (window.innerWidth <= 991) {
    const nav = document.querySelector('.nav'); // это ul.nav.t17

    if (nav) {
      nav.addEventListener('click', function (e) {
        const target = e.target;

        // Если клик по ссылке внутри .menu-item-has-children
        if (target.closest('.menu-item-has-children > a')) {
          const parentLi = target.closest('.menu-item-has-children');

          if (parentLi) {
            e.preventDefault(); // блокируем переход
            parentLi.classList.toggle('open');
          }
        }
      });
    }
  }
});

document.addEventListener('DOMContentLoaded', function () {
  const menuItems = document.querySelectorAll('.menu-item-has-children');

  menuItems.forEach(function (item) {
    const link = item.querySelector('a');

    link.addEventListener('click', function (e) {
      e.preventDefault();

      if (item.classList.contains('open')) {
        item.classList.remove('open');
      } else {
        // Закрыть все
        document.querySelectorAll('.menu-item-has-children').forEach(el => el.classList.remove('open'));
        item.classList.add('open');
      }
    });
  });

  $('.numericPlus').on('click', function() {
    let input = $(this).closest('.faetNumericInputWrp').find('input[type="number"]');
    //let currentValue = parseFloat(input.val()) || 0;
    let currentValue = input.val() === '' ? 0 : parseFloat(input.val()); // текущее значение инпута, по умолчанию 0
    let step = parseFloat(input.attr('step')) || 1; // считываем значение step, по умолчанию 1
    let max = parseFloat(input.attr('max')) || Infinity; // считываем значение max, по умолчанию Infinity (неограничено)
    let newValue;

    if (currentValue % step === 0) {
      newValue = currentValue + step;
    } else {
      newValue = Math.ceil(currentValue / step) * step;
    }

    if (newValue <= max) {
      input.val(newValue.toFixed(1)).trigger('input');
    }
  });

  $('.numericMinus').on('click', function() {
    let input = $(this).closest('.faetNumericInputWrp').find('input[type="number"]');
    //let currentValue = parseFloat(input.val()) || 0; // текущее значение инпута, по умолчанию 0
    let currentValue = input.val() === '' ? 0 : parseFloat(input.val()); // текущее значение инпута, по умолчанию 0
    let step = parseFloat(input.attr('step')) || 1; // считываем значение step, по умолчанию 1
    let min = parseFloat(input.attr('min')) || 0; // считываем значение min, по умолчанию 0
    let newValue;

    if (currentValue % step === 0) {
      newValue = currentValue - step;
    } else {
      newValue = Math.floor(currentValue / step) * step;
    }

    // Проверяем, чтобы новое значение не было меньше min
    if (newValue >= min) {
      input.val(newValue.toFixed(1)).trigger('input'); // устанавливаем новое значение, округленное до 1 знака после запятой
    }
  })

  /* f@eToN's custom select */
    // Динамическая генерация кастомного селекта
    $('.faet-custom-select').each(function() {
      // Находим скрытый select
      var $select = $(this).find('select');
      // Добавляем скрытый класс и скрываем select
      $select.addClass('faet-hidden-select').hide();
      // Создаем контейнер для опций
      var $optionsContainer = $('<div class="faet-custom-options"></div>');
      // Перебираем все option и создаем div для каждой опции
      $select.find('option').each(function() {
        var $option = $(this);
        var value = $option.val();
        var text = $option.text();
        // Создаем div для каждой опции
        var $optionDiv = $('<div class="faet-custom-option"></div>')
        .text(text)
        .attr('data-value', value);
        // Добавляем созданный div в контейнер
        $optionsContainer.append($optionDiv);
      });
      // Добавляем контейнер с опциями в .faet-custom-select
      $(this).append($optionsContainer);
    });

    $(document).on('click', '.faet-custom-select-trigger', function() { // Показываем или скрываем меню
      $(this).closest('.faet-custom-select').find('.faet-custom-options').toggle();
      console.log('clicked');
    }).on('click', '.faet-custom-option', function(){ // Обработка выбора опции
      var value = $(this).data('value');
      var text = $(this).text();
      // Устанавливаем выбранное значение в триггер
      $(this).closest('.faet-custom-select').find('.faet-custom-select-trigger').text(text);
      // Устанавливаем значение для скрытого select
      $(this).closest('.faet-custom-select').find('.faet-hidden-select').val(value);
      // Скрываем меню после выбора
      $(this).closest('.faet-custom-select').find('.faet-custom-options').hide();
    });

  // Закрытие меню при клике вне его
  $(document).click(function(e) {
    if (!$(e.target).closest('.faet-custom-select').length) {
      $('.faet-custom-options').hide();
    }
  });

});

setTimeout(function() {
  $(document).find('.faet-custom-options').each(function() {
    $(this).find('.faet-custom-option').first().click();
  })
}, 500);
  
// ===== До/После в секции mini seo (без растягивания) =====
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-ba]').forEach((box) => {
    const range  = box.querySelector('[data-ba-range]');
    const root   = box.querySelector('.ba-compare') || box; // на всякий
    if (!range || !root) return;

    function setPos(val) {
      let v = parseFloat(val);
      if (isNaN(v)) v = 50;
      v = Math.max(0, Math.min(100, v));
      root.style.setProperty('--pos', v + '%');
    }

    // старт
    setPos(range.value || 50);

    // drag range
    range.addEventListener('input', () => setPos(range.value));
    range.addEventListener('change', () => setPos(range.value));

    // чтобы клик по области тоже двигал (удобно)
    const moveByClientX = (clientX) => {
      const rect = root.getBoundingClientRect();
      const x = clientX - rect.left;
      const p = (x / rect.width) * 100;
      range.value = Math.max(0, Math.min(100, p));
      setPos(range.value);
    };

    root.addEventListener('pointerdown', (e) => {
      // range всё равно сверху, но на некоторых браузерах так стабильнее
      moveByClientX(e.clientX);
    });

    root.addEventListener('pointermove', (e) => {
      if (e.buttons !== 1) return;
      moveByClientX(e.clientX);
    });
  });
});






