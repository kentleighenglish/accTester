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

		$filePath = storage_path("app/uploads/${id}.log");
		$binPath = base_path("vendor/bin/behat");

		$cmd = 'script -q -c "'.$binPath.' -p '.$domain.'" '.$filePath;
		Log::debug('Starting Test: '.$cmd);

		exec($cmd);
	}

}
