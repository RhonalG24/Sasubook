import toast from 'react-hot-toast'

export function show_success_toast(message){
    setTimeout(() =>{
        
        toast.success(message, {position: "bottom-right", style: {
        background: "#101010",
        color: "white"
        }})
    }, 1)
}

export function show_error_toast(message){
setTimeout(() => {
    toast.error(message, {position: "bottom-right", style: {
    background: "#101010",
    color: "white"
    }})
} ,500)
}

