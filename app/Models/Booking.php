<?php

namespace App\Models;

use App\User;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    const STATUS_DECLINED = 'declined';
    const STATUS_APPROVED = 'approved';
    const STATUS_PENDING = 'pending';
    const STATUS_CANCELED = 'canceled';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'status',
        'trip_id',
        'user_id',
        'seats',
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function trip()
    {
        return $this->belongsTo(Trip::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function routes()
    {
        return $this->belongsToMany(Route::class);
    }

    /**
     * Boot the model.
     *
     * @return void
     */
    public static function boot()
    {
        parent::boot();

        static::creating(function ($booking) {
            $booking->status = self::STATUS_PENDING;
        });
    }
}
