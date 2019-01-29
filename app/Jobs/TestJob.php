<?php

namespace App\Jobs;

use App\Events\{TestStartedEvent, TestCompleteEvent, TestFailedEvent};
use App\Services\BehatService;

class TestJob extends Job
{

	protected $test;

	protected $behat;

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

		event(new TestStartedEvent($this->test));

		$this->behat->run($this->test);

		// Complete Test
		$this->test->run = true;
		$this->test->running = false;
		$this->test->save();

		event(new TestCompleteEvent($this->test));
	}

	/**
	 * Handle a job failure.
	 *
	 * @param  \App\Events\OrderShipped  $event
	 * @param  \Exception  $exception
	 * @return void
	 */
	public function failed(OrderShipped $event, $exception)
	{
		$this->test->failed = true;
		$this->test->running = false;
		$this->test->save();

		event(new TestFailedEvent($this->test));
	}
}
