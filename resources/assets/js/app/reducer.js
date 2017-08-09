import { combineReducers } from 'redux';

import vehicle from '../features/vehicle/reducer';
import trip from '../features/trip/reducer';

export default combineReducers({
    vehicle,
    trip
});
