<?php

namespace App\Services;

use Illuminate\Support\Facades\Log;

class BehatService {

	private $root;

	public function __construct()
	{
		$this->root = ROOT_PATH;

	}

	public function run($test)
	{
		$id = $test->id;
		$domain = $test->domain;

		$filename = "${id}.log";
		$filePath = storage_path("app/uploads/${filename}");
		$binPath = base_path("vendor/bin/behat");

		$cmd = 'script -q -c "'.$binPath.' -p '.$domain.'" '.$filePath;
		Log::debug('Starting Test: '.$cmd);

		exec($cmd);
	}

}
