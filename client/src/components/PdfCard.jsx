import PropTypes from 'prop-types';

// data:
// {
//     "id": 2,
//     "title": "trozo del cuento",
//     "upload_date": "2024-03-18T20:52:14.898449Z",
//     "size": "54696",
//     "file": "http://localhost:8000/media/pdfs/trozo_del_cuento.pdf",
//     "user_id": 1
// },

export function PdfCard({ pdfFile, deletePdf }){
    const pdfId = pdfFile.id
    const file = pdfFile.file
    const title = pdfFile.title.replaceAll('_', ' ')
    const date = pdfFile.upload_date.substr(0, 10)
    const time = pdfFile.upload_date.substr(11, 8)
    return (
        // <div style={{background: "#101010"}}
        <div className="flex flex-row bg-zinc-800 p-3 hover:bg-zinc-700 hover:cursor-pointer hover:scale-110 transition-all"
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
                    value={pdfId}
                    onClick={(e) => deletePdf(e.target.value)}
                    // onClick={(e) => console.log(e.target.value)}
                >
                    Borrar
                </button>
            </div>
        </div>
    )
}
PdfCard.propTypes = {
    pdfFile: PropTypes.object,
    deletePdf: PropTypes.func
}