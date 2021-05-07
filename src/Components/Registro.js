import React, {Component} from "react"
import Logo from "../Assets/nota.png"

class Registro extends Component {
    render() {
        return (
            <div className="text-center">
                <form className="form-signin">
                    <img className="mb-4" src={Logo} alt="Logo" width="72" height="72"></img>
                    <h1 className="h3 mb-3 font-weigth-normal">Registro</h1>
                    <lable for="inputNombre" className="sr-only">Nombre</lable>
                    <input type="email" id="inputNombre" className="form-control" placeholder="Nombre" required autoFocus></input>
                    <lable for="inputEmail" className="sr-only">Email address</lable>
                    <input type="email" id="inputEmail" className="form-control" placeholder="Direccion Email" required autoFocus></input>
                    <label for="inputPassword" className="sr-only">Password</label>
                    <input type="password" id="inputPassword" className="form-control" placeholder="Password" required></input>
                    <label for="inputCPassword" className="sr-only">Confirmar Password</label>
                    <input type="password" id="inputCPassword" className="form-control" placeholder="Confirmar Password" required></input>
                    <br/>
                    <button type="submit" className="btn btn-lg btn-primary btn-block">Sign In</button>
                </form>
            </div>
        )
    }
}

export default Registro;