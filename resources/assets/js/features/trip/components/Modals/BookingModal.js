import React from 'react';
import { localize } from 'react-localize-redux';
import PropTypes from 'prop-types';
import Modal from 'app/components/Modal';
import SelectItem from './SelectItem';
import moment from 'moment';

class BookingModal extends React.Component {

    constructor() {
        super();
        this.state = {
            isOpenModal: false,
            startPoint: 0,
            endPoint: 0,
            seats: 1
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeStartPoint = this.onChangeStartPoint.bind(this);
        this.onChangeEndPoint = this.onChangeEndPoint.bind(this);
        this.onChangeSeats = this.onChangeSeats.bind(this);
    }

    componentWillMount() {
        this.changeSeats(this.state.startPoint, this.state.endPoint);
    }

    onSubmit(e) {
        e.preventDefault();
        const {onSuccess} = this.props;

        onSuccess();
        this.closeModal();
    }

    closeModal() {
        const onClosed = this.props.onClosed || (() => {});
        this.setState({isOpenModal: false});
        onClosed();
    }

    getRouteById(id) {
        return _.findIndex(this.props.waypoints, {id});
    }

    onChangeStartPoint(e) {
        const routeId = +e.target.value,
            startPoint = this.getRouteById(routeId);
        this.setState({startPoint});
        this.changeSeats(startPoint, this.state.endPoint);
    }

    onChangeEndPoint(e) {
        const routeId = +e.target.value,
            endPoint = this.getRouteById(routeId);
        this.setState({endPoint});
        this.changeSeats(this.state.startPoint, endPoint);
    }

    changeSeats(startPoint, endPoint) {
        const {waypoints} = this.props;

        this.setState({
            seats: _.reduce(
                _.slice(waypoints, startPoint, endPoint + 1),
                (acc, p) => acc + p.busy_seats,
                0)
        });
    }

    getEndPoints() {
        let busySeats = 0;
        const {waypoints, maxSeats} = this.props,
            edge = _.findIndex(waypoints, (p, i) => {
                if (i >= this.state.startPoint) {
                    busySeats += p.busy_seats;
                }
                return busySeats >= maxSeats;
            });
        return waypoints.slice(this.state.startPoint, edge > 0 ? edge : waypoints.length);
    }

    onChangeSeats(e) {
        const currentSeats = +e.target.value;
        console.log(this.state);
    }

    componentWillReceiveProps(newProps) {
        if (this.state.isOpenModal !== newProps.isOpen) {
            this.setState({isOpenModal: newProps.isOpen});
        }
    }

    dateFormat(timestamp) {
        const {translate} = this.props,
            date = moment(timestamp * 1000),
            locale = moment().locale(),
            localeData = moment().locale(locale).localeData(),
            day = _.padStart(date.date(), 2, '0'),
            weekday = _.capitalize(localeData.weekdaysShort(date)),
            month = _.capitalize(localeData.monthsShort(date)),
            minute = _.padStart(date.minute(), 2, '0'),
            hour = _.padStart(date.hour(), 2, '0'),
            now = moment(),
            time = `- ${hour}:${minute}`;
        if (now.isSame(date, 'day')) {
            return `${translate('search_result.today')} ${time}`
        } else if (now.isSame(date.subtract(1, 'day'), 'day')) {
            return `${translate('search_result.tomorrow')} ${time}`
        }
        return `${weekday}. ${day} ${month} ${time}`;
    }

    render() {
        const {isOpenModal, startPoint, endPoint, seats} = this.state,
            {translate, waypoints, price, start_at, maxSeats} = this.props,
            endPoints = this.getEndPoints();

        return (
            <Modal isOpen={isOpenModal} onClosed={() => { this.closeModal() }}>
                <form onSubmit={this.onSubmit}>
                    <div className="modal-header">{translate('detail_trip.booking.header')}</div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="text-muted" style={{fontSize: '.8rem'}}>
                                    {translate('detail_trip.booking.start_trip')}
                                </div>
                                <b>{this.dateFormat(start_at)}</b>
                            </div>
                            <div className="col-sm-6">
                                <div className="text-muted" style={{fontSize: '.8rem'}}>
                                    {translate('detail_trip.booking.price_of_trip')}
                                </div>
                                <b>$</b>{price}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-4">
                                <div className="text-muted" style={{fontSize: '.8rem'}}>
                                    {translate('detail_trip.booking.start_point')}
                                </div>
                                <select
                                    name="start_point"
                                    className="form-control"
                                    onChange={this.onChangeStartPoint}
                                >
                                    {waypoints.map(p => (
                                            <SelectItem
                                                key={'from_' + p.id}
                                                value={p.id}
                                                disabled={p.busy_seats >= maxSeats}
                                            >{p.from.short_address}</SelectItem>
                                        )
                                    )}
                                </select>
                            </div>
                            <div className="col-sm-4">
                                <div className="text-muted" style={{fontSize: '.8rem'}}>
                                    {translate('detail_trip.booking.end_point')}
                                </div>
                                <select
                                    name="end_point"
                                    className="form-control"
                                    onChange={this.onChangeEndPoint}
                                >
                                    {endPoints.map(((p) => {
                                        return (
                                            <SelectItem
                                                key={'to_' + p.id}
                                                value={p.id}
                                                disabled={p.busy_seats >= maxSeats}
                                            >{p.to.short_address}</SelectItem>
                                        )
                                    }))}
                                </select>
                            </div>
                            <div className="col-sm-4">
                                <div className="text-muted" style={{fontSize: '.8rem'}}>
                                    {translate('detail_trip.booking.seats')}
                                </div>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="seats"
                                    defaultValue="1"
                                    min="1"
                                    max={maxSeats - seats < 1 ? 1 : maxSeats - seats}
                                    disabled={seats >= maxSeats}
                                    onChange={this.onChangeSeats}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer text-right">
                        <div className="btn btn-danger" role="button" onClick={() => this.closeModal()}>
                            {translate('detail_trip.booking.cancel')}
                        </div>
                        <button role="button" className="btn btn-success">{translate('detail_trip.booking.apply')}</button>
                    </div>
                </form>
            </Modal>
        );
    }
}

BookingModal.PropTypes = {
    waypoints: PropTypes.array.required,
    price: PropTypes.number.required,
    start_at: PropTypes.number.required,
    maxSeats: PropTypes.number.required,
    tripId: PropTypes.number.required,
    isOpen: PropTypes.bool.required,
    onClosed: PropTypes.func,
    onSuccess: PropTypes.func.required
};

export default localize(BookingModal, 'locale');
