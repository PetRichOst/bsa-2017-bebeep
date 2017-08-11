<?php

namespace App\Http\Controllers\Api\Car;

use App\Models\Vehicle;
use App\Services\CarService;
use App\Services\CarBodyService;
use App\Services\CarColorService;
use App\Services\CarMarkService;
use App\Services\CarModelService;
use App\Services\PermissionService;
use App\Http\Controllers\Controller;
use App\Http\Requests\CreateCarRequest;

class CarController extends Controller
{
    private $carService;
    private $permissionService;
    private $carBodyService;
    private $carColorService;
    private $carMarkService;
    private $carModelService;

    /**
     * CarController constructor.
     *
     * @param CarService $carService
     * @param PermissionService $permissionService
     * @param CarBodyService $carBodyService
     * @param CarColorService $carColorService
     * @param CarMarkService $carMarkService
     * @param CarModelService $carModelService
     */
    public function __construct(CarService $carService,
                                PermissionService $permissionService,
                                CarBodyService $carBodyService,
                                CarColorService $carColorService,
                                CarMarkService $carMarkService,
                                CarModelService $carModelService)
    {
        $this->carService = $carService;
        $this->permissionService = $permissionService;
        $this->carBodyService = $carBodyService;
        $this->carColorService = $carColorService;
        $this->carMarkService = $carMarkService;
        $this->carModelService = $carModelService;
    }

    /**
     * Display a listing of the resource.
     *
     * @return mixed
     */
    public function index()
    {
        return $this->carService->getAll();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return bool
     */
    public function create()
    {
        return $this->permissionService->canAddCar();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param CreateCarRequest $request
     * @return Vehicle|\Illuminate\Http\JsonResponse
     */
    public function store(CreateCarRequest $request)
    {
        if ($this->permissionService->canAddCar()) {
            return $car = $this->carService->create($request);
        } else {
            return $this->accessDenied();
        }
    }

    /**
     * Display the specified resource.
     *
     * @param $id
     * @return \Illuminate\Http\JsonResponse|mixed
     */
    public function show($id)
    {
        $vehicle = $this->carService->getById($id);

        if ($this->permissionService->canViewCar($vehicle->user_id)) {
            return $vehicle;
        } else {
            return $this->accessDenied();
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param $id
     * @return mixed
     */
    public function edit($id)
    {
        $vehicle = $this->carService->getById($id);

        return $this->permissionService->canEditCar($vehicle->id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param CreateCarRequest $request
     * @param $id
     * @return Vehicle|\Illuminate\Http\JsonResponse
     */
    public function update(CreateCarRequest $request, $id)
    {
        $vehicle = $this->carService->getById($id);

        if ($this->permissionService->canEditCar($vehicle->id)) {
            return $this->carService->update($request, $id);
        } else {
            return $this->accessDenied();
        }
    }

    /**
     ** Remove the specified resource from storage.
     *
     * @param $id
     * @return \Illuminate\Http\JsonResponse|int
     */
    public function destroy($id)
    {
        $vehicle = $this->carService->getById($id);

        if ($this->permissionService->canDeleteCar($vehicle->id)) {
            return $this->carService->destroy($id);
        } else {
            return $this->accessDenied();
        }
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    private function accessDenied()
    {
        return response()->json('Access denied', 403);
    }

    /**
     * @return mixed
     */
    public function getCarBody(){
        return $this->carBodyService->getAll();
    }

    /**
     * @return mixed
     */
    public function getCarColor(){
        return $this->carColorService->getAll();
    }

    /**
     * @return mixed
     */
    public function getCarMark(){
        return $this->carMarkService->getAll();
    }

    /**
     * @param $id
     * @return mixed
     */
    public function getCarModel($id){
        return $this->carModelService->getModelByIdMark($id);
    }
}
