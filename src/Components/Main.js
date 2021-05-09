import Auth from "@aws-amplify/auth";
import React, {Component} from "react";
import { Redirect } from "react-router-dom";
import Header from "./Header";


class Main extends Component {
    state = {
        login: false,
        verified: false,
    };

    componentDidMount() {
        Auth.currentSession()
            .then((data) => {
                console.log(data);
                this.setState({
                    login: true,
                    verified: true,
                })
            })
            .catch((error) => {
                console.log(error);
                this.setState({
                    login: false,
                    verified: true,
                })
            })
    }

    render() {
        if (this.state.verified)
            if (!this.state.login) return <Redirect to="/login" />
        return (
            <div>
                <Header />
                {this.props.children}
            </div>
        )
    }
}

export default Main