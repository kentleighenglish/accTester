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
		$filePath = storage_path().DS.'uploads'.DS.$filename;
		$binPath = base_path().DS.'vendor'.DS.'bin'.DS.'behat';

		$cmd = 'script -q "'.$filePath.'" '.$binPath.' --suite '.$domain;
		Log::debug('Starting Test: '.$cmd);

		exec($cmd);
	}

}
