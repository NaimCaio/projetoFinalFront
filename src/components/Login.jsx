import React from 'react'
import { Link } from 'react-router-dom'
import LoginService from '../services/loginService'
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

import 'react-toastify/dist/ReactToastify.css';

import '../App.css'
class LoginPage extends React.Component {
    loginService = new LoginService();
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            erro: ''
        };
    }
    
    login = async (event) => {
        event.preventDefault(); 
        const { first_name, password } = event.target.elements;

        // Log the input values
        console.log('Username:', first_name.value);
        console.log('Password:', password.value);
        const usuario = {
            usuario: first_name.value,
            senha: password.value
        }
        console.log()
        this.loginService.authUser(usuario).then(resp => {
            console.log(resp[0])
            localStorage.setItem('myObject', JSON.stringify(resp[0]));
            window.location.replace("home");
        }).catch(error => {
            this.setState({ show: true, erro: error })
            console.log(error);
        });
        //const teste= await ;

        // Perform additional login logic or API call here
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
                
                <h2>Login Bloco de Notas</h2>
                <form onSubmit={this.login}>
                    <p>
                        <label>Usuario</label><br />
                        <input type="text" name="first_name" required />
                    </p>
                    <p>
                        <label>Senha</label>
                        <Link to="/forget-password"><label className="right-label">Esqueceu a senha?</label></Link>
                        <br />
                        <input type="password" name="password" required />
                    </p>
                    <p>
                        <button id="sub_btn" type="submit">Login</button>
                    </p>
                </form>
                <footer>
                    <p>Primeira vez? <Link to="/register">Criar conta</Link>.</p>
                </footer>
            </div>
        );
    }
}
export default LoginPage;

// export default function SignInPage() {
//     return (
//         <div className="text-center m-5-auto">
//             <h2>Sign in to us</h2>
//             <form action="/home">
//                 <p>
//                     <label>Username or email address</label><br/>
//                     <input type="text" name="first_name" required />
//                 </p>
//                 <p>
//                     <label>Password</label>
//                     <Link to="/forget-password"><label className="right-label">Forget password?</label></Link>
//                     <br/>
//                     <input type="password" name="password" required />
//                 </p>
//                 <p>
//                     <button id="sub_btn" type="submit">Login</button>
//                 </p>
//             </form>
//             <footer>
//                 <p>First time? <Link to="/register">Create an account</Link>.</p>
//                 <p><Link to="/">Back to Homepage</Link>.</p>
//             </footer>
//         </div>
//     )
// }