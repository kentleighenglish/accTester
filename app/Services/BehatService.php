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

		$filePath = storage_path("uploads/${id}.log");
		$binPath = base_path().DS.'vendor'.DS.'bin'.DS.'behat';

		$cmd = 'script -q "'.$filePath.'" '.$binPath.' --suite '.$domain;
		Log::debug('Starting Test: '.$cmd);

		exec($cmd);
	}

}
