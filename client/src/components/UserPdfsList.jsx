import { useContext, useEffect, useState } from "react"
// import { getAllUsers } from '../api/users.api'
import { getPdfByUserId } from "../api/usersFiles.api"
// import { UserCard } from "./UserCard"
import { PdfCard } from "./PdfCard"
import UserContext from "../contexts/UserContext"
import toast from 'react-hot-toast'
import { deletePdfById } from "../api/usersFiles.api"
import { UploadPdfForm } from "./UploadPdfForm"


export function UserPdfsList() {
    // const [users, setUsers] = useState([])
    const [pdfs, setPdfs] = useState([])
    const { id } = useContext(UserContext)

    async function loadPdfs(){
        const res = await getPdfByUserId(id)
        setPdfs(res.data)
        // console.log(res)
    }
    const deletePdf = async (pdfId) => {
        const accepted = window.confirm("¿Estás seguro?");
        if (accepted) {
            await toast.promise(deletePdfById(pdfId), {
                loading: 'Eliminando...',
                success: '¡Se eliminó el archivo de manera exitosa!',
                error: 'Error al eliminar el archivo',
                },{
                position: "bottom-right",
                style: {
                    background: "#101010",
    
                    color: "white",
                },
                success: {
                    duration: 5000
                },
            });
            loadPdfs();
        }
    }
    
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

    return (
        <>
        { pdfs.length > 0 && (
            <div className="grid grid-cols-1 gap-3"> 
               <h3 className="flex justify-start ml-3">PDF's subidos:</h3>
               <div className="flex flex-col max-h-96 overflow-y-auto md:px-8 lg:px-14 gap-3">
                   {pdfs.map( pdfFile => (
                       <PdfCard key={pdfFile.id} pdfFile={pdfFile} deletePdf={deletePdf}/>
                   ))}
   
               </div>
           </div>

        )}

        { pdfs.length === 0 && (
                <p>No hay PDF's para mostrar</p>
        )}
        <UploadPdfForm loadPdfs={loadPdfs} />
        
        </>
    )
}