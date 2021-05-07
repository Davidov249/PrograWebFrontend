import React, {Component} from "react"
import Logo from "../Assets/nota.png"

class Login extends Component {
    render() {
        return (
            <div className="text-center">
                <form className="form-signin">
                    <img className="mb-4" src={Logo} alt="Logo" width="72" height="72"></img>
                    <h1 className="h3 mb-3 font-weigth-normal">Login</h1>
                    <lable for="inputEmail" className="sr-only">Email address</lable>
                    <input type="email" id="inputEmail" className="form-control" placeholder="Direccion Email" required autoFocus></input>
                    <label for="inputPassword" className="sr-only">Password</label>
                    <input type="password" id="inputPassword" className="form-control" placeholder="Password" required></input>
                    <br/>
                    <button type="submit" className="btn btn-lg btn-primary btn-block">Sign In</button>
                </form>
            </div>
        )
    }
}

export default Login;