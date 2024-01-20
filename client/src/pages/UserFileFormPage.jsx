import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { convertPDFToAudio } from '../api/usersFiles.api'
import toast from 'react-hot-toast'

// import { useNavigate, useParams } from 'react-router-dom'

export function UserFileFormPage(){

    const { register, handleSubmit, formState: { errors }, setValue } = useForm()
    // const navigate = useNavigate()
    // const params = useParams()

    const onSubmit = handleSubmit( async (data) => {
        console.log(data)

        // console.log(data.pdfFile[0])
        // for ( const element in data.pdfFile){
        //     console.log(element)
        // }
        // await convertPDFToAudio(data.pdfFile[0])
        await convertPDFToAudio(data)
        toast.success('Archivo subido', { 
            position: "bottom-right",
            style: {
                background: "#101010",
                color: "fff"
            }
        })
    })

    useEffect( () => {
        async function loadFileOptions() {

            setValue('rate', 180)
        }   
        loadFileOptions()
    }, [])

    return (
        <div className='max-w-xl mx-auto'>
            <form action="" onSubmit={onSubmit}>
                {/* <input type="file" placeholder="Archivo PDF" {...register('pdfFile', {required: true})}
                className='bg-zinc-700 p-3 rounded-lg block w-full mb-3'/>
                {errors.pdfFile && <span>Este campo es requerido</span>} */}
                
                <div className='flex justify-between py-3'>
                    <div className='flex flex-col'>
                        { <label>Desde: </label>}
                        { <input type='number' label='desde' name='from' placeholder='N° de página' {...register('from')}
                        className='bg-zinc-700 p-3 rounded-lg block w-40 mb-3'/>}

                    </div>
                    <div className='flex flex-col'>
                        { <label>Hasta: </label>}
                        { <input type='number' label='hasta' name='to' placeholder='N° de página' {...register('to')}
                        className='bg-zinc-700 p-3 rounded-lg block w-40 mb-3'/>}
                    </div>
                    
                    <div className='flex flex-col'>
                        { <label>Velocidad de lectura: </label>}
                        { <input type='number' label='rate' name='rate' defaultValue='200' placeholder='200 por defecto' {...register('rate')}
                        className='bg-zinc-700 p-3 rounded-lg block w-40 mb-3'/>}

                    </div>
                </div>

                <div className='flex justify-between py-3'>
                    {/* <div className='flex flex-col'>
                        { <label>Idioma: </label>}
                        { <input type='select' label='language' name='language' placeholder='Seleccione idioma del texto' {...register('language')}
                        className='bg-zinc-700 p-3 rounded-lg block w-40 mb-3'/>}
                    </div> */}
                </div>

                {/* <div className='flex flex-col'>
                    { <label>Voz: </label>}
                    { <select  label='gender' name='gender' placeholder='Seleccione el género del lector' {...register('gender')}
                    className='bg-zinc-700 p-3 rounded-lg block w-full mb-3'>
                        <option  value='0' >Masculino</option>
                        <option value='1' >Femenino</option> 
                    </select>}
                    
                </div> */}
                

                { <input type='file' {...register('pdfFile', {required: true})} 
                className='bg-zinc-700 p-3 rounded-lg block w-full mb-3'/> }
                {errors.pdfFile && <span>Este campo es requerido</span>}

                <button className='w-full'>Subir PDF</button>

            </form>
        </div>
    )
}