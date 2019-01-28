<?php

namespace App\Jobs;


class TestJob extends Job
{

	protected $test;

	/**
	 * Create a new job instance.
	 *
	 * @return void
	 */
	public function __construct($test)
	{
		$this->test = $test;
	}

	/**
	 * Execute the job.
	 *
	 * @return void
	 */
	public function handle()
	{
		echo $this->test->domain;
	}
}
