<?php

if ($_SERVER["REQUEST_METHOD"] === "POST") {
	$homeType = htmlspecialchars(trim($_POST["home"]));
	$workType = htmlspecialchars(trim($_POST["work"]));
	$trashType = htmlspecialchars(trim($_POST["trash"]));
	$liftType = htmlspecialchars(trim($_POST["lift"]));
	$deadlineType = htmlspecialchars(trim($_POST["deadline"]));
	$contactType = htmlspecialchars(trim($_POST["case"]));
	$phone = htmlspecialchars(trim($_POST["phone"]));

	if (empty($contactType) || empty($phone)) {
		echo "error";
		exit;
	}

	$to = "TEMPMAIL@gmail.com"; // ← почта
	$subject = "Новая заявка — Демонтаж";

	$message = "
	Новая заявка (Quiz):
	Тип дома: $homeType
	Вид работы: $workType
	Вывоз мусора: $trashType
	Лифт: $liftType
	Срок: $deadlineType
	Предпочтительный способ связи: $contactType
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