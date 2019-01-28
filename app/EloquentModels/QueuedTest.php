<?php

namespace App\EloquentModels;

use Illuminate\Database\Eloquent\Model;

class QueuedTest extends Model
{

	protected $table = 'queued_tests';

	protected $fillable = [ 'domain' ];

	protected $casts = [
		'run' => "boolean",
		'running' => "boolean",
		'failed' => "boolean"
	];
}
