import React, {Component} from "react"
import Logo from "../Assets/nota.png"
import { Auth } from "aws-amplify"

class Registro extends Component {
    constructor(props) {
        super(props)
        this.state = {
            usuario: "",
            contrasenia: "",
            confcontra: "",
            clasenotificacion: "alert alert-danger d-none"
        }
        this.signUp = this.signUp.bind(this)
        this.onHandleChange = this.onHandleChange.bind(this)
    }

    async signUp(event){
        event.preventDefault()
        if (this.state.contrasenia === this.state.confcontra){
            try {
                await Auth.signUp({
                    username: this.state.usuario,
                    password: this.state.contrasenia
                })
                console.log("se hizo el registro")
            } catch (error) {
                console.log(error.message)
            }
        } else {
            this.setState({
                clasenotificacion: "alert alert-danger"
            })
        }
    }

    onHandleChange(event) {
        this.setState({
            usuario: (event.target.id === 'inputEmail') ? event.target.value : this.state.usuario,
            contrasenia: (event.target.id === 'inputPassword') ? event.target.value : this.state.contrasenia,
            confcontra: (event.target.id === 'inputCPassword') ? event.target.value : this.state.confcontra
        })
    }

    render() {
        return (
            <div className="text-center">
                <form className="form-signin" onSubmit={this.signUp}>
                    <img className="mb-4" src={Logo} alt="Logo" width="72" height="72"></img>
                    <h1 className="h3 mb-3 font-weigth-normal">Registro</h1>
                    <label for="inputEmail" className="sr-only">Email address</label>
                    <input type="email" id="inputEmail" className="form-control required" onChange={this.onHandleChange} placeholder="Direccion Email" required autoFocus></input>
                    <label for="inputPassword" className="sr-only">Password</label>
                    <input type="password" id="inputPassword" className="form-control required" onChange={this.onHandleChange} placeholder="Password" required></input>
                    <label for="inputCPassword" className="sr-only">Confirmar Password</label>
                    <input type="password" id="inputCPassword" className="form-control required" onChange={this.onHandleChange} placeholder="Confirmar Password" required></input>
                    <div className={this.state.clasenotificacion}>Las contraseñas no coinciden!</div>
                    <br/>
                    <button type="submit" className="btn btn-lg btn-primary btn-block">Sign In</button>
                </form>
            </div>
        )
    }
}

export default Registro;