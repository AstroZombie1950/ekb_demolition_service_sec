<?php

if ($_SERVER["REQUEST_METHOD"] === "POST") {

	$works = htmlspecialchars(trim($_POST["works"]));
	$phone = htmlspecialchars(trim($_POST["phone"]));

	if (empty($works) || empty($phone)) {
		echo "error";
		exit;
	}

	$to = "TEMPMAIL@gmail.com"; // ← сюда почту
	$subject = "Новая заявка — Демонтаж";

	$message = "
	Форма Оценим стоимость демонтажных работ

	Вид работ: $works
	Телефон: $phone
	";

	$headers = "From: no-reply@" . $_SERVER["SERVER_NAME"] . "\r\n";
	$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

	if (mail($to, $subject, $message, $headers)) {
		echo "success";
	} else {
		echo "error";
	}
}