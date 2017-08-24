import { securedRequest } from 'app/services/RequestService';
import LangService from './LangService';

export const BOOKING_FILTER_UPCOMING = 'upcoming';
export const BOOKING_FILTER_PAST = 'past';

const BookingService = {
    getBookings(id) {
        let response;
        return response = [
            {
                booking_id: 1,
                first_name: 'Misha',
                last_name: 'Markelov',
                img: 'https://pickaface.net/assets/images/slides/slide4.png'
            },{
                booking_id: 2,
                first_name: 'Steve',
                last_name: 'Jobs',
                img: 'https://pickaface.net/assets/images/slides/slide2.png'
            },{
                booking_id: 3,
                first_name: 'Angela',
                last_name: 'Minoy',
                img: 'https://pickaface.net/assets/images/slides/slide1.png'
            }
        ];
        /*return securedRequest.get('/api/v1/trips/' + id + '/bookings')
            .then(
                response => Promise.resolve(response.data),
                error => Promise.reject(error.response.data)
            );*/
    },
    getBookingsCount(data) {
        if (!data) return null;
        return data.length;
    },
    updateBookingStatus(trip_id, booking_id, data) {
        const url = '/api/v1/trips/' + trip_id + '/bookings/' + booking_id + '/status';
        return securedRequest.put(url, data)
            .then(
                response => Promise.resolve(response.data)
            )
    },
    cancelBooking(id) {
        return securedRequest.delete('/api/v1/bookings/' + id);
    },
    createBooking(tripId, data) {
        return securedRequest.post('/api/v1/trips/' + tripId + '/bookings', data)
            .then(
                response => Promise.resolve(response.data)
            )
    },
    validateBooking(iStart, iEnd, seats, possibleSeats) {
        let errors = {};

        if (iStart < 0) {
            errors.start = LangService.translate('validate.booking.start_point_not_found');
        }
        if (iEnd < 0) {
            errors.end = LangService.translate('validate.booking.end_point_not_found');
        }
        if (iStart > iEnd) {
            errors.end = LangService.translate('validate.booking.end_point_incorrect');
        }
        if (possibleSeats < seats) {
            errors.seats = LangService.translate('validate.booking.you_can_book_seats' + LangService.getNumberForm(possibleSeats), {seats: possibleSeats})
        }
        return errors;
    },
    getBookingsList(filter = BOOKING_FILTER_UPCOMING, page = 1, limit = 10) {
        return securedRequest.get('/api/v1/bookings/' + (filter !== BOOKING_FILTER_UPCOMING
                ? BOOKING_FILTER_PAST
                : BOOKING_FILTER_UPCOMING
            ), {
                params: {
                    page: page > 0 ? page : 1,
                    limit: limit > 0 ? limit : 10
                },
            })
            .then(
                response => Promise.resolve(response.data),
                error => {
                    if (error.response) {
                        return Promise.reject(error.response.data)
                    } else {
                        return Promise.reject(error);
                    }
                }
            )
    }
};

export default BookingService;