import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
//import { compose } from 'redux';
//import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';


class AddClient extends Component {
    state = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        balance: ''
    }

    onSubmit = e => {
        e.preventDefault();
        const newClient = this.state;
        const { firestore, history } = this.props;
        if (newClient.balance === '') {
            newClient.balance = 0;
        }
        firestore.add({ collection: 'clients' }, newClient).then(() =>
            history.push('/'));
    };

    onChange = (e) => this.setState({ [e.target.name]: e.target.value })
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-6">
                        <Link to="/" className="btn btn-link">
                            <i className="fas fa-arrow-circle-left" />Back to Dashboard
</Link>
                    </div>

                </div>
                <div className="card">
                    <div className="card-header">Add client</div>
                    <div className="card-body">
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label htmlFor="firstName" >First name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="firstName"
                                    minLength="2"
                                    required
                                    onChange={this.onChange}
                                    value={this.state.firstName}
                                />

                            </div>

                            <div className="form-group">
                                <label htmlFor="lastName" >Last name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="lastName"
                                    minLength="2"
                                    required
                                    onChange={this.onChange}
                                    value={this.state.lastName}
                                />

                            </div>

                            <div className="form-group">
                                <label htmlFor="email" >Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    minLength="2"
                                    onChange={this.onChange}
                                    value={this.state.email}
                                />

                            </div>
                            <div className="form-group">
                                <label htmlFor="phone" >Phone</label>
                                <input
                                    type="phone"
                                    className="form-control"
                                    name="phone"
                                    required
                                    minLength="10"
                                    onChange={this.onChange}
                                    value={this.state.phone}
                                />

                            </div>

                            <div className="form-group">
                                <label htmlFor="balance" >Balance</label>
                                <input
                                    type="balance"
                                    className="form-control"
                                    name="balance"
                                    onChange={this.onChange}
                                    value={this.state.balance}
                                />
                                <input type="submit" value="Submit" className="btn btn-prymary btn-block" />
                            </div>
                        </form>
                    </div>
                </div>


            </div>
        );
    }
}

AddClient.propTypes = {
    firestore: PropTypes.object.isRequired
}

export default firestoreConnect()(AddClient);
