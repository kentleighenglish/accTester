<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateQueuedTestsTable extends Migration
{
	/**
	* Run the migrations.
	*
	* @return void
	*/
	public function up()
	{
		Schema::create('queued_tests', function (Blueprint $table) {
			$table->increments('id');
			$table->string('domain');
			$table->boolean('running')->default(false);
			$table->boolean('failed')->default(false);
			$table->boolean('run')->default(false);
			$table->timestamps();
		});
	}

	/**
	* Reverse the migrations.
	*
	* @return void
	*/
	public function down()
	{
		Schema::dropIfExists('queued_tests');
	}
}
