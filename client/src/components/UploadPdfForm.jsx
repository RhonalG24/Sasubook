import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { uploadPdfFile } from '../api/usersFiles.api';
import toast from 'react-hot-toast';
import UserContext from '../contexts/UserContext';
import PropTypes from 'prop-types';


export function UploadPdfForm( props ){
    const { id } = useContext(UserContext)
    const { register, handleSubmit, formState: { errors } } = useForm()

    const onSubmit = handleSubmit( async (data) => {
        data['userId'] = id

        toast.promise(uploadPdfFile(data), {
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
        props.loadPdfs();
        
    })

    return (
        <div className='mx-auto mt-3 w-full'>
            <form action="" onSubmit={onSubmit}>
                <label htmlFor="" className='flex justify-start ml-3'>Subir un nuevo PDF:</label>
                <div className='flex flex-col bg-zinc-800 p-3'>
                    <input type='file' {...register('pdfFile', {required: true})}
                    className='bg-zinc-700 p-3 rounded-lg block w-full mb-3'/> 
                    <button className='w-full mt-2'>Subir PDF</button>
                </div>

                {errors.pdfFile && <span className='bg-red-700'>Este campo es requerido</span>}

            </form>
        </div>
    )
}
UploadPdfForm.propTypes = {
    loadPdfs: PropTypes.func
}
