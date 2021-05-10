import React, {Component} from "react";
import { Redirect, Link } from "react-router-dom";
import axios from 'axios';
import { faArrowLeft, faArrowRight, faCog, faCogs, faTrash, faUser, faUserCog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Song from "./Song";

class Playlist extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            playlistDataRender: [],
            redirect: null
        }
        this.deleteSong = this.deleteSong.bind(this)
    }

    renderTableRows = () => {
        return this.state.playlistDataRender.map(song => {
            return (
                <tr key={song._id}>
                    <td>{song.name}</td>
                    <td>{song.author}</td>
                    <td>{song.genre}</td>
                    <td>{song.length}</td>
                    <td>
                        <div className="btn-group" role="group">
                            <Link to={"/uptsong/"+song._id} className="btn btn-outline-info"><span className="icon"><FontAwesomeIcon icon={faCog}/></span></Link>
                            <button type="button" className="btn btn-outline-danger" onClick={() => {
                                this.deleteSong(song._id);
                                //funcion para rerenderizar tabla
                            }}><span className="icon"><FontAwesomeIcon icon={faTrash}/></span></button>
                        </div>
                    </td>
                </tr>
            )
        })
    }

    deleteSong(id) {
        try {
            console.log("entro al delete")
            axios.delete("http://MusicXDlb-1119259436.us-east-1.elb.amazonaws.com/api/v1/music/" + id, {
                headers: {
                    authorization: localStorage.getItem("CognitoIdentityServiceProvider.77vh9pav4t3igthjasmd085gn8."+localStorage.getItem("CognitoIdentityServiceProvider.77vh9pav4t3igthjasmd085gn8.LastAuthUser")+".idToken")
                }
            }).then((data) => {
                    window.location.reload()
                }
            )
        } catch (error) {
            console.log("error al borrar")
        }
    }

    async componentDidMount() {
        this.setState({isLoading:true})
        var userdata = JSON.parse(localStorage.getItem("CognitoIdentityServiceProvider.77vh9pav4t3igthjasmd085gn8."+localStorage.getItem("CognitoIdentityServiceProvider.77vh9pav4t3igthjasmd085gn8.LastAuthUser")+".userData"))
        var username = userdata.UserAttributes[0].Value
        axios.get("http://MusicXDlb-1119259436.us-east-1.elb.amazonaws.com/api/v1/music/"+username, {
            headers: {
                authorization: localStorage.getItem("CognitoIdentityServiceProvider.77vh9pav4t3igthjasmd085gn8."+localStorage.getItem("CognitoIdentityServiceProvider.77vh9pav4t3igthjasmd085gn8.LastAuthUser")+".idToken")
            }
        }).then((data) => {
            this.setState({playlistDataRender: data.data, isLoading: false})
        })
    }

    render() {
        const {playlistDataRender, isLoading} = this.state

        if (isLoading) {
            return <div>Loading...</div>
        }


        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Cancion</th>
                                    <th scope="col">Autor</th>
                                    <th scope="col">Genero</th>
                                    <th scope="col">Duracion</th>
                                    <th scope="col">Opciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderTableRows()}  
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <nav aria-label="Page navigation" className="pagination d-flex justify-content-center">
                            <ul className="pagination">
                                <il className="page-item"><a className="page-link"><span className="icon"><FontAwesomeIcon icon={faArrowLeft}/></span></a></il>
                                <il className="page-item"><a className="page-link">1</a></il>
                                <il className="page-item"><a className="page-link">2</a></il>
                                <il className="page-item"><a className="page-link">3</a></il>
                                <il className="page-item"><a className="page-link"><span className="icon"><FontAwesomeIcon icon={faArrowRight}/></span></a></il>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        )
    }
}

export default Playlist