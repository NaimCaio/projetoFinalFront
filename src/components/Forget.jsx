import React from 'react'
import { Link } from 'react-router-dom'
import LoginService from '../services/loginService'
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

import 'react-toastify/dist/ReactToastify.css';

import '../App.css'
class ForgetPage extends React.Component {
    loginService = new LoginService();
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            erro: ''
        };
    }
    
    registrar = async (event) => {
        event.preventDefault(); 
        const { first_name, password,confirm } = event.target.elements;
        console.log(password)
        console.log(confirm)
        if(password.value !==confirm.value){
            this.setState({ show: true, erro: "senha e a confirmação devem ser iguais" })
        }else{
            const usuario = {
                usuario: first_name.value,
                senha: password.value
            }
            console.log(usuario)
            this.loginService.updateUser(usuario).then(resp => {
                window.location.replace("login");
            }).catch(error => {
                console.log("teste")
                this.setState({ show: true, erro: "usuário não existe" })
                console.log(error);
            });
        }
        
    };
    render() {
        return (
            <div className="text-center m-5-auto">
                <ToastContainer position="top-end" className="p-3">
                <Toast bg={'danger'} onClose={() => this.setState({ show: false })} show={this.state.show} delay={3000} autohide>
                    <Toast.Header>
                        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                        <strong className="me-auto">Erro</strong>
                        {/* <small>11 mins ago</small> */}
                    </Toast.Header>
                    <Toast.Body>{this.state.erro}</Toast.Body>
                </Toast>
                </ToastContainer>
                
                <h2>Troca senha Bloco de Notas</h2>
                <form onSubmit={this.registrar}>
                    <p>
                        <label>Usuario</label><br />
                        <input type="text" name="first_name" required />
                    </p>
                    <p>
                        <label>Senha</label>
                        <br />
                        <input type="password" name="password" required />
                    </p>
                    <p>
                        <label>Confirmação de senha</label><br />
                        <input type="password" name="confirm" required />
                    </p>
                    <p>
                        <button id="sub_btn" type="submit">Atualizar usuário</button>
                    </p>
                </form>
                <footer>
                    <p>Primeira vez? <Link to="/register">Criar conta</Link>.</p>
                </footer>
            </div>
        );
    }
}
export default ForgetPage;

