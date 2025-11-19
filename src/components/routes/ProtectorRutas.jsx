
import { Navigate, Outlet } from "react-router";

const ProtectorRutas = ({usuarioLogueado}) => {
    //pregunto si no estoy logueado
    if(!usuarioLogueado){
        return <Navigate to='/login'/>
    }
    // si soy efectivamente el admin
    return <Outlet/>
};

export default ProtectorRutas;