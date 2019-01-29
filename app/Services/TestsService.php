<?php

namespace App\Services;

use App\EloquentModels\QueuedTest;
use App\Jobs\TestJob;
use App\Events\TestQueuedEvent;

class TestsService {

	public function addTest($test)
	{
		$queuedTest = new QueuedTest($test);

		$queuedTest->save();

		event(new TestQueuedEvent($queuedTest));

		dispatch(new TestJob($queuedTest));
	}

	public function getTests()
	{
		$tests = QueuedTest::all();

		return $tests;
	}

}
