import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { convertPDFToAudio, getVoices } from '../api/usersFiles.api'
import toast from 'react-hot-toast'

// import { useNavigate, useParams } from 'react-router-dom'

export function UserFileFormPage(){

    const { register, handleSubmit, formState: { errors }, setValue } = useForm()
    const [ voices, setVoices] = useState([])
    // const navigate = useNavigate()
    // const params = useParams()

    const onSubmit = handleSubmit( async (data) => {
        console.log(data)

        // console.log(data.pdfFile[0])
        // for ( const element in data.pdfFile){
        //     console.log(element)
        // }
        // await convertPDFToAudio(data.pdfFile[0])

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

        // await convertPDFToAudio(data)
        // toast.success('Archivo subido', {
        //     position: "bottom-right",
        //     style: {
        //         background: "#101010",
        //         color: "fff"
        //     }
        // })  FUNCIONA!
    })

    useEffect( () => {
        async function loadFileOptions() {
            // const voices = await getVoices().catch( toast.error(
            //     "Hubo un problema al obtener las posibles voces", 
            //     {position: "bottom-right", 
            //     style: {
            //         background: "#101010",
            //         color: "fff"
            //     }}))
            const voices = await getVoices()
            // console.log(typeof(voices))
            // if (voices.contains('Error')){
            //     toast.error(`Hubo un error al obtener las  voces. ${voices}`)
            // }
            console.log(voices)
            // console.log(JSON.parse(voices))
            if(voices){
                setVoices(voices)
                // let jsonVoices = JSON.stringify(voices)
                // console.log(jsonVoices)
                // let jsonVoices = JSON.stringify(voices)
                // console.log(voices)
                // for (let voice in voices){
                //     console.log(voice)
                // }

                // let voices_json = JSON.parse(voices)
                // console.log(voices_json)
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
            // console.log(typeof(voices))
            // console.log(JSON.stringify(voices))
            // let voicesParsed = JSON.parse(voices.voice)
            // console.log(voicesParsed)
            // for (let voice in voices.id){
            //     console.log(voice)
            // }
            // console.log(voices.voice[1])
            // console.log('voice:' ,voices.id)
            setValue('rate', 160)
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
                        { <label className='self-start'>Velocidad de lectura: </label>}
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

                <div className='flex flex-col'>
                    { <label className='self-start'>Voz: </label>}
                    { <select  label='voice' name='voice' placeholder='Seleccione la voz del lector' {...register('voice')}
                    className='bg-zinc-700 p-3 rounded-lg block w-full mb-3'>
                        { 
                            <option key={''} value={''}>Seleccione una voz</option>
                        }
                        { voices.map( voice => (
                            <option key={voice.id} value={voice.id}>{voice.name}</option>
                        ))}
                        {/* <option  value='0' >Masculino</option>
                        <option value='1' >Femenino</option>  */}
                    </select>}
                    {errors.voice && <span className='bg-red-700'>Este campo es requerido</span>}

                </div>


                { <input type='file' {...register('pdfFile', {required: true})}
                className='bg-zinc-700 p-3 rounded-lg block w-full mb-3'/> }
                {errors.pdfFile && <span className='bg-red-700'>Este campo es requerido</span>}

                <button className='w-full mt-4'>Subir PDF</button>

            </form>
        </div>
    )
}