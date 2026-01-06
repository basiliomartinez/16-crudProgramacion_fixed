
import { Navigate, Outlet } from "react-router-dom";

const ProtectorRutas = ({usuarioLogueado}) => {
    //pregunto si no estoy logueado
    if(!usuarioLogueado){
        return <Navigate to='/login'/>
    }
    // si soy efectivamente el admin
    return <Outlet/>
};

export default ProtectorRutas;