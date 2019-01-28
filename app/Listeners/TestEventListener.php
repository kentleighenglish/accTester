<?php

namespace App\Listeners;

use App\Events\TestFailedEvent;
use App\Events\TestStartedEvent;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class TestEventListener
{
	/**
	* Create the event listener.
	*
	* @return void
	*/
	public function __construct()
	{
	}

	/**
	* Handle the event.
	*
	* @param  ExampleEvent  $event
	* @return void
	*/
	public function handle(ExampleEvent $event)
	{
	}

	public function onTestStarted($event)
	{

	}

	public function subscribe($events)
	{
		$events->listen(
			'App\Events\TestStartedEvent',
			'App\Listeners\TestEventListener@onTestStarted'
		);
	}
}
