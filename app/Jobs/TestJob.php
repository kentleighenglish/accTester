<?php

namespace App\Jobs;

use Illuminate\Support\Facades\Log;

use App\Events\{TestStartedEvent, TestCompleteEvent, TestFailedEvent};
use App\Services\BehatService;

class TestJob extends Job
{

	protected $test;

	protected $behat;

	public $timeout = 120;

	public $tries = 1;

	/**
	 * Create a new job instance.
	 *
	 * @return void
	 */
	public function __construct($test)
	{
		$this->test = $test;

		$this->behat = new BehatService();
	}

	/**
	 * Execute the job.
	 *
	 * @return void
	 */
	public function handle()
	{
		// Start Test
		$this->test->running = true;
		$this->test->save();
		Log::debug("Starting Test");
		event(new TestStartedEvent($this->test));

		$result = $this->behat->run($this->test);

		// Complete Test
		$this->test->run = true;
		$this->test->running = false;
		$this->test->save();

		if ($result !== true) {
			$this->fail($result);
		}

		Log::debug("Finishing Test");
		event(new TestCompleteEvent($this->test));
	}

	/**
	 * Handle a job failure.
	 *
	 * @param  \App\Events\Event  $event
	 * @param  \Exception  $exception
	 * @return void
	 */
	public function failed($exception)
	{
		$this->test->failed = true;
		$this->test->running = false;
		$this->test->save();

		event(new TestFailedEvent($this->test));

		throw $exception;
	}
}
