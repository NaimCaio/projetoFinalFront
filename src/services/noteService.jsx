import ApiService from "./ApiService"

class NotasService{
    getNotasUsuario =(id)=>{
        const usuarios= ApiService.get("notasUsuario/"+id)
        return usuarios
    }
} 
export default NotasService;