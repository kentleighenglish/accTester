<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

abstract class TestEvent extends Event implements ShouldBroadcast
{

	public function broadcastOn()
	{
		return new Channel('tests');
	}

}
