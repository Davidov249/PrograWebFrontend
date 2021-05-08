import axios from "axios";
import React, {Component} from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

class Song extends Component {
    constructor(props) {
        super(props)
        this.state = {
            nombre: "",
            autor: "",
            genero: "",
            duracion: "",
            exito: true,
            isUpdate: false
        }
        this.onHandleChange = this.onHandleChange.bind(this)
        this.onSubmitSong = this.onSubmitSong.bind(this)
        this.bootstrapAlert = this.bootstrapAlert.bind(this)
    }

    onHandleChange(event) {
        this.setState({
            nombre: (event.target.id === 'inputNombreC') ? event.target.value : this.state.nombre,
            autor: (event.target.id === 'inputAutorC') ? event.target.value : this.state.autor,
            genero: (event.target.id === 'inputGeneroC') ? event.target.value : this.state.genero,
            duracion: (event.target.id === 'inputDuracionC') ? event.target.value : this.state.duracion
        })
    }

    onSubmitSong() {
        try {
            axios.post("http://localhost:1024/api/v1/music", 
            {
                "name": this.state.nombre, 
                "author": this.state.autor,
                "genre": this.state.genero,
                "length": this.state.duracion
            }).then((data) => {
                if (data.status === 201) {
                    this.setState({exito: true})
                    this.setState({
                        nombre: "",
                        autor: "",
                        genero: "",
                        duracion: "",
                    })
                } else {
                    this.setState({exito: false})
                    this.setState({
                        nombre: "",
                        autor: "",
                        genero: "",
                        duracion: "",
                    })
                }
            })
        } catch (error) {
            console.log(error.message)
        }
    }

    bootstrapAlert() {
        if (this.state.exito) {
            toast.success('¡Se agregó la canción con exito!')
        } else {
            toast.error('¡Oh no! Parece que hubo un error')
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="text-center">
                            <form>
                                <h1 className="h3 mb-3 font-weigth-normal">Agregar Cancion</h1>
                                <div className="form-group row">
                                    <label for="inputNombreC" className="col-sm-2 col-form-label">Nombre</label>
                                    <div className="col-sm-8">
                                        <input type="text" id="inputNombreC" value={this.state.nombre} className="form-control" onChange={this.onHandleChange} placeholder="Nombre" required></input>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label for="inputAutorC" className="col-sm-2 col-form-label">Autor</label>
                                    <div className="col-sm-8">
                                        <input type="text" id="inputAutorC" className="form-control" value={this.state.autor} onChange={this.onHandleChange} placeholder="Autor" required></input>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label for="inputGeneroC" className="col-sm-2 col-form-label">Genero</label>
                                    <div className="col-sm-8">
                                        <input type="text" id="inputGeneroC" className="form-control" value={this.state.genero} onChange={this.onHandleChange} placeholder="Genero" required></input>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label for="inputDuracionC" className="col-sm-2 col-form-label">Duracion</label>
                                    <div className="col-sm-8">
                                        <input type="text" id="inputDuracionC" className="form-control" value={this.state.duracion} onChange={this.onHandleChange} placeholder="00:00" required></input>
                                    </div>
                                </div>
                                <br/>
                                <button type="submit" className="btn btn-secondary" onClick={(e) => {
                                    e.preventDefault();
                                    this.onSubmitSong();
                                    this.bootstrapAlert();
                                    }}>Agregar!</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Song