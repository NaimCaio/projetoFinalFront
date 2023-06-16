import React from 'react'
import LoginService from '../services/loginService'
import NotasService from '../services/noteService'
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faPersonWalkingDashedLineArrowRight, faSquarePlus } from '@fortawesome/free-solid-svg-icons'; // Replace 'faIconName' with the specific icon you want to use


class HomePage extends React.Component {
    loginService = new LoginService();
    notasService = new NotasService();
    constructor(props) {
        super(props);
        this.state = {
            notes: [],
            user: null
        };
        const storedObject = localStorage.getItem('myObject');
        console.log(storedObject)
        if (storedObject !== undefined && storedObject !== null && storedObject !== "") {
            const usuario = JSON.parse(storedObject)
            this.loginService.authUser(usuario).then(resp => {
                console.log(resp[0].id)
                this.setState({ user: usuario });
                console.log(usuario)
                this.notasService.getNotasUsuario(resp[0].id).then(notas => {
                    console.log(notas)
                    const notasSort = notas.sort((a, b) => new Date(b.atualizacao) - new Date(a.atualizacao));
                    console.log(notasSort)
                    this.setState({ notes: notasSort })
                }).catch(e => {
                    console.log(e)
                })
            }).catch(error => {
                console.log("testeee")
                //window.location.replace("login");
            });
        } else {
            window.location.replace("login");
        }



    }
    handleTitleChange = (id, event) => {
        const { notes } = this.state;
        const updatedNotes = notes.map(note => {
            if (note.id === id) {
                return { ...note, title: event.target.value };
            }
            return note;
        });
        this.setState({ notes: updatedNotes });
    }


    handleSaveNote = (note) => {
        // Save note logic
        const noteRequest = {
            id: note.id,
            titulo: note.titulo,
            conteudo: note.conteudo
        }
        this.notasService.saveNote(noteRequest).then(notas => {
            window.location.reload()
        }).catch(e => {
            console.log(e)
        })
    };

    handleDeleteNote = (id) => {
        this.notasService.deleteNote(id).then(resp => {
            window.location.reload()
        }).catch(e => {
            console.log(e)
        })
    };

    handleAddNote = () => {
        this.notasService.addNote().then(resp => {
            window.location.reload()
        }).catch(e => {
            console.log(e)
        })
    };

    logout = () => {
        // Delete note logic
        localStorage.setItem('myObject', "")
        window.location.replace("login");
    };

    handleContentChange = (n, event) => {
        if (n.editMode) {
            const { notes } = this.state;
            const updatedNotes = notes.map(note => {
                if (note.id === n.id) {
                    return { ...note, conteudo: event.target.value };
                }
                return note;
            });
            this.setState({ notes: updatedNotes });
        }

    };

    handletitleChange = (n, event) => {
        if (n.editMode) {
            const { notes } = this.state;
            const updatedNotes = notes.map(note => {
                if (note.id === n.id) {
                    return { ...note, titulo: event.target.value };
                }
                return note;
            });
            this.setState({ notes: updatedNotes });
        }

    };

    toggleEditMode = (id) => {
        const { notes } = this.state;
        const nota = notes.find(note => note.id === id);
        if (nota.editMode) {
            this.handleSaveNote(nota);
        }
        const updatedNotes = notes.map(note => {
            if (note.id === id) {
                return { ...note, editMode: !note.editMode };
            }
            return note;
        });
        this.setState({ notes: updatedNotes });

    };
    formateDate =(originalDate)=>{
        const dateObj = new Date(originalDate);

        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, "0");
        const day = String(dateObj.getDate()).padStart(2, "0");
        const hours = String(dateObj.getHours()).padStart(2, "0");
        const minutes = String(dateObj.getMinutes()).padStart(2, "0");
        //const seconds = String(dateObj.getSeconds()).padStart(2, "0");

        return `${year}-${month}-${day} ${hours}:${minutes}`;

    }


    render() {
        const { notes } = this.state;

        return (
            <div>
                <nav class="navbar navbar-light bg-light justify-content-between">
                    <div style={{
                        marginLeft: "5vw"
                    }} class="navbar-nav">
                        {this.state.user && <h1>{"Olá " + this.state.user.usuario + "!"}</h1>}

                    </div>
                    <div style={{
                        marginRight: "5vw"
                    }} class="ml-auto">
                        <Button id="logout" onClick={() => this.logout()}>
                            <FontAwesomeIcon icon={faPersonWalkingDashedLineArrowRight}/> Logout
                        </Button>
                    </div>
                </nav>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "2vh",
                    marginTop: "5vh"
                }}>
                    {notes.map(note => (
                        <Card key={note.id} style={{ width: '80%' }}>
                            <div style={{
                                display: "flex",
                                marginTop: "2vh",
                                justifyContent: "space-between",
                                margin:"1vh"
                            }}>
                                <FontAwesomeIcon icon={faPenToSquare} size="2x" />
                                <div>{"Ultima atualização: " + (note.atualizacao?this.formateDate(note.atualizacao):this.formateDate(note.criacao)) }</div>
                            </div>
                            <Card.Body>
                                <Card.Title>
                                    <input 
                                            value={note.titulo}
                                            onChange={event => this.handletitleChange(note, event)}
                                            placeholder="Enter note content">
                                    </input>
                                </Card.Title>
                                <Card.Text>
                                    <FloatingLabel controlId={`floatingInput${note.id}`} label="Nota" className="mb-3">
                                        <Form.Control
                                            as="textarea"
                                            value={note.conteudo}
                                            onChange={event => this.handleContentChange(note, event)}
                                            placeholder="Enter note content"
                                        />
                                    </FloatingLabel>
                                </Card.Text>

                                <div style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}>
                                    <Button variant={!note.editMode ? 'success' : 'primary'} onClick={() => this.toggleEditMode(note.id)}>
                                        {note.editMode ? 'Salvar' : 'Editar'}
                                    </Button>

                                    <Button variant="danger" onClick={() => this.handleDeleteNote(note.id)}>
                                        Deletar Nota
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "2vh",
                    marginTop: "2vh"
                }}>
                    <Button type="submit" onClick={() => this.handleAddNote()} label="Adicionar">
                        <FontAwesomeIcon icon={faSquarePlus}/> Nova Nota
                    </Button>
                </div>
            </div>
        );
    }
}

export default HomePage;
