import ApiService from "./ApiService"

class LoginService{
    getUsers =()=>{
        const usuarios= ApiService.get("users")
        return usuarios
    }
    authUser=(usuario)=>{
        const usuarios= ApiService.post("auth",usuario)
        return usuarios
    }
    updateUser=(usuario)=>{
        const usuarios= ApiService.put("users",usuario)
        return usuarios
    }
    createUser=(usuario)=>{
        const usuarios= ApiService.post("users",usuario)
        return usuarios
    }
} 
export default LoginService;