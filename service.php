<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/include/sheets.php';

// получаем slug из rewrite-параметра
$slug = trim($_GET['slug'] ?? '', '/');

// базовая защита — только буквы, цифры, дефис, подчёркивание
if (!preg_match('/^[a-z0-9_-]+$/', $slug)) {
	http_response_code(404);
	include $_SERVER['DOCUMENT_ROOT'] . '/404.php';
	exit;
}

$s = getServiceBySlug($slug);

if ($s === null) {
	http_response_code(404);
	include $_SERVER['DOCUMENT_ROOT'] . '/404.php';
	exit;
}

/**
 * Возвращает значение переменной или 'empty' если пусто.
 */
function v(array $s, string $key): string {
	$val = trim($s[$key] ?? '');
	return $val !== '' ? $val : 'empty';
}

/**
 * Рендерит блок FAQ-пары. Возвращает HTML или пустую строку если вопрос пуст.
 */
function faqItem(array $s, int $n, string $firstClass = ''): string {
	$q = trim($s["VAR_qst_{$n}"] ?? '');
	$a = trim($s["VAR_ans_{$n}"] ?? '');
	if ($q === '') return '';

	$topClass = 'gtab__top' . ($firstClass ? " {$firstClass}" : '');
	$style    = $firstClass ? '' : ' style="display: none;"';

	return "
		<div class=\"gtab__item\">
			<div class=\"{$topClass}\">
				<div class=\"t24 fwb\">{$q}</div>
				<div class=\"gtab__plus t24 fwb col-center\">+</div>
			</div>
			<div class=\"gtab__hover gray t16\"{$style}>{$a}</div>
		</div>";
}

/**
 * Рендерит список из строки разделённой ";".
 */
function listItems(string $raw): string {
	if (trim($raw) === '' || trim($raw) === 'empty' || trim($raw) === 'n') return '';
	$items = array_filter(array_map('trim', explode(';', $raw)));
	return implode('', array_map(fn($i) => "<li class=\"ba-item\">{$i}</li>", $items));
}

/**
 * Рендерит абзацы из строки разделённой ";".
 */
function paragraphs(string $raw): string {
	if (trim($raw) === '' || trim($raw) === 'empty') return '';
	$parts = array_filter(array_map('trim', explode(';', $raw)));
	return implode('', array_map(fn($p) => "<p>{$p}</p>", $parts));
}

?>
<!DOCTYPE html>
<html lang="ru">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title><?= htmlspecialchars(v($s, 'VAR_title')) ?></title>
	<meta name="description" content="<?= htmlspecialchars(v($s, 'VAR_description')) ?>">
	<meta name="keywords"    content="<?= htmlspecialchars(v($s, 'VAR_keywords')) ?>">
	<meta name="author"      content="Демонтаж Екатеринбург">
	<link rel="canonical"    href="https://demontage24.ru/<?= htmlspecialchars($slug) ?>">
	<meta name="robots" content="index, follow">
	<link rel="icon" type="image" href="/favicon.ico">
	<link rel="stylesheet" href="/css/style.css" type="text/css" media="all">
	<link rel="stylesheet" href="/css/new.css" type="text/css" media="all">
	<link rel="stylesheet" href="/css/custom.css" type="text/css" media="all">
	<link rel="stylesheet" href="/css/portfolio_slider.css" type="text/css" media="all">
	<link rel="stylesheet" href="/css/modal_window.css" type="text/css" media="all">
	<link rel="stylesheet" href="/css/service_page.css" type="text/css" media="all">
	<script src="/js/jquery-3.3.1.min.js"></script>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css"/>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css"/>
</head>
<body>

<div class="main" id="main">
	<?php include $_SERVER['DOCUMENT_ROOT'] . '/include/header.php'; ?>

	<!-- hero -->
	<div class="main-block rel complex">
		<div class="container rel">
			<div class="main__cont rel">
				<h1 class="title-lg fw7 mb title-first"><?= v($s, 'VAR_h1') ?></h1>
				<ul class="list mb">
					<li class="list__item row-vcenter">
						<div class="icon-list"><img src="/img/ok_icon.svg" alt=""></div>
						<div class="t24"><span class="fwb">Выезд мастера</span> и <span class="fwb">составление сметы</span> бесплатно</div>
					</li>
					<li class="list__item row-vcenter">
						<div class="icon-list"><img src="/img/ok_icon.svg" alt=""></div>
						<div class="t24"><span class="fwb">Без выходных</span> и праздников с 9:00 до 21:00</div>
					</li>
				</ul>
				<?php include $_SERVER['DOCUMENT_ROOT'] . '/include/form_1click_and_adv.html'; ?>
			</div>
		</div>
	</div>
</div>

<!-- основной раздел -->
<div class="portfolio-page">
	<div class="portfolio-page__container">

		<!-- хлебные крошки -->
		<div class="portfolio-page__breadcrumbs">
			<a href="/">Главная</a>
			<span class="portfolio-page__separator">→</span>
			<span><?= htmlspecialchars(v($s, 'VAR_breadcrumb')) ?></span>
		</div>

		<!-- информационный блок -->
		<section class="ba-block">
			<div class="container">
				<h2 class="t30 fw7 ba-h2"><?= v($s, 'VAR_h2') ?></h2>
				<div class="ba-grid">
					<div class="ba-text t16">
						<?= paragraphs(v($s, 'VAR_SEO_text_1')) ?>
					</div>
					<?php $listHtml = listItems(v($s, 'VAR_SEO_text_1_list')); ?>
					<?php if ($listHtml): ?>
					<div>
						<ul class="ba-list t16"><?= $listHtml ?></ul>
					</div>
					<?php endif; ?>
				</div>
			</div>
		</section>

		<!-- калькулятор -->
		<?php include $_SERVER['DOCUMENT_ROOT'] . '/include/calc.html'; ?>

		<!-- таблица цен -->
		<?php if (trim($s['VAR_full_price_table'] ?? '') !== ''): ?>
		<section class="service-budget ba-block">
			<?= $s['VAR_full_price_table'] ?>
		</section>
		<?php endif; ?>

		<!-- SEO блоки -->
		<div class="services-top mb">
			<div class="t16 tac services-top__item">
				<img class="lazyloaded" src="<?= htmlspecialchars(v($s, 'VAR_seo_img')) ?>" alt="<?= htmlspecialchars(v($s, 'VAR_h3')) ?>">
				<section class="seo-text">
					<h3><?= v($s, 'VAR_h3') ?></h3>
					<?= paragraphs(v($s, 'VAR_SEO_text_2')) ?>
				</section>
			</div>
			<div class="t16 tac services-top__item">
				<section class="seo-text">
					<h4><?= v($s, 'VAR_h4') ?></h4>
					<?= paragraphs(v($s, 'VAR_SEO_text_3')) ?>
				</section>
			</div>
		</div>

	</div>
</div>

<!-- форма WhatsApp -->
<?php include $_SERVER['DOCUMENT_ROOT'] . '/include/receive_prices_wa.html'; ?>
<!-- портфолио -->
<?php include $_SERVER['DOCUMENT_ROOT'] . '/include/portfolio_full.html'; ?>
<!-- соседи + 6 шагов -->
<?php include $_SERVER['DOCUMENT_ROOT'] . '/include/neighbor_steps.html'; ?>

<!-- FAQ -->
<?php
$leftFaq  = '';
$rightFaq = '';
for ($i = 1; $i <= 3; $i++) {
	$leftFaq  .= faqItem($s, $i, $i === 1 ? 'show' : '');
}
for ($i = 4; $i <= 6; $i++) {
	$rightFaq .= faqItem($s, $i, $i === 4 ? 'show' : '');
}
$hasFaq = $leftFaq !== '' || $rightFaq !== '';
?>
<?php if ($hasFaq): ?>
<div class="section faq rel">
	<div class="container">
		<h2 class="title fw3 tac mlg fade_in"><span class="fwb">Часто задаваемые вопросы</span> наших клиентов</h2>
		<div class="container">
			<div class="gtab">
				<div class="gtab__tab-cont">
					<?php if ($leftFaq): ?>
					<div class="gtab__tab-left"><?= $leftFaq ?></div>
					<?php endif; ?>
					<?php if ($rightFaq): ?>
					<div class="gtab__tab-right"><?= $rightFaq ?></div>
					<?php endif; ?>
				</div>
			</div>
		</div>
	</div>
</div>
<?php endif; ?>

<!-- CTA -->
<?php include $_SERVER['DOCUMENT_ROOT'] . '/include/reviews_port_cta_block.html'; ?>
<!-- footer -->
<?php include $_SERVER['DOCUMENT_ROOT'] . '/include/footer.html'; ?>

<!-- прокрутка вверх -->
<div class="to_top act"></div>

<!-- мобильные кнопки -->
<div class="header__contacts">
	<div class="header__seti">
		<a href="https://wa.me/73435551100?text=Здравствуйте!%20Интересует%20демонтаж%20в%20Екатеринбурге." target="_blank" class="contact-btn" style="background-color:#30cb0d">
			<img src="/img/icons/wa_mobile.svg" alt="" class="lazyloaded">
		</a>
		<a href="tel:+73435551100" class="header__phone mobile">
			<img src="/img/icons/phone_mobile.svg" alt="" class="lazyloaded">
		</a>
	</div>
</div>

<!-- модальное окно -->
<div class="dm-overlay" id="dmModal">
	<div class="dm-modal">
		<button class="dm-close" id="dmClose">×</button>
		<div class="dm-head">
			<h2 class="dm-title">Бесплатно рассчитаем стоимость демонтажа</h2>
			<p class="dm-subtitle">Оставьте телефон — специалист свяжется с вами и подробно проконсультирует</p>
		</div>
		<form id="dmForm" class="dm-form">
			<input type="tel" name="phone" required placeholder="+7 (___) ___-__-__" class="dm-input" id="dmPhone">
			<button type="submit" class="dm-btn">Получить консультацию</button>
			<div class="dm-success" style="display:none;">Спасибо! Мы перезвоним вам в ближайшее время.</div>
		</form>
		<div class="dm-benefits">
			<div class="dm-benefit">✔ Работаем по Екатеринбургу и области</div>
			<div class="dm-benefit">✔ Без скрытых платежей</div>
			<div class="dm-benefit">✔ Выезд возможен сегодня</div>
		</div>
		<div class="dm-call">
			<div class="dm-call-text">Нужно срочно?</div>
			<a href="tel:+73435551100" class="dm-call-btn">Позвонить сейчас</a>
		</div>
	</div>
</div>

<script src="/js/modal_window.js"></script>
<script src="/js/quiz.js"></script>
<script src="/js/send_mail_portfolio.js"></script>
<script src="/js/script_add.js"></script>
<script src="/js/jquery.maskedinput.js"></script>
<script src="/js/portfolio_sort.js"></script>
<script src="/js/jquery.fancybox.min.js"></script>
<script src="/js/count_price.js"></script>
<script src="/js/form_contact.js"></script>
<script src="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script>
<script>
$('.portfolio-track').slick({
	slidesToShow: 1,
	slidesToScroll: 1,
	arrows: true,
	dots: true,
	speed: 600,
	adaptiveHeight: true,
	prevArrow: $('.prev'),
	nextArrow: $('.next')
});
$(document).on('click', '.portfolio-thumb', function() {
	var newSrc = $(this).attr('src');
	var slide  = $(this).closest('.portfolio-slide');
	slide.find('.portfolio-main__img').attr('src', newSrc);
	slide.find('.portfolio-thumb').removeClass('active');
	$(this).addClass('active');
});
</script>
<script src="/js/sticky_menu.js"></script>

</body>
</html>