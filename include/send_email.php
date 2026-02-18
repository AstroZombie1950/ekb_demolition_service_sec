<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {

	$phone = htmlspecialchars($_POST["phone"]);

	$to = "TEMPMAIL@gmail.com"; // ← сюда почту
	$subject = "Новая заявка — Демонтаж";
	$message = "
	Форма Заказать выезд замерщика

	Телефон: $phone
	Дата: " . date("d.m.Y H:i:s") . "
	IP: " . $_SERVER["REMOTE_ADDR"] . "
	";
	
	$headers = "From: no-reply@" . $_SERVER["SERVER_NAME"] . "\r\n";
	$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

	mail($to, $subject, $message, $headers);

	echo "success";
}