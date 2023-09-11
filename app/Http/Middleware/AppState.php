<?php

namespace App\Http\Middleware;

use Illuminate\Support\Facades\View;
use App\EloquentModels\QueuedTest;

use Closure;

class AppState
{
	/**
	 * Handle an incoming request.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  \Closure  $next
	 * @return mixed
	 */
	public function handle($request, Closure $next)
	{
		$state  = [];

		$state['domains'] = config('app.domains');

		$queuedTests = QueuedTest::all();

		$state['tests'] = [
			'tests' => $queuedTests->toArray(),
			'running' => $queuedTests->where([ 'running' => 1 ])->count(),
			'failed' => $queuedTests->where([ 'failed' => 1 ])->count()
		];

		View::share('viewState', (Object) $state);

		return $next($request);
	}
}
