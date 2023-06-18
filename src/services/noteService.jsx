import ApiService from "./ApiService"

class NotasService{
    getNotasUsuario =(id)=>{
        const usuarios= ApiService.get("notasUsuario/"+id)
        return usuarios
    }
    saveNote =(note)=>{
        const usuarios= ApiService.put("atualizaNota/",note)
        return usuarios
    }
    deleteNote =(id)=>{
        const usuarios= ApiService.delete("nota/"+id)
        return usuarios
    }
    createNote =(newNote)=>{
        const usuarios= ApiService.post("criarNota/",newNote)
        return usuarios
    }
} 
export default NotasService;
