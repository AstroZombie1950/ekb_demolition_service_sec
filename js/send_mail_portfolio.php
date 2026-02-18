<?php

header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
	echo json_encode(["success" => false, "message" => "Неверный метод запроса"]);
	exit;
}

// антиспам: проверка времени
session_start();
if (isset($_SESSION['last_submit']) && time() - $_SESSION['last_submit'] < 20) {
	echo json_encode(["success" => false, "message" => "Подождите перед повторной отправкой"]);
	exit;
}
$_SESSION['last_submit'] = time();

// получаем данные
$phone = trim($_POST["phone"] ?? "");
$title = trim($_POST["title"] ?? "Заявка с сайта");

// чистим номер
$phone_clean = preg_replace('/[^0-9]/', '', $phone);

if (strlen($phone_clean) < 10) {
	echo json_encode(["success" => false, "message" => "Введите корректный номер телефона"]);
	exit;
}

// email получателя
$to = "your@email.ru"; // <-- почта

$subject = "Новая заявка — Портфолио";

$message = "
$title

Телефон: $phone
Дата: " . date("d.m.Y H:i:s") . "
IP: " . $_SERVER["REMOTE_ADDR"] . "
";

$headers = "From: no-reply@" . $_SERVER["SERVER_NAME"] . "\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

if (mail($to, $subject, $message, $headers)) {
	echo json_encode(["success" => true]);
} else {
	echo json_encode(["success" => false, "message" => "Ошибка отправки письма"]);
}