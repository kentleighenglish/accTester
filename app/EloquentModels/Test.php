<?php

namespace App\EloquentModel;

class User extends Model
{

	/**
	* The attributes that are mass assignable.
	*
	* @var array
	*/
	protected $fillable = [
		'id', 'domain'
	];


}
