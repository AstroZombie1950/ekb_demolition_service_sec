document.addEventListener("DOMContentLoaded", function () {

	const form = document.getElementById("quizForm");
	if (!form) return;

	form.addEventListener("submit", function (e) {
		e.preventDefault();

		const homeType = form.querySelector('input[name="qw1"]:checked').value;
		const workType = form.querySelector('input[name="qw2"]:checked').value;
		const trashType = form.querySelector('input[name="qw3"]:checked').value;
		const liftType = form.querySelector('input[name="qw4"]:checked').value;
		const deadlineType = form.querySelector('input[name="qw5"]:checked').value;
		const contactType = form.querySelector('input[name="case"]:checked').value;
		const phone = form.querySelector('input[name="phone"]').value;

		if (phone.length < 10) {
			alert("Введите корректный номер телефона");
			return;
		}

		const formData = new FormData();
		formData.append("home", homeType);
		formData.append("work", workType);
		formData.append("trash", trashType);
		formData.append("lift", liftType);
		formData.append("deadline", deadlineType);
		formData.append("case", contactType);
		formData.append("phone", phone);
		
		fetch("/include/send_quiz.php", {
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