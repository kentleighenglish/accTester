<?php

namespace App\Events;

use Illuminate\Queue\SerializesModels;

class TestFailedEvent extends Event
{

	use SerializesModels;

	public $test;

	/**
	* Create a new event instance.
	*
	* @return void
	*/
	public function __construct($test)
	{
		$this->test = $test;
	}

	public function broadcastOn()
	{
		return [ 'tests' ];
	}

}
