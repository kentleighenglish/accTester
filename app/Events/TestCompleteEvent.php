<?php

namespace App\Events;

class TestCompleteEvent extends TestEvent
{

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

}
