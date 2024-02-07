export default function FormAction({
    handleSubmit,
    type='Button',
    action='submit',
    text,
}){
    return(
        <>
        {
            type==='Button' ?
            <button
                type={action}
                // className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-slate-100 bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mt-10"
                // className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-slate-400 hover:text-slate-100 bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:text-slate-100 mt-10"
                className="w-full"
                onSubmit={handleSubmit}
                style={{"background-color": "#1a1a1a"}}
            >

                {text}
            </button>
            :
            <></>
        }
        </>
    )
}