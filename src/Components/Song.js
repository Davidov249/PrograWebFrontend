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
            isUpdate: false,
            textoToast: ""
        }
        this.onHandleChange = this.onHandleChange.bind(this)
        this.onSubmitSong = this.onSubmitSong.bind(this)
        this.bootstrapAlert = this.bootstrapAlert.bind(this)
        this.onUpgdateSong = this.onUpgdateSong.bind(this)
        axios.get("http://MusicXDlb-1119259436.us-east-1.elb.amazonaws.com/api/v1/music/one/"+this.props.songid, {
            headers: {
                authorization: localStorage.getItem("CognitoIdentityServiceProvider.77vh9pav4t3igthjasmd085gn8."+localStorage.getItem("CognitoIdentityServiceProvider.77vh9pav4t3igthjasmd085gn8.LastAuthUser")+".idToken")
            }
        }).then((data) =>{
            //console.log(data.data.result[0])
            this.setState({
                nombre: data.data.result[0].name,
                autor: data.data.result[0].author,
                genero: data.data.result[0].genre,
                duracion: data.data.result[0].length
            })
        })
    }

    onHandleChange(event) {
        this.setState({
            nombre: (event.target.id === 'inputNombreC') ? event.target.value : this.state.nombre,
            autor: (event.target.id === 'inputAutorC') ? event.target.value : this.state.autor,
            genero: (event.target.id === 'inputGeneroC') ? event.target.value : this.state.genero,
            duracion: (event.target.id === 'inputDuracionC') ? event.target.value : this.state.duracion
        })
    }

    onUpgdateSong() {
        try {
            axios.put("http://MusicXDlb-1119259436.us-east-1.elb.amazonaws.com/api/v1/music/"+this.props.songid, {
                "userid": JSON.parse(localStorage.getItem("CognitoIdentityServiceProvider.77vh9pav4t3igthjasmd085gn8."+localStorage.getItem("CognitoIdentityServiceProvider.77vh9pav4t3igthjasmd085gn8.LastAuthUser")+".userData")).UserAttributes[0].Value,
                "name": this.state.nombre, 
                "author": this.state.autor,
                "genre": this.state.genero,
                "length": this.state.duracion
            },{
                headers: {
                    authorization: localStorage.getItem("CognitoIdentityServiceProvider.77vh9pav4t3igthjasmd085gn8."+localStorage.getItem("CognitoIdentityServiceProvider.77vh9pav4t3igthjasmd085gn8.LastAuthUser")+".idToken")
                }
            }
            ).then((data) => {
                if (data.status === 202) {
                    this.setState({
                        exito: true
                    })
                    this.setState({textoToast: "¡Se actualizó la canción con éxito!"})
                    this.bootstrapAlert();
                } else {
                    this.setState({
                        exito: false
                    })
                    this.bootstrapAlert();
                }
            })
        } catch (error) {
            console.log(error.message)
        }
    }

    onSubmitSong() {
        try {
            axios.post("http://MusicXDlb-1119259436.us-east-1.elb.amazonaws.com/api/v1/music", 
            {
                "userid": JSON.parse(localStorage.getItem("CognitoIdentityServiceProvider.77vh9pav4t3igthjasmd085gn8."+localStorage.getItem("CognitoIdentityServiceProvider.77vh9pav4t3igthjasmd085gn8.LastAuthUser")+".userData")).UserAttributes[0].Value,
                "name": this.state.nombre, 
                "author": this.state.autor,
                "genre": this.state.genero,
                "length": this.state.duracion
            },{
                headers: {
                    authorization: localStorage.getItem("CognitoIdentityServiceProvider.77vh9pav4t3igthjasmd085gn8."+localStorage.getItem("CognitoIdentityServiceProvider.77vh9pav4t3igthjasmd085gn8.LastAuthUser")+".idToken")
                }
            }).then((data) => {
                if (data.status === 201) {
                    this.setState({exito: true})
                    this.setState({
                        nombre: "",
                        autor: "",
                        genero: "",
                        duracion: "",
                    })
                    this.setState({textoToast: "¡Se agregó la canción con éxito!"})
                    this.bootstrapAlert();
                } else {
                    this.setState({exito: false})
                    this.setState({
                        nombre: "",
                        autor: "",
                        genero: "",
                        duracion: "",
                    })
                    this.bootstrapAlert();
                }
            })
        } catch (error) {
            console.log(error.message)
        }
    }

    bootstrapAlert() {
        if (this.state.exito) {
            toast.success(this.state.textoToast)
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
                            <form onSubmit={(e) => {
                                    e.preventDefault();
                                    if (this.props.songid) {
                                        this.onUpgdateSong();
                                    } else{
                                        this.onSubmitSong();
                                    }
                                    }}>
                                <h1 className="h3 mb-3 font-weigth-normal">{this.props.songid ? "Actualizar Cancion" : "Agregar Cancion"}</h1>
                                <div className="form-group row">
                                    <label for="inputNombreC" className="col-sm-2 col-form-label">Nombre</label>
                                    <div className="col-sm-8">
                                        <input type="text" id="inputNombreC" value={this.state.nombre} className="form-control required" onChange={this.onHandleChange} placeholder="Nombre" required></input>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label for="inputAutorC" className="col-sm-2 col-form-label">Autor</label>
                                    <div className="col-sm-8">
                                        <input type="text" id="inputAutorC" className="form-control required" value={this.state.autor} onChange={this.onHandleChange} placeholder="Autor" required></input>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label for="inputGeneroC" className="col-sm-2 col-form-label">Genero</label>
                                    <div className="col-sm-8">
                                        <input type="text" id="inputGeneroC" className="form-control required" value={this.state.genero} onChange={this.onHandleChange} placeholder="Genero" required></input>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label for="inputDuracionC" className="col-sm-2 col-form-label">Duracion</label>
                                    <div className="col-sm-8">
                                        <input type="text" id="inputDuracionC" className="form-control required" value={this.state.duracion} onChange={this.onHandleChange} placeholder="00:00" required></input>
                                    </div>
                                </div>
                                <br/>
                                <button type="submit" className="btn btn-secondary">{this.props.songid ? "Actualizar!" : "Agregar!"}</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Song