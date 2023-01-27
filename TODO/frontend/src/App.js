import React, { Component } from 'react';
import logo from './logo.svg';

import UserList from './components/User.js'
import axios from 'axios'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            'users':[]
        }
    }

    componentDidMount() {
        axios.get("http://127.0.0.1:8000/api/users/").then(
            response => {
                const users = response.date
                this.setState(
                        {
                        'users': users
                   }
                )

            }
        ).catch(error => console.log(error))
    }


    render() {
        return(
            <div>
                main app
            </div>
        );
    }
}

export default App;
