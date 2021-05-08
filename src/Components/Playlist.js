import React, {Component} from "react";
import axios from 'axios';
import { faArrowLeft, faArrowRight, faCog, faCogs, faTrash, faUser, faUserCog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Playlist extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            playlistDataRender: []
        }
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
                            <button type="button" className="btn btn-outline-info"><span className="icon"><FontAwesomeIcon icon={faCog}/></span></button>
                            <button type="button" className="btn btn-outline-danger"><span className="icon"><FontAwesomeIcon icon={faTrash}/></span></button>
                        </div>
                    </td>
                </tr>
            )
        })
    }

    async componentDidMount() {
        this.setState({isLoading:true})
        axios.get("http://localhost:1024/api/v1/music").then((data) => {
            console.log(data.data)
            this.setState({playlistDataRender: data.data, isLoading: false})
        })
        /*const response = await fetch("http://localhost:1024/api/v1/music").then((res) => res.json()).then((data) => {
            console.log(data)
            this.setState({playlistDataRender: data, isLoading: false})
        })*/
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