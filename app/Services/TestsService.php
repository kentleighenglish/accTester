<?php

namespace App\Services;

use Event;
use App\EloquentModels\QueuedTest;
use App\Jobs\TestJob;
use App\Events\{TestStartedEvent, TestFailedEvent, TestQueuedEvent};

class TestsService {

	public function addTest($test)
	{
		$queuedTest = new QueuedTest($test);

		$queuedTest->save();

		dispatch((new TestJob($queuedTest))->onQueue('tests'));
		Event::fire(new TestQueuedEvent($queuedTest));
	}

	public function getTests()
	{
		$tests = QueuedTest::all();

		return $tests;
	}

}
