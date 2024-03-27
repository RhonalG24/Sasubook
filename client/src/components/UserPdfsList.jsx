import { useContext, useEffect, useState } from "react"
// import { getAllUsers } from '../api/users.api'
import { getPdfByUserId } from "../api/usersFiles.api"
// import { UserCard } from "./UserCard"
import { PdfCard } from "./PdfCard"
import UserContext from "../contexts/UserContext"

export function UserPdfsList() {
    // const [users, setUsers] = useState([])
    const [pdfs, setPdfs] = useState([])
    const { id } = useContext(UserContext)
    //para ejecutar la función cada vez que se cargue este componente
    useEffect(() => {
        
        async function loadPdfs(){
            const res = await getPdfByUserId(id)
            setPdfs(res.data)
            // console.log(res)
        }
        
        loadPdfs()
        console.log('Página cargada')
    }, [] )
    console.log(pdfs)
    if ( pdfs.length > 0 ){
        return <div className="grid grid-cols-1 gap-3"> 
            <h3 className="flex justify-start ml-3">PDF's subidos:</h3>
            {pdfs.map( pdfFile => (
                <PdfCard key={pdfFile.id} pdfFile={pdfFile}/>
            ))}

        </div>
    } else {
        return <p>No hay PDF's para mostrar</p>
    }
    
}