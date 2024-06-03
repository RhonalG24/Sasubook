/* eslint-disable react/no-unescaped-entities */
import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { uploadPdfFile, convertPDFToAudio, getVoices, getPdfByUserId } from '../api/usersFiles.api'
import toast from 'react-hot-toast'
import UserContext from '../contexts/UserContext'


export function UserFileFormPage(){

    const { register, handleSubmit, formState: { errors }, setValue } = useForm()
    const [ voices, setVoices] = useState([])
    const [ pdfSourceOption, setPdfSourceOption] = useState('');

    const { id } = useContext(UserContext)
    const [ pdfs, setPdfs ] = useState([])

    useEffect( () => {
        async function loadFileOptions() {

            const voices = await getVoices()

            if(voices){
                console.log(voices)
                setVoices(voices)
            } else {
                toast.error(
                    'Hubo un problema al obtener las voces.', 
                    {position: "bottom-right", 
                    style: {
                        background: "#101010",
                        color: "fff"
                    }}
                )
            }
            setValue('rate', 160)
        }

        async function loadPdfs(){
            const res = await getPdfByUserId(id)
            setPdfs(res.data)
            console.log(res.data)
        }
        
        loadPdfs()
        loadFileOptions()
    }, [])

    const getPdfTitleByPdfId = (fileId) => {
        for(let i = 0; i < pdfs.length; i++){
            let pdf = pdfs[i]
            if (fileId == pdfs[i].id){
                // console.log(pdf.id)
                let lastDot = pdf.title.lastIndexOf('.')
                var audioFileName = pdf.title.substring(0, lastDot)
                return audioFileName
            }
        }
    }

    const onSubmit = handleSubmit( async (data) => {
        data['userId'] = id

        if (pdfSourceOption === 'ownFile'){
            if(data['pdfFile']){
                data['pdfFile'] = null
            }
            data['title'] = getPdfTitleByPdfId(data.pdfId)

            toast.promise(convertPDFToAudio(data), {
                    loading: 'Procesando...',
                    success: '¡Conversión exitosa!',
                    error: 'Error al realizar la conversión',
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
        else if (pdfSourceOption === 'uploadFile') {
            data['pdfId'] = null

            await toast.promise(uploadPdfFile(data), {
                loading: 'Subiendo PDF...',
                success: '¡PDF guardado de manera exitosa!',
                error: 'Error al guardar el PDF',
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
            await toast.promise(convertPDFToAudio(data), {
                loading: 'Procesando...',
                success: '¡Conversión exitosa!',
                error: 'Error al realizar la conversión',
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

            // toast.promise(uploadAndConvertPDFToAudio(data), {
            //         loading: 'Procesando...',
            //         success: '¡Conversión exitosa!',
            //     error: 'Error al realizar la conversión',
            // },{
            //     position: "bottom-right",
            //     style: {
            //         background: "#101010",

            //         color: "white",
            //     },
            //     success: {
            //         duration: 5000
            //     },
            // });
        }

    })

    return (
        <div className='max-w-xl mx-auto'>
            <form action="" onSubmit={onSubmit}>

                <div className='flex justify-between py-3 flex-wrap'>
                    <div className='flex flex-col'>
                        { <label className='self-start'>Desde: </label>}
                        { <input type='number' label='desde' name='from' placeholder='N° de página' {...register('from')}
                        className='bg-zinc-700 p-3 rounded-lg block w-40 mb-3'/>}

                    </div>
                    <div className='flex flex-col'>
                        { <label className='self-start'>Hasta: </label>}
                        { <input type='number' label='hasta' name='to' placeholder='N° de página' {...register('to')}
                        className='bg-zinc-700 p-3 rounded-lg block w-40 mb-3'/>}
                    </div>

                    <div className='flex flex-col'>
                        { <label className='self-start'>Velocidad de lectura: <span>
                            <div className="group relative inline-block">
                                <div className="cursor-pointer text-white bg-slate-800 border border-gray-400 rounded-full min-w-4 px-2">
                                    ?
                                </div>
                                <div className="absolute bg-zinc-700 border border-gray-300 p-2 rounded shadow-lg -mt-8 -ml-2 hidden group-hover:block">
                                    Parabras por minuto
                                </div>
                            </div></span></label>}
                        { <input type='number' label='rate' name='rate' defaultValue='160' placeholder='160 por defecto' required {...register('rate')}
                        className='bg-zinc-700 p-3 rounded-lg block w-40 mb-3'/>}

                    </div>
                </div>

                <div className='flex flex-col'>
                    { <label className='self-start'>Voz: <span>
                        <div className="group relative inline-block">
                            <div className="cursor-pointer text-white bg-slate-800 border border-gray-400 rounded-full min-w-4 px-2">
                                ?
                            </div>
                            <div className="absolute min-w-20 bg-zinc-700 border border-gray-300 p-2 rounded shadow-lg -mt-8 -ml-2 hidden group-hover:block">
                                De acuerdo al idioma del texto en el PDF
                            </div>
                        </div></span></label>}
                    { <select  label='voice' name='voice' placeholder='Seleccione la voz del lector' {...register('voice', {required: true})}
                    className='bg-zinc-700 p-3 rounded-lg block w-full mb-3'>
                        { 
                            <option key={''} value="">Seleccione una voz</option>
                        }
                        { voices.map( voice => (
                            <option key={voice.id} value={voice.id}>{voice.name}</option>
                        ))}
                    </select>}
                    {errors.voice && <span className='bg-red-700'>Este campo es requerido</span>}

                </div>

                <div className='flex flex-col'>

                    { <p className='self-start'>PDF: </p>}
                    <div className='flex justify-around mb-3'>
                        <div className='inline-block'>

                            <input className='mx-2' type="radio" name="SourceOption" id="ownFile" value="ownFile" onChange={(e) => setPdfSourceOption(e.target.value)}/>
                            <label htmlFor="ownFile">PDF's subidos</label>
                        </div>
                        <div className='inline-block'>
                            <input className='mx-2' type="radio" name="SourceOption" id="uploadFile" value="uploadFile" onChange={(e) => setPdfSourceOption(e.target.value)} />
                            <label htmlFor="uploadFile">Subir PDF</label>
                        </div>
                    </div>

                    { pdfSourceOption === 'ownFile' && pdfs.length > 0 && (
                        <div className='flex flex-col'>
                            <select  label='pdfId' name='pdfId' placeholder='Seleccione uno de sus archivos PDF' {...register('pdfId', {required: true})}
                            className='bg-zinc-700 p-3 rounded-lg block w-full mb-3'>
                                { 
                                    <option key={''} value="">Seleccione uno de sus archivos PDF</option>
                                }
                                { pdfs.map( pdfFile => (
                                    <option key={pdfFile.id} value={pdfFile.id}>{pdfFile.title.includes('_') ? pdfFile.title.replaceAll('_', ' ') : pdfFile.title}</option>
                                    ))}
                            </select>
                            {errors.pdfId && <span className='bg-red-700'>Este campo es requerido</span>}

                            <button className='w-full mt-4'>Convertir PDF</button>
                        </div>
                    )}

                    { pdfSourceOption === 'ownFile' && pdfs.length === 0 && (
                        <div className='flex flex-col'>
                            <p>No hay PDF's para mostrar</p>
                        </div>
                    )}


                    { pdfSourceOption === 'uploadFile' && ( 
                        <div className='flex flex-col'>
                            <input type='file' {...register('pdfFile', {required: true})}
                            className='bg-zinc-700 p-3 rounded-lg block w-full mb-3'/> 
                            {errors.pdfFile && <span className='bg-red-700'>Este campo es requerido</span>}
                            
                            <button className='w-full mt-4'>Subir y convertir PDF</button>
                        </div>
                    )}


                </div>


            </form>
        </div>
    )
}