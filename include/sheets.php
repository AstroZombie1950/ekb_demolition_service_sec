<?php

define('SHEETS_API_KEY',  'AIzaSyCsG7dAlJsHkQflHRXdFRgdSFUQYpUIrHY');
define('SHEETS_ID',       '1QEYqWdBOY7s5gBMyfYjUnhhbGIVz9mnGT2gPSO9me_s');
define('SHEETS_RANGE',    'A1:AA20');
define('CACHE_FILE',      __DIR__ . '/../cache/services.json');
define('CACHE_TTL',       86400); // 24 часа

/**
 * Возвращает данные всех услуг, индексированные по slug.
 * Берёт из кэша если он свежий, иначе тянет из Sheets.
 */
function getServicesData(): array {
	// отдаём кэш если он ещё живой
	if (file_exists(CACHE_FILE) && (time() - filemtime(CACHE_FILE)) < CACHE_TTL) {
		return json_decode(file_get_contents(CACHE_FILE), true);
	}

	$data = fetchFromSheets();

	if ($data === null) {
		// Sheets недоступен — отдаём протухший кэш если есть
		if (file_exists(CACHE_FILE)) {
			return json_decode(file_get_contents(CACHE_FILE), true);
		}
		return [];
	}

	// сохраняем в кэш
	if (!is_dir(dirname(CACHE_FILE))) {
		mkdir(dirname(CACHE_FILE), 0755, true);
	}
	file_put_contents(CACHE_FILE, json_encode($data, JSON_UNESCAPED_UNICODE));

	return $data;
}

/**
 * Запрашивает данные из Google Sheets API и возвращает массив [slug => [vars]].
 */
function fetchFromSheets(): ?array {
	$url = sprintf(
		'https://sheets.googleapis.com/v4/spreadsheets/%s/values/%s?key=%s',
		SHEETS_ID,
		urlencode(SHEETS_RANGE),
		SHEETS_API_KEY
	);

	$ctx = stream_context_create(['http' => ['timeout' => 10]]);
	$response = @file_get_contents($url, false, $ctx);

	if ($response === false) {
		return null;
	}

	$json = json_decode($response, true);
	$rows = $json['values'] ?? [];

	if (count($rows) < 3) {
		return null;
	}

	// строка 0 — имена переменных, строки 2+ — данные услуг
	$keys    = $rows[0];
	$services = [];

	foreach (array_slice($rows, 2) as $row) {
		$service = [];
		foreach ($keys as $i => $key) {
			$service[$key] = $row[$i] ?? '';
		}

		$slug = $service['VAR_SLUG'] ?? '';
		if ($slug !== '') {
			$services[$slug] = $service;
		}
	}

	return $services;
}

/**
 * Возвращает данные одной услуги по slug или null если не найдена.
 */
function getServiceBySlug(string $slug): ?array {
	$all = getServicesData();
	return $all[$slug] ?? null;
}