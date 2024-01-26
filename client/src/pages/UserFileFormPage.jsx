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
            const voices = await getVoices()
            console.log(voices)
            // console.log(JSON.parse(voices))
            if(voices){
                // let jsonVoices = JSON.stringify(voices)
                // console.log(jsonVoices)
                // let jsonVoices = JSON.stringify(voices)
                // console.log(voices)
                // for (let voice in voices){
                //     console.log(voice)
                // }

                // let voices_json = JSON.parse(voices)
                // console.log(voices_json)
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
            setVoices(voices)
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

                <div className='flex flex-col'>
                    { <label>Voz: </label>}
                    { <select  label='voice' name='voice' placeholder='Seleccione la voz del lector' {...register('voice')}
                    className='bg-zinc-700 p-3 rounded-lg block w-full mb-3'>
                        { 
                            // <option key={voices} value={voices}>{voices}</option>
                        }
                        { voices.map( voice => (
                            <option key={voice.id} value={voice.id}>{voice.name}</option>
                        ))}
                        {/* <option  value='0' >Masculino</option>
                        <option value='1' >Femenino</option>  */}
                    </select>}

                </div>


                { <input type='file' {...register('pdfFile', {required: true})}
                className='bg-zinc-700 p-3 rounded-lg block w-full mb-3'/> }
                {errors.pdfFile && <span>Este campo es requerido</span>}

                <button className='w-full'>Subir PDF</button>

            </form>
        </div>
    )
}