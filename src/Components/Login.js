import React, {Component} from "react";
import { Redirect, Link } from "react-router-dom";
import Logo from "../Assets/nota.png";
import { Auth } from "aws-amplify";

class Login extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            usuario: "",
            contrasenia: "",
            isLoggedIn: false,
            email_input_error: "",
            password_input_error: "",
            notification_class: "alert alert-danger is-hiden",
            notification_message: ""
        }
        this.signIn = this.signIn.bind(this)
        this.onHandleChange = this.onHandleChange.bind(this)
    }

    async signIn(event) {
        event.preventDefault()
        if (this.state.usuario !== "" && this.state.contrasenia !== "") {
            try {
                const user = await Auth.signIn(this.state.usuario, this.state.contrasenia);
                this.setState({isLoggedIn: true})
                console.log(user)
            } catch (error) {
                console.log(error.message);
            }
        } else {

        }
    }

    onHandleChange(event) {
        this.setState({
            usuario: (event.target.id === 'inputEmail') ? event.target.value : this.state.usuario,
            contrasenia: (event.target.id === 'inputPassword') ? event.target.value : this.state.contrasenia
        })
    }

    render() {
        if (this.state.isLoggedIn) return <Redirect to="/playlist"/>
        return (
            <div className="text-center">
                <form className="form-signin" onSubmit={this.signIn}>
                    <img className="mb-4" src={Logo} alt="Logo" width="72" height="72"></img>
                    <h1 className="h3 mb-3 font-weigth-normal">Login</h1>
                    <lable for="inputEmail" className="sr-only">Email address</lable>
                    <input type="email" id="inputEmail" className="form-control required" placeholder="Direccion Email" onChange={this.onHandleChange} required autoFocus></input>
                    <label for="inputPassword" className="sr-only">Password</label>
                    <input type="password" id="inputPassword" className="form-control required" placeholder="Password" required onChange={this.onHandleChange}></input>
                    <br/>
                    <button type="submit" className="btn btn-lg btn-primary btn-block">Sign In</button>
                    <br />
                    <Link to="/signup">Crea una cuenta</Link>
                </form>
            </div>
        )
    }
}

export default Login;