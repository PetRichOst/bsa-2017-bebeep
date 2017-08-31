import React from 'react';

import MainHeader from './components/MainHeader';
import {isRootPath} from './helpers/NavHelper';
import {isSearchPath} from './helpers/SearchHelper';

import './bootstrap/bootstrap.scss';
import './bootstrap/font-awesome.scss';
import './styles/app.scss';

class App extends React.Component {

    render() {
        return (
            <div id="application">
                <MainHeader />

                <div className={!isRootPath(this.props.location.pathname) && !isSearchPath(this.props.location.pathname) ? 'main-container container py-4' : ''}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default App;
