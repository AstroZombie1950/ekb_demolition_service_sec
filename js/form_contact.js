document.addEventListener("DOMContentLoaded", function () {

	const form = document.getElementById("mainForm");
	if (!form) return;

	form.addEventListener("submit", function (e) {
		e.preventDefault();

		const works = form.querySelector('select[name="works"]').value;
		const phone = form.querySelector('input[name="phone"]').value;

		if (!works) {
			alert("Выберите вид работ");
			return;
		}

		if (phone.length < 10) {
			alert("Введите корректный номер телефона");
			return;
		}

		const formData = new FormData();
		formData.append("works", works);
		formData.append("phone", phone);

		fetch("/include/send_mail_contact.php", {
			method: "POST",
			body: formData
		})
		.then(response => response.text())
		.then(data => {
			if (data === "success") {
				form.querySelector(".form-success").style.display = "block";
				form.reset();
			} else {
				alert("Ошибка отправки");
			}
		})
		.catch(() => {
			alert("Ошибка соединения");
		});
	});

});

// ставим нужный пункт селекта по slug — window.load гарантирует что все скрипты уже отработали
window.addEventListener("load", function () {
	var slugMap = {
		complex:        "Демонтаж квартиры под ключ",
		buildings:      "Демонтаж домов, строений и зданий",
		ceiling:        "Демонтаж потолка",
		f_selfleveling: "Демонтаж стяжки",
		floor:          "Демонтаж пола",
		walls:          "Демонтаж стен",
		waste_removal:  "Вывоз строительного мусора",
	};

	var slug         = window.location.pathname.split("/").filter(Boolean).pop();
	var defaultValue = slugMap[slug];
	if (!defaultValue) return;

	var form = document.getElementById("mainForm");
	if (!form) return;

	var select  = form.querySelector('select[name="works"]');
	var trigger = form.querySelector('.faet-custom-select-trigger');

	if (select)  select.value        = defaultValue;
	if (trigger) trigger.textContent = defaultValue;
});