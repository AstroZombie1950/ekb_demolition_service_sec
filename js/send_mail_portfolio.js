document.addEventListener("DOMContentLoaded", function() {

	const form = document.getElementById("portfolioForm");
	const messageBlock = form.querySelector(".form-message");
	const phoneInput = form.querySelector("input[name='phone']");
	const submitBtn = form.querySelector("button[type='submit']");

	function validatePhone(phone) {
		const cleaned = phone.replace(/\D/g, '');
		return cleaned.length >= 10;
	}

	form.addEventListener("submit", function(e) {
		e.preventDefault();

		messageBlock.style.display = "none";
		messageBlock.textContent = "";
		phoneInput.style.borderColor = "";

		const phoneValue = phoneInput.value.trim();
		const cleanedPhone = phoneValue.replace(/\D/g, '');

		// Проверка номера
		if (!validatePhone(phoneValue)) {
			messageBlock.style.display = "block";
			messageBlock.style.color = "red";
			messageBlock.textContent = "Введите корректный номер телефона";
			phoneInput.style.borderColor = "red";
			return;
		}

		submitBtn.disabled = true;

		const formData = new FormData(form);

		fetch("../include/send_mail_portfolio.php", {
			method: "POST",
			body: formData
		})
		.then(response => response.json())
		.then(data => {

			submitBtn.disabled = false;

			messageBlock.style.display = "block";

			if (data.success) {
				messageBlock.style.color = "green";
				messageBlock.textContent = "Спасибо! Мы свяжемся с вами в ближайшее время.";
				form.reset();
			} else {
				messageBlock.style.color = "red";
				messageBlock.textContent = data.message;
				alert("231231");
			}
		})
		.catch(() => {
			submitBtn.disabled = false;
			messageBlock.style.display = "block";
			messageBlock.style.color = "red";
			messageBlock.textContent = "Ошибка отправки. Попробуйте позже.";
		});
	});

});