import { useNavigate } from "react-router-dom" 


export function UserCard({ user }){
    const navigate = useNavigate()
    
    return (
        // <div style={{background: "#101010"}}
        <div className="bg-zinc-800 p-3 hover:bg-zinc-700 hover:cursor-pointer"
            onClick={ () => { 
                navigate(`/users/${user.id}`)
            }}>
            <h1 className="font-bold uppercase">{user.nombre}</h1>
            <p className="text-slate-400">{user.email}</p>
            <p className="text-slate-400">{user.activo}</p>
            <p className="text-slate-400">{user.fecha_creacion}</p>
            <p className="text-slate-400">{user.ultimo_ingreso}</p>
        </div>
    )
}