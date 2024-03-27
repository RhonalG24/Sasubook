import { useNavigate } from "react-router-dom" 
import { deletePdfById } from "../api/usersFiles.api"
import toast from 'react-hot-toast'


// data:
// {
//     "id": 2,
//     "title": "trozo del cuento",
//     "upload_date": "2024-03-18T20:52:14.898449Z",
//     "size": "54696",
//     "file": "http://localhost:8000/media/pdfs/trozo_del_cuento.pdf",
//     "user_id": 1
// },

export function PdfCard({ pdfFile }){
    const navigate = useNavigate()
    const pdfId = pdfFile.id
    const file = pdfFile.file
    const title = pdfFile.title.replaceAll('_', ' ')
    const date = pdfFile.upload_date.substr(0, 10)
    const time = pdfFile.upload_date.substr(11, 8)
    return (
        // <div style={{background: "#101010"}}
        <div className="flex flex-row bg-zinc-800 p-3 hover:bg-zinc-700 hover:cursor-pointer "
            // onClick={ () => { 
            //     navigate(`/users/${pdfFile.id}`)
            // }}
            >
            <div className="flex flex-col flex-wrap basis-11/12">

                <p className="font-bold ">{title}  <a href={file} target="_blank" className="font-bold" rel="noreferrer">(abrir)</a></p>
                {/* <p className="text-slate-400">{pdfFile.email}</p>
                <p className="text-slate-400">{pdfFile.activo}</p> */}
                {/* <p className="text-slate-400">Subido el: {pdfFile.upload_date}</p> */}
                <p className="text-slate-400">Subido el {date} a las {time}</p>
                {/* <p className="text-slate-400">{pdfFile.file}</p> */}
            </div>
            {/* <div className="flex-col justify-end"> */}
            <div className="flex flex-col basis-1/4 flex-wrap">
                <button
                    className="bg-red-500 p-3 rounded-lg basis-1/12 md:basis-4/4 my-auto ml-3"
                    onClick={async () => {
                    const accepted = window.confirm("¿Estás seguro?");
                    if (accepted) {
                        toast.promise(deletePdfById(pdfFile.id), {
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
                    }
                    }}
                >
                    Borrar
                </button>
            </div>
        </div>
    )
}