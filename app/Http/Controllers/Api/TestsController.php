<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

use App\Http\Controllers\Controller;

use App\Services\TestsService;

class TestsController extends Controller
{

	use ApiResponse;

	public $testsService;

	/**
	 * Create a new controller instance.
	 *
	 * @return void
	 */
	public function __construct(TestsService $testsService)
	{
		$this->testsService = $testsService;
	}

	public function index()
	{
		return view('index');
	}

	public function add(Request $request)
	{
		$data = $request->input();

		$test = $data['test'];
		$this->testsService->addTest($test);

		return $this->_respond();
	}

	public function log($id)
	{
		if ($id) {
			return Storage::get("uploads/${id}.log");
		}
	}

}
