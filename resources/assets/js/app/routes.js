import React from 'react';
import { IndexRoute, Route, Redirect } from 'react-router';

import App from './App';
import Home from './layouts/Home';
import Vehicles from '../features/vehicle/layouts/Vehicles';
import VehicleDetails from '../features/vehicle/layouts/VehicleDetails';
import NotFound from './layouts/NotFound';
import CreateWrap from '../features/trip/layouts/CreateWrap'

export default (
    <Route path="/" component={ App }>
        <IndexRoute component={ Home } />

        <Route path="vehicles" component={ Vehicles } />
        <Route path="vehicles/:id" component={ VehicleDetails } />
        <Route path="trip/create" component={ CreateWrap } />
        <Route path="trip/edit/:id" component={ Vehicles /*TripEdit*/ } />

        <Route path="*" component={ NotFound } />
    </Route>
);
