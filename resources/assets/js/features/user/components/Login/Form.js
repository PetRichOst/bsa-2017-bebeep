import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import TextInput from './TextInput';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import '../../styles/user.scss';

class Form extends React.Component {

    constructor(props) {
        super(props);
        this.state = { credentials: { email: '', password: ''}};
        this.onChange = this.onChange.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    onChange(event) {
        const field = event.target.name;
        const credentials = this.state.credentials;
        credentials[field] = event.target.value;

        return this.setState({ credentials: credentials });
    }

    onSave(event) {
        event.preventDefault();
        this.props.actions.doLogin(this.state.credentials);
    }

    render() {

        const { errors } = this.props;

        return (

            <form role="form" className="card login-form" action="/api/user/authorization" method="POST">
                <div className="card-header">
                    Enter your credentials
                </div>
                <div className="card-block">
                    <TextInput
                        name="email"
                        label="Email"
                        value={ this.state.credentials.email }
                        error={ errors.email }
                        onChange={ this.onChange }/>

                    <TextInput
                        name="password"
                        label="Password"
                        type="password"
                        value={ this.state.credentials.password }
                        error={ errors.password }
                        onChange={ this.onChange }/>
                </div>

                <div className="card-footer">
                    <div className="text-center">
                        <button
                            className="btn btn-primary"
                            onClick={ this.onSave }>
                            Login
                        </button>
                    </div>
                </div>
            </form>
        );
    }

}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect((state) => ({ errors: state.user.login.errors }), mapDispatchToProps)(Form);