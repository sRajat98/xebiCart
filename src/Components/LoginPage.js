import React, { Component } from 'react';
import LoginPages from '../Views/LoginView';
import { ProductConsumer } from '../Data/Context';
import axios from 'axios';

export default class LoginPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: null,
            password: null,
            name: null,
            users: null,
            isValid: true
        }
    }

    componentDidMount() {
        axios.get("https://xebiascart.herokuapp.com/users")
            .then((response) => {
                this.setState({ users: response.data })
            })
        this.redirect()

    }

    onInputChange = (payload) => {
        this.setState({ ...this.state, ...payload });
    }
    onSubmitHandler = (e) => {
        e.preventDefault();
        const validUser = this.state.users.filter(user => user.username === this.state.username && user.password === this.state.password);

        if (validUser.length !== 0) {
            this.setState({ isValid: true, name: validUser[0].fullName }, this.redirectTicketList)
            const _token = Math.floor(Math.random() * 100)
            window.localStorage.setItem('_token', _token)
        } else {
            this.setState({ isValid: false })
        }
    }

    redirect = () => {
        const _token = window.localStorage.getItem('_token');
        if (_token !== null) {
            this.props.history.push('/home');
        } else {
            this.props.history.push('/')
        }
    }

    redirectTicketList = () => {
        // const token = window.localStorage.getItem('_token');
        // if (token != null) {
        //     this.props.history.push('/ticketlist');
        // }

        if (this.state.isValid === true) {
            this.props.history.push('/home')
        }
    }

    render() {
        return (
            <ProductConsumer>
                {
                    value => {

                        return (
                            <LoginPages {...{
                                ...this.state,
                                onInputChange: this.onInputChange,
                                onSubmitHandler: this.onSubmitHandler
                            }} />

                        )
                    }
                }

            </ProductConsumer>
        );
    }

}