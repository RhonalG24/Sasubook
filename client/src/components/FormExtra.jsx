export default function FormExtra(){
    return(
        <div className="flex items-center justify-between ">
            <div className="flex items-center">
            <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-slate-400 focus:text-slate-100 border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-400">
                Recuérdame
            </label>
            </div>

            <div className="text-sm">
            <a href="#" className="font-medium text-slate-400 hover:text-slate-100">
                ¿Olvidaste tu contraseña?
            </a>
            </div>
        </div>

    )
}