import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { getUser, createUser, deleteUser, updateUser } from '../api/users.api'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'

export function UserFormPage() {

    const { register, handleSubmit, formState: {errors}, setValue } = useForm()
    const navigate = useNavigate()
    const params = useParams()
       
    const onSubmit = handleSubmit( async (data) => {
        console.log(data)
        if(params.id){
            await updateUser(params.id, data)
            toast.success('Usuario actualizado', { 
                position: "bottom-right",
                style: {
                    background: "#101010",
                    color: "fff"
                }
            })
        } else {
            await createUser(data)
            toast.success('Usuario creado', { 
                position: "bottom-right",
                style: {
                    background: "#101010",
                    color: "fff"
                }
            })
        }
        navigate('/users')
    }) 

    useEffect( () => {
        async function loadUser() {
            if( params.id ){
                const { data } = await getUser(params.id)
                setValue('nombre', data.nombre)
                setValue('email', data.email)
            }
        }   
        loadUser()
    }, [])

    return (
        <div className='max-w-xl mx-auto'>
            <form action="" onSubmit={onSubmit}>
                <input type="text" placeholder="nombre de usuario" {...register('nombre', {required: true})}
                className='bg-zinc-700 p-3 rounded-lg block w-full mb-3'/>
                {errors.nombre && <span>Este campo es requerido</span>}
                
                <input type="email" placeholder="correo@email.com" {...register('email', {required: true})}
                className='bg-zinc-700 p-3 rounded-lg block w-full mb-3'/>
                {errors.email && <span>Este campo es requerido</span>}
                

                { !params.id && <input type="password" placeholder="contraseña" {...register('contrasenia', {required: true})}
                className='bg-zinc-700 p-3 rounded-lg block w-full mb-3'/>}
                {errors.contrasenia && <span>Este campo es requerido</span>}
                <button className='w-full'>Guardar</button>
            </form>

            { params.id  && (
                <div className='flex justify-end'>
                    <button className='bg-red-500 mt-3' onClick={ async () => {
                        const accepted = window.confirm('¿Está seguro?')
                        if( accepted ){
                            await deleteUser(params.id)
                            toast.success('Usuario eliminado', { 
                                position: "bottom-right",
                                style: {
                                    background: "#101010",
                                    color: "fff"
                                }
                            })
                            navigate('/users')
                        }
                    }}>Eliminar</button>
                </div>
                )}
        </div>
    )
    
}