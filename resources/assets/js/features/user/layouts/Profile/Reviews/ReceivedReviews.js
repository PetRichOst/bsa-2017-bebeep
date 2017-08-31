import React from 'react';
import LangService from 'app/services/LangService';
import * as lang from '../../../lang/Profile/ProfileReviews.locale.json';
import {localize} from 'react-localize-redux';

class ReceivedReviews extends React.Component {
    componentWillMount() {
        LangService.addTranslation(lang);
    }

    render() {
        return (
            <div>

            </div>
        );
    }
}

export default localize(ReceivedReviews, 'locale');
