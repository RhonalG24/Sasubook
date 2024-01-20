import { Link } from 'react-router-dom'

export function Navigation(){
    return (
        <div className='flex justify-between py-3'>
            
            <Link to='/users' className='font-bold text-3xl mb-4'>
                <h1>SasuBook</h1>
            </Link>
            {/* <button className='bg-indigo-500 px-3 py-2 rounded-lg text-slate-100'> */}
            <button className='text-slate-100'>
                <Link to='/users-create'>Crear usuario</Link>
            </button>
            <button className='text-slate-100'>
                <Link to='/upload_pdf'>Subir PDF</Link>
            </button>
        </div>
    )
}