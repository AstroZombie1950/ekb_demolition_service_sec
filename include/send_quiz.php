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

	$to = "yourmail@gmail.com"; // ← почта
	$subject = "Заявка на расчёт (квиз)";

	$message = "
	Новая заявка:
	Тип дома: $homeType
	Вид работы: $workType
	Вывоз мусора: $trashType
	Лифт: $liftType
	Срок: $deadlineType
	Предпочтительный способ связи: $contactType
	Телефон: $phone
	";

	$headers = "From: no-reply@yourdomain.ru\r\n"; // ← домен
	$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

	if (mail($to, $subject, $message, $headers)) {
		echo "success";
	} else {
		echo "error";
	}
}