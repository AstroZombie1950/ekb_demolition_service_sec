<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {

	$phone = htmlspecialchars($_POST["phone"]);

	$to = "yourmail@gmail.com"; // ← сюда почту
	$subject = "Новая заявка с сайта Демонтаж";
	$message = "Телефон: " . $phone;
	$headers = "From: no-reply@yourdomain.ru"; // ← сюда домен

	mail($to, $subject, $message, $headers);

	echo "success";
}