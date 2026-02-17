<?php

if ($_SERVER["REQUEST_METHOD"] === "POST") {

	$works = htmlspecialchars(trim($_POST["works"]));
	$phone = htmlspecialchars(trim($_POST["phone"]));

	if (empty($works) || empty($phone)) {
		echo "error";
		exit;
	}

	$to = "yourmail@gmail.com"; // ← сюда почту
	$subject = "Новая заявка с главного экрана";

	$message = "
	Новая заявка:

	Вид работ: $works
	Телефон: $phone
	";

	$headers = "From: no-reply@yourdomain.ru\r\n"; // ← сюда домен
	$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

	if (mail($to, $subject, $message, $headers)) {
		echo "success";
	} else {
		echo "error";
	}
}