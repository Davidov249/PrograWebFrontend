import React, { Component } from "react";
import { Auth } from "aws-amplify";
import Logo from "../Assets/nota.png";
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

class Header extends Component {

    constructor(props) {
        super(props)
        this.signOut = this.signOut.bind(this)
    }

    async signOut() {
        try {
            await Auth.signOut({ global: true})
        } catch (error) {
            console.log(error.message)
        }
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light " style={{backgroundColor: "#00695c"}}>
                <a className="navbar-brand">
                    <img src={Logo} width="30" height="30" className="d-inline-block allign-top" alt="Logo"></img>
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="/playlist">Playlist</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/addsong">Agregar Cancion</a>
                        </li>
                    </ul>
                    <hr className="d-block d-sm-block d-md-block d-lg-none"/>
                    <ul className="navbar-nav ml-auto ">
                        {/*<li>
                            <a className="nav-link d-lg-inline-block mb-3 mb-md-0 ml-md-3 ">Perfil</a>
                        </li>*/}
                        <li>
                            <Link to="/login" className="nav-link d-lg-inline-block mb-3 mb-md-0 ml-md-3 " onClick={() => this.signOut}>Cerrar Sesion</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default Header