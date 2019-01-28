<?php

namespace App\Http\Controllers\Api;

trait ApiResponse {

	private $_response = [
		'code' => 200,
		'data' => null,
		'success' => true,
		'redirect' => null,
		'errors' => [],
		'messages' => []
	];

	/**
	 * Adds a given error to the JSON response
	 *
	 * @param String $group
	 * @param String $error
	 * @param Boolean $critical
	 * @return void
	 */
	private function _error($group, $error, $critical = true)
	{
		if ($critical) {
			$this->_response['success'] = false;
			$this->_response['code'] = 400;
		}

		if(!isset($this->_response['errors'][$group])) {
			$gthis->_response['errors'][$group] = [];
		}

		$this->_response['errors'][$group][] = $error;
	}

	private function _message($group, $message)
	{
		if(!isset($this->_response['messages'][$group])) {
			$gthis->_response['messages'][$group] = [];
		}

		$this->_response['messages'][$group][] = $message;
	}

	/**
	 * Outputs JSON response
	 *
	 * @param Any $data
	 * @param String $redirect
	 * @return \Illuminate\Http\JsonResponse
	 */
	private function _respond($data = null, $redirect = null)
	{
		if (isset($data) && $data !== null) {
			$this->_response['data'] = $data;
		}

		if (isset($redirect) && $redirect !== null) {
			$this->_response['redirect'] = $redirect;
		}

		return response()->json($this->_response);
	}

}
