if ($("body").find(".all").length > 0) {
  $(".all-filtes__item").on("click", function (event) {
    event.preventDefault();
    if (!$(this).hasClass("active")) {
      $(".all-filtes__item").removeClass("active");
      $(this).addClass("active");
      t1 = $(this).text().trim();
      //         console.log(t1)
      itemFilter3(1, 12);
      //        $('.all__btn').removeClass('show1').find('.t16').text('Показать ещё');
    }
  });
  var t1 = $(".all-filtes__item.active").text().trim();
  var ns = 1;
  function itemFilter3(num, num2) {
    dataTab3(num2);
    // console.log(1)
  }
  function dataTab3(num2) {
    ns = 1;
    // console.log(1)
    $(".all-gal__item").each(function (index, el) {
      var tlt2 = $(this).data("order");
      console.log(t1);
      console.log(tlt2);
      if (tlt2.toLowerCase().indexOf(t1.toLowerCase()) !== -1) {
        if (ns > num2) {
          $(this).hide();
        } else {
          $(this).fadeIn();
        }
        ++ns;
      } else {
        $(this).hide();
      }
    });
  }
}
$(".portfolio-slider__item").each(function (index, el) {
  $(this)
    .find(".portfolio-gal__item")
    .attr("data-fancybox", "er" + index);
});
