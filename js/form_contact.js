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