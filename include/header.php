<?php
// получаем данные меню
if (!function_exists('getServicesData')) {
	require_once $_SERVER['DOCUMENT_ROOT'] . '/include/sheets.php';
}
$services = getServicesData();

$grouped = [];
foreach ($services as $_menuSlug => $_menuService) {
    $cat    = trim($_menuService['VAR_category']     ?? '');
    $subcat = trim($_menuService['VAR_sub_category'] ?? '');
    $label  = trim($_menuService['VAR_breadcrumb']   ?? $_menuSlug);
    if ($cat === '') continue;
    if ($subcat === '') $subcat = $cat;
    $grouped[$cat][$subcat][] = ['slug' => $_menuSlug, 'label' => $label];
}
?>

<!-- Яндекс.Метрика -->
<script type="text/javascript">
(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
m[i].l=1*new Date();for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}
k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
(window,document,'script','https://mc.yandex.ru/metrika/tag.js?id=107147479','ym');
ym(107147479,'init',{ssr:true,webvisor:true,clickmap:true,ecommerce:"dataLayer",accurateTrackBounce:true,trackLinks:true});
</script>
<noscript><div><img src="https://mc.yandex.ru/watch/107147479" style="position:absolute;left:-9999px;" alt=""/></div></noscript>

<style>
/* ===== НОВОЕ МЕНЮ ===== */

/* десктопная шапка — скрываем на мобиле */
@media (max-width: 900px) { .header { display: none !important; } }

/* навбар */
.dmnt-bar { position: absolute; top: 110px; left: 0; width: 100%; z-index: 500; }
.dmnt-bar.is-sticky { position: fixed; top: 0; }
.dmnt-bar__inner {
	max-width: 90rem; margin: 0 auto; padding: 0 2rem;
	display: flex; align-items: center; justify-content: center;
	background: #fff; border-radius: 1rem;
	box-shadow: 0 0 120px rgba(40,40,40,0.1); min-height: 56px;
}

/* десктопная навигация */
.dmnt-nav { display: flex; align-items: center; list-style: none; margin: 0; padding: 0; }
.dmnt-nav a, .dmnt-nav button {
	display: block; padding: 1rem 0.9rem; color: #282828;
	font-size: 0.87rem; font-weight: 500; text-decoration: none;
	background: none; border: none; cursor: pointer; white-space: nowrap;
	font-family: inherit; transition: color 0.2s;
}
.dmnt-nav a:hover, .dmnt-nav button:hover, .dmnt-nav button.is-open { color: #61ce70; }
.dmnt-nav__arr { font-size: 0.65rem; transition: transform 0.2s; display: inline-block; }
.dmnt-nav button.is-open .dmnt-nav__arr { transform: rotate(180deg); }

/* бургер */
.dmnt-burger { display: none; flex-direction: column; justify-content: center; gap: 5px; width: 40px; height: 40px; background: none; border: none; cursor: pointer; padding: 8px; flex-shrink: 0; }
.dmnt-burger span { display: block; width: 100%; height: 2px; background: #282828; border-radius: 2px; }

/* мегаменю */
.dmnt-mega { display: none; position: fixed; top: 170px; left: 0; width: 100%; background: #fff; box-shadow: 0 8px 40px rgba(0,0,0,0.12); z-index: 499; }
.dmnt-mega.is-open { display: flex; }
.dmnt-bar.is-sticky ~ .dmnt-mega { top: 56px; }
.dmnt-mega__col { flex: 1; padding: 1rem; border-right: 1px solid #f0f0f0; overflow-y: auto; max-height: calc(100vh - 76px); }
.dmnt-mega__col:last-child { border-right: none; }
.dmnt-mega__col-title { font-size: 0.75rem; color: #aaa; padding: 0.5rem 0.7rem; text-transform: uppercase; letter-spacing: 0.05em; }
.dmnt-mega__btn { display: block; width: 100%; padding: 0.65rem 0.8rem; text-align: left; background: none; border: none; border-radius: 0.4rem; font-size: 0.85rem; font-weight: 500; color: #282828; cursor: pointer; font-family: inherit; transition: background 0.15s, color 0.15s; }
.dmnt-mega__btn:hover, .dmnt-mega__btn.is-active { background: #f5fdf6; color: #3bb751; }
.dmnt-mega__link { display: block; padding: 0.55rem 0.8rem; font-size: 0.83rem; color: #282828; text-decoration: none; border-radius: 0.4rem; transition: background 0.15s, color 0.15s; }
.dmnt-mega__link:hover { background: #f5fdf6; color: #3bb751; }
.dmnt-mega__hint { color: #bbb; font-size: 0.82rem; padding: 1rem 0.8rem; }

/* дропдаун */
.dmnt-drop-wrap { position: relative; }
.dmnt-drop { display: none; position: absolute; top: 100%; left: 50%; transform: translateX(-50%); background: #fff; box-shadow: 0 8px 30px rgba(0,0,0,0.12); border-radius: 0.7rem; padding: 0.4rem; min-width: 150px; z-index: 499; }
.dmnt-drop.is-open { display: block; }
.dmnt-drop a { display: block; padding: 0.6rem 1rem; color: #282828; font-size: 0.85rem; text-decoration: none; border-radius: 0.4rem; transition: background 0.15s, color 0.15s; }
.dmnt-drop a:hover { background: #f5fdf6; color: #3bb751; }

/* оверлей */
.dmnt-overlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.35); z-index: 498; }
.dmnt-overlay.is-open { display: block; }

/* мобильное меню */
.dmnt-mob { display: none; position: fixed; inset: 0; background: #fff; z-index: 600; flex-direction: column; overflow: hidden; }
.dmnt-mob.is-open { display: flex; }
.dmnt-mob__head { display: flex; align-items: center; justify-content: space-between; padding: 1rem 1.2rem; border-bottom: 1px solid #f0f0f0; flex-shrink: 0; }
.dmnt-mob__phone-label { font-size: 0.72rem; color: #61ce70; margin-bottom: 2px; }
.dmnt-mob__phone { font-size: 1.1rem; font-weight: bold; color: #282828; text-decoration: none; display: block; }
.dmnt-mob__close { background: none; border: none; font-size: 1.4rem; cursor: pointer; color: #282828; padding: 0.4rem; }
.dmnt-mob__body { flex: 1; overflow-y: auto; }
.dmnt-mob__list { list-style: none; margin: 0; padding: 0; }
.dmnt-mob__list a { display: block; padding: 0.85rem 1.2rem; color: #282828; font-size: 0.95rem; font-weight: 500; text-decoration: none; border-bottom: 1px solid #f5f5f5; }
.dmnt-mob__list a:hover { color: #61ce70; }
.dmnt-mob__acc-btn, .dmnt-mob__cat-btn, .dmnt-mob__sub-btn { display: flex; justify-content: space-between; align-items: center; width: 100%; padding: 0.85rem 1.2rem; background: none; border: none; border-bottom: 1px solid #f5f5f5; font-size: 0.95rem; font-weight: 500; color: #282828; cursor: pointer; text-align: left; font-family: inherit; }
.dmnt-mob__cat-btn { padding-left: 1.8rem; font-size: 0.9rem; background: #fafafa; }
.dmnt-mob__sub-btn { padding-left: 2.4rem; font-size: 0.87rem; background: #f5f5f5; }
.dmnt-mob__acc-arr { font-size: 0.65rem; transition: transform 0.2s; flex-shrink: 0; }
.dmnt-mob__acc-btn.is-open .dmnt-mob__acc-arr,
.dmnt-mob__cat-btn.is-open .dmnt-mob__acc-arr,
.dmnt-mob__sub-btn.is-open .dmnt-mob__acc-arr { transform: rotate(180deg); }
.dmnt-mob__acc-body, .dmnt-mob__cat-body, .dmnt-mob__sub-body { display: none; }
.dmnt-mob__svc-link { display: block; padding: 0.6rem 1.2rem 0.6rem 3rem; color: #555; font-size: 0.87rem; text-decoration: none; border-bottom: 1px solid #f5f5f5; }
.dmnt-mob__svc-link:hover { color: #61ce70; }
.dmnt-mob__cta { display: block; margin: 1.2rem; padding: 0.9rem 1rem; background: #fbd542; border-radius: 2rem; text-align: center; color: #282828; font-weight: bold; text-decoration: none; font-size: 0.9rem; }

/* адаптив */
@media (max-width: 900px) {
	.dmnt-nav { display: none; }
	.dmnt-burger { display: flex; }
	.dmnt-bar { top: 0; position: fixed; }
	.dmnt-bar__inner { border-radius: 0; box-shadow: 0 2px 10px rgba(0,0,0,0.08); justify-content: space-between; padding: 0 1rem; }
	#dmntMobLogo { display: block !important; }
	body { padding-top: 56px; }
	.dmnt-mob__acc-btn { font-size: 16px; padding: 14px 16px; }
	.dmnt-mob__cat-btn { font-size: 15px; padding: 13px 16px 13px 24px; background: #fafafa; }
	.dmnt-mob__sub-btn { font-size: 14px; padding: 12px 16px 12px 32px; background: #f5f5f5; }
	.dmnt-mob__svc-link { font-size: 14px; padding: 11px 16px 11px 40px; }
	.dmnt-mob__list a { font-size: 16px; padding: 14px 16px; }
}
</style>

<!-- ДЕСКТОПНАЯ ШАПКА -->
<header class="header">
	<div class="container-big header__cont">
		<div class="logo">
			<div class="logo__block">
				<a href="/" class="logo__img"><img src="/img/logo.png" alt=""></a>
				<div class="logo__desc t14">Услуги по <span class="fwb">демонтажным <br>работам и утилизации <br>мусора</span> в Екатеринбурге</div>
			</div>
		</div>
		<div class="items yans mrs">
			<div class="items-img mrm yan"><img src="/img/yandex_logo.png" alt=""></div>
			<div class="items-txts">
				<div class="t14 fwb mbm2">Средний рейтинг 4,8</div>
				<div class="stars"></div>
				<div class="t12 ya mbm2">"Быстро и вовремя выполнили..."</div>
				<div class="t14">Последний отзыв 01.02.2025</div>
			</div>
		</div>
		<div class="items zam mrs">
			<div class="items-img mr edit_ico"><img src="/img/zam.svg" alt=""></div>
			<a href="#" class="fwb dark t14 open-modal"><span class="sh">Бесплатно заказать <br>выезд замерщика</span></a>
		</div>
		<div class="ques mrs">
			<div class="t13 mbm">Есть вопрос? Задайте напрямую <span class="fwb">в Telegram</span></div>
			<div class="items">
				<div class="t13 mr">Среднее время <br>ответа <span class="fwb">23 секунды</span></div>
				<a href="https://t.me/" rel="nofollow" class="t13 fwb dark header-wa"><img src="/img/telegram_logo.png" alt="">Написать</a>
			</div>
		</div>
		<div class="block-i">
			<div class="block-i-img mr rel pre">
				<div class="green-cr"></div>
				<img src="/img/worker.png" alt="">
			</div>
			<div class="block-i-text">
				<div class="t12 green mbm2">Прием заявок ежедневно с 9:00-21:00</div>
				<a href="tel:+73435551100" class="t24 dark fwb text-lin">+7 (343) 555-11-00</a>
			</div>
		</div>
	</div>
</header>

<!-- НАВБАР -->
<div class="dmnt-bar" id="dmntBar">
	<div class="dmnt-bar__inner">
		<a href="/" id="dmntMobLogo" style="display:none">
			<img src="/img/logo.png" alt="" style="height:36px;">
		</a>
		<ul class="dmnt-nav" id="dmntNav">
			<li><a href="/">Главная</a></li>
			<li><button id="dmntServicesBtn">Наши услуги <span class="dmnt-nav__arr">▾</span></button></li>
			<li><a href="/portfolio">Портфолио</a></li>
			<li><a href="/reviews">Отзывы</a></li>
			<li><a href="/faq">FAQ</a></li>
			<li class="dmnt-drop-wrap">
				<button id="dmntAboutBtn">О компании <span class="dmnt-nav__arr">▾</span></button>
				<div class="dmnt-drop" id="dmntAboutDrop">
					<a href="/about">О нас</a>
					<a href="/about/requisites">Реквизиты</a>
					<a href="/contacts">Контакты</a>
				</div>
			</li>
			<li><a href="/partners">Партнерам</a></li>
		</ul>
		<button class="dmnt-burger" id="dmntBurger" aria-label="Меню">
			<span></span><span></span><span></span>
		</button>
	</div>
</div>

<!-- МЕГАМЕНЮ -->
<div class="dmnt-mega" id="dmntMega">
	<div class="dmnt-mega__col" id="dmntCats"><div class="dmnt-mega__col-title">Категории</div></div>
	<div class="dmnt-mega__col" id="dmntSubcats"><div class="dmnt-mega__hint">← Выберите категорию</div></div>
	<div class="dmnt-mega__col" id="dmntSvcs"><div class="dmnt-mega__hint">← Выберите подкатегорию</div></div>
</div>

<div class="dmnt-overlay" id="dmntOverlay"></div>

<!-- МОБИЛЬНОЕ МЕНЮ -->
<div class="dmnt-mob" id="dmntMob">
	<div class="dmnt-mob__head">
		<div>
			<div class="dmnt-mob__phone-label">Прием заявок ежедневно с 9:00-21:00</div>
			<a href="tel:+73435551100" class="dmnt-mob__phone">+7 (343) 555-11-00</a>
		</div>
		<button class="dmnt-mob__close" id="dmntMobClose">✕</button>
	</div>
	<div class="dmnt-mob__body">
		<ul class="dmnt-mob__list">
			<li><a href="/">Главная</a></li>
			<li>
				<button class="dmnt-mob__acc-btn">Наши услуги <span class="dmnt-mob__acc-arr">▾</span></button>
				<div class="dmnt-mob__acc-body">
					<?php foreach ($grouped as $cat => $subcats): ?>
					<div>
						<button class="dmnt-mob__cat-btn"><?= htmlspecialchars($cat) ?> <span class="dmnt-mob__acc-arr">▾</span></button>
						<div class="dmnt-mob__cat-body">
							<?php foreach ($subcats as $subcat => $items): ?>
							<div>
								<button class="dmnt-mob__sub-btn"><?= htmlspecialchars($subcat) ?> <span class="dmnt-mob__acc-arr">▾</span></button>
								<div class="dmnt-mob__sub-body">
									<?php foreach ($items as $item): ?>
									<a href="/<?= htmlspecialchars($item['slug']) ?>" class="dmnt-mob__svc-link"><?= htmlspecialchars($item['label']) ?></a>
									<?php endforeach; ?>
								</div>
							</div>
							<?php endforeach; ?>
						</div>
					</div>
					<?php endforeach; ?>
				</div>
			</li>
			<li><a href="/portfolio">Портфолио</a></li>
			<li><a href="/reviews">Отзывы</a></li>
			<li><a href="/faq">FAQ</a></li>
			<li>
				<button class="dmnt-mob__acc-btn">О компании <span class="dmnt-mob__acc-arr">▾</span></button>
				<div class="dmnt-mob__acc-body">
					<a href="/about" class="dmnt-mob__svc-link">О нас</a>
					<a href="/about/requisites" class="dmnt-mob__svc-link">Реквизиты</a>
					<a href="/contacts" class="dmnt-mob__svc-link">Контакты</a>
				</div>
			</li>
			<li><a href="/partners">Партнерам</a></li>
		</ul>
		<a href="#" class="dmnt-mob__cta btn-zamer-js">Бесплатно заказать выезд замерщика</a>
	</div>
</div>

<script>
window.DMNT_MENU = <?php
	$md = [];
		foreach ($grouped as $cat => $_menuSubcats) {
			$c = ['name' => $cat, 'subs' => []];
			foreach ($_menuSubcats as $sub => $_menuItems) {
				$_menuSub = ['name' => $sub, 'items' => []];
				foreach ($_menuItems as $_menuItem) {
					$_menuSub['items'][] = ['slug' => $_menuItem['slug'], 'label' => $_menuItem['label']];
				}
				$c['subs'][] = $_menuSub;
			}
			$md[] = $c;
		}
	echo json_encode($md, JSON_UNESCAPED_UNICODE);
?>;

(function() {
	var bar      = document.getElementById('dmntBar');
	var burger   = document.getElementById('dmntBurger');
	var mob      = document.getElementById('dmntMob');
	var mobClose = document.getElementById('dmntMobClose');
	var overlay  = document.getElementById('dmntOverlay');
	var svcBtn   = document.getElementById('dmntServicesBtn');
	var mega     = document.getElementById('dmntMega');
	var catsCol  = document.getElementById('dmntCats');
	var subsCol  = document.getElementById('dmntSubcats');
	var svcsCol  = document.getElementById('dmntSvcs');
	var abtBtn   = document.getElementById('dmntAboutBtn');
	var abtDrop  = document.getElementById('dmntAboutDrop');
	var mobLogo  = document.getElementById('dmntMobLogo');
	var data     = window.DMNT_MENU || [];

	/* sticky */
	window.addEventListener('scroll', function() {
		if (window.scrollY > 110) {
			bar.classList.add('is-sticky');
			if (window.innerWidth > 900 && mobLogo) mobLogo.style.display = 'block';
		} else {
			bar.classList.remove('is-sticky');
			if (window.innerWidth > 900 && mobLogo) mobLogo.style.display = 'none';
		}
	}, {passive: true});

	/* рендер */
	function renderCats() {
		catsCol.innerHTML = '<div class="dmnt-mega__col-title">Категории</div>';
		data.forEach(function(cat, ci) {
			var btn = document.createElement('button');
			btn.className = 'dmnt-mega__btn';
			btn.textContent = cat.name;
			btn.onclick = function() {
				catsCol.querySelectorAll('.dmnt-mega__btn').forEach(function(b) { b.classList.remove('is-active'); });
				btn.classList.add('is-active');
				renderSubs(ci);
			};
			catsCol.appendChild(btn);
		});
	}
	function renderSubs(ci) {
		subsCol.innerHTML = '<div class="dmnt-mega__col-title">Подкатегории</div>';
		svcsCol.innerHTML = '<div class="dmnt-mega__hint">← Выберите подкатегорию</div>';
		(data[ci].subs || []).forEach(function(sub, si) {
			var btn = document.createElement('button');
			btn.className = 'dmnt-mega__btn';
			btn.textContent = sub.name;
			btn.onclick = function() {
				subsCol.querySelectorAll('.dmnt-mega__btn').forEach(function(b) { b.classList.remove('is-active'); });
				btn.classList.add('is-active');
				renderSvcs(ci, si);
			};
			subsCol.appendChild(btn);
		});
	}
	function renderSvcs(ci, si) {
		svcsCol.innerHTML = '<div class="dmnt-mega__col-title">Услуги</div>';
		((data[ci].subs[si] || {}).items || []).forEach(function(item) {
			var a = document.createElement('a');
			a.className = 'dmnt-mega__link';
			a.href = '/' + item.slug;
			a.textContent = item.label;
			svcsCol.appendChild(a);
		});
	}

	/* мегаменю */
	function openMega() {
		if (!catsCol.querySelector('.dmnt-mega__btn')) renderCats();
		mega.classList.add('is-open');
		svcBtn.classList.add('is-open');
		overlay.classList.add('is-open');
	}
	function closeMega() {
		mega.classList.remove('is-open');
		svcBtn.classList.remove('is-open');
		if (!abtDrop.classList.contains('is-open')) overlay.classList.remove('is-open');
	}
	svcBtn.addEventListener('click', function(e) {
		e.stopPropagation();
		mega.classList.contains('is-open') ? closeMega() : (closeAbout(), openMega());
	});

	/* О компании */
	function openAbout() { abtDrop.classList.add('is-open'); abtBtn.classList.add('is-open'); overlay.classList.add('is-open'); }
	function closeAbout() {
		abtDrop.classList.remove('is-open'); abtBtn.classList.remove('is-open');
		if (!mega.classList.contains('is-open')) overlay.classList.remove('is-open');
	}
	abtBtn.addEventListener('click', function(e) {
		e.stopPropagation();
		abtDrop.classList.contains('is-open') ? closeAbout() : (closeMega(), openAbout());
	});

	document.addEventListener('click', function(e) {
		if (!mega.contains(e.target) && e.target !== svcBtn) closeMega();
		if (!abtDrop.contains(e.target) && e.target !== abtBtn) closeAbout();
	});
	overlay.addEventListener('click', function() { closeMega(); closeAbout(); closeMob(); });

	/* мобиль */
	function openMob() { mob.classList.add('is-open'); overlay.classList.add('is-open'); document.body.style.overflow = 'hidden'; }
	function closeMob() { mob.classList.remove('is-open'); overlay.classList.remove('is-open'); document.body.style.overflow = ''; }
	burger.addEventListener('click', openMob);
	mobClose.addEventListener('click', closeMob);

	/* аккордеон */
	document.addEventListener('click', function(e) {
		var btn = e.target.closest('.dmnt-mob__acc-btn,.dmnt-mob__cat-btn,.dmnt-mob__sub-btn');
		if (!btn) return;
		var body = btn.nextElementSibling;
		if (!body) return;
		var open = btn.classList.contains('is-open');
		var wrap = btn.parentElement.parentElement;
		if (wrap) {
			wrap.querySelectorAll(':scope > div > ' + btn.tagName + ',:scope > li > ' + btn.tagName).forEach(function(s) {
				if (s !== btn) { s.classList.remove('is-open'); if (s.nextElementSibling) s.nextElementSibling.style.display = 'none'; }
			});
		}
		btn.classList.toggle('is-open', !open);
		body.style.display = open ? 'none' : 'block';
	});
})();
</script>