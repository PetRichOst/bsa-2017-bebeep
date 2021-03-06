<?php

namespace Tests\Feature\Trips;

use Carbon\Carbon;
use App\Models\Vehicle;

class SearchTripsTest extends BaseTripTestCase
{
    const ENDPOINT = '/api/v1/trips/search';

    protected $method = 'POST';

    public $responseNoExistData = [
        'data' => [],
    ];

    public $userId;
    public $trip;

    /**
     * Test to find the right data.
     */
    public function test_search_exist_data()
    {
        $response = $this->create_trip();

        $response->assertStatus(200);

        $this->assertDatabaseHas(
            'trips',
            [
                'price' => (float) $this->trip['price'],
                'seats' => $this->trip['seats'],
                'vehicle_id' => $this->trip['vehicle_id'],
                'user_id' => $this->userId,
            ]
        );

        $this->assertDatabaseHas(
            'routes',
            [
                'trip_id' => json_decode($response->getContent())->id,
            ]
        );
        $start_at = Carbon::now()->timestamp;
        $search = '?fc=30.523400000000038|50.4501&start_at='.$start_at.'&tc=36.230383000000074|49.9935&currency_id=1';
        $response = $this->json('GET', self::ENDPOINT.$search);
        $response->assertStatus(200);
        $response->assertSee('350.00');
        $response->assertSee('"total":1');
        $response->assertSee('"seats":3');
    }

    /**
     * Test to find the no right data.
     */
    public function test_search_no_exist_data()
    {
        $search = '?fc=30.523400000000038|50.4501&start_at=1503694800&tc=24.029717000000005|49.839683&currency_id=1';
        $response = $this->json('GET', self::ENDPOINT.$search);
        $response->assertStatus(200);
        $response->assertJsonFragment($this->responseNoExistData);
    }

    /**
     * Test to find the right data and filters.
     */
    public function test_search_filter_time_is_right()
    {
        $response = $this->create_trip();

        $response->assertStatus(200);
        $startAt = Carbon::now()->addHour(1)->timestamp;
        $search = '?fc=30.523400000000038|50.4501&start_at='.$startAt.'&tc=36.230383000000074|49.9935&sort=price&order=asc&page=1&limit=10&filter[price][min]=0&filter[price][max]=400&filter[time][min]=1&filter[time][max]=24&currency_id=1';
        $response = $this->json('GET', self::ENDPOINT.$search);
        $response->assertStatus(200);
        $response->assertSee('350.00');
        $response->assertSee('"total":1');
        $response->assertSee('"seats":3');
    }

    /**
     * Test to find the right data and filters.
     */
    public function test_search_filter_price_is_no_right()
    {
        $response = $this->create_trip();

        $response->assertStatus(200);
        $startAt = Carbon::now()->addHour(1)->timestamp;
        $search = '?fc=30.523400000000038|50.4501&start_at='.$startAt.'&tc=36.230383000000074|49.9935&sort=price&order=asc&page=1&limit=10&filter[price][min]=360&filter[price][max]=360&filter[time][min]=1&filter[time][max]=24&currency_id=1';
        $response = $this->json('GET', self::ENDPOINT.$search);
        $response->assertStatus(200);
        $response->assertJsonFragment($this->responseNoExistData);
    }

    /**
     * @return \Illuminate\Foundation\Testing\TestResponse
     */
    private function create_trip()
    {
        $user = $this->getDriverUser();

        $vehicle = factory(Vehicle::class)->create([
            'seats' => 4,
            'user_id' => $user->id,
        ]);

        $trip = $this->getValidTripData($vehicle->id);

        $createUrl = route('trips.create');

        $this->userId = $user->id;
        $this->trip = $trip;

        return $this->jsonRequestAsUser($user, $this->method, $createUrl, $trip);
    }
}
