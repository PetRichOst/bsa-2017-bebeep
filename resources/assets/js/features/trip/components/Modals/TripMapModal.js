import React from 'react';
import PropTypes from 'prop-types';
import { localize } from 'react-localize-redux';
import {Modal} from 'reactstrap';
import {withGoogleMap, GoogleMap, DirectionsRenderer} from "react-google-maps";
import TripDetailsService from '../../services/TripDetailsService';

const GoogleMapContainer = withGoogleMap(props => (
    <GoogleMap
        defaultZoom={5}
        defaultCenter={{lat: 48.379433, lng: 31.1655799}}>
        {props.directions && <DirectionsRenderer directions={props.directions}/>}
    </GoogleMap>
));

class TripMapModal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpenModal: false,
            directions: null
        };

        this.toggleModal = this.toggleModal.bind(this);
    }

    componentWillMount() {
        this.renderDirection(this.props.waypoints);
    }

    toggleModal() {
        this.setState({ isOpenModal: !this.state.isOpenModal });
    }

    renderDirection(routes) {
        TripDetailsService
            .getMapDestination(routes)
            .then((result) => this.setState({directions: result}));
    }

    render() {
        const { isOpenModal, directions } = this.state,
            { translate, waypoints, className } = this.props,
            startPoint = waypoints[0].from;

        return (
            <span>
                <a href="#" className={className} onClick={this.toggleModal}>
                    <i className="trip-detail-icon fa fa-road mr-2" aria-hidden="true" />
                    { translate('trip_details.route_map_link') }
                </a>
                <Modal className="trip-map-modal" isOpen={isOpenModal} toggle={this.toggleModal} size="lg">
                    <i className="trip-map-modal__close fa fa-times fa-3x" onClick={this.toggleModal} role="button" />
                    <div className="trip-map-modal__map-container">
                        <GoogleMapContainer
                            containerElement={
                                <div className="h-100" />
                            }
                            mapElement={
                                <div className="h-100" />
                            }
                            center={startPoint}
                            directions={directions}
                        />
                    </div>
                </Modal>
            </span>
        );
    }
}

TripMapModal.PropTypes = {
    waypoints: PropTypes.array.isRequired
};

export default localize(TripMapModal, 'locale');