import axios from "axios"
import { storage } from "../utils/storage"

const usersFilesApi = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:8000/sasubook/api/v1/usersFiles/'
})

const pdfsApi = axios.create({
    //aplicar authentication en el back para eliminar

    withCredentials: true,
    baseURL: 'http://localhost:8000/sasubook/pdfs/'
})

export const uploadFile = async (file) => {
    // const formData = new FormData()
    // formData.append('pdf', pdfFile)

    // await axios.post('http://localhost:8000/sasubook/api/v1/convert_pdf_to_audio/', formData, {responseType: 'blob', headers: {'Content-Type': 'multipart/form-data'}} )
    
    return usersFilesApi.post('/', file)
    
}

export const getPdfByUserId = async (userId) =>{
    return pdfsApi.get(`user_pdfs/${userId}`)
}

export const deletePdfById = async (pdfId) => {
    const csrftoken = storage.getcookie('csrftoken')
    return pdfsApi.delete(`delete/${pdfId}/`, 
    {   
        headers: {'X-CSRFToken': csrftoken},
    }
    )
}

// export const convertPDFToAudio = async (pdfFile) => {
//     const formData = new FormData();
//     formData.append('pdf', pdfFile);

//     const response = await axios.post('http://localhost:8000/sasubook/api/v1/convert_pdf_to_audio/', formData, {responseType: 'blob', headers: {'content-type': 'multipart/form-data'}} )
//     // const response = await axios.post('http://localhost:8000/sasubook/api/v1/convert_pdf_to_audio/', formData, {responseType: 'blob'} )

//     console.log(response)
//     console.log('data:', response.data)
//     if(response.data){

//         const audioBlob = new Blob([response.data], {type:'audio/mpeg'})
//         const url = window.URL.createObjectURL(audioBlob);
//         const a = document.createElement('a')
//         a.href = url
//         a.download = 'audio.mp3'
//         // var name = pdfFile.name.split('.')
//         // a.download = `${name[0]}.mp3`
//         // a.click()
//     }else{
//         console.log("No hay data para guardar")
//     }
// }

export const getVoices = async () => {
    try {

        const response = await axios.get('http://localhost:8000/sasubook/api/v1/convert_pdf_to_audio/', null, {} )
        // console.log(response.data)
        // console.log(response)
        return response.data
    }catch (error){
        console.log(error.message)
        // console.log(error.response)
        // return error.message
        return null
    }

    // axios.interceptors.response.use
}

const getPdfName = (data) => {
    let fileName = data.pdfFile[0].name
    let lastDot = fileName.lastIndexOf('.')
    var audioFileName = fileName.substring(0, lastDot)
    return audioFileName
}

export const uploadPdfFile = async (data) => {
    const formData = new FormData();
    formData.append('file', data.pdfFile[0]);
    formData.append('size', data.pdfFile[0].size);
    formData.append('title', `${getPdfName(data)}.pdf`)
    // formData.append('jwt', storage.get('auth'))
    formData.append('user_id', data.id)

    //Traer el ID del context cuando se loguee el usuario, para poder enviar de una vez el id del usuario
    
    const csrftoken = storage.getcookie('csrftoken')
    const response = await axios.post(
        `http://localhost:8000/sasubook/api/v1/pdfs/`, 
        formData, 
        {   
            responseType: 'blob', 
            // headers: {'content-type': 'multipart/form-data', 'X-CSRFToken': storage.getcookie('csrftoken')},
            headers: {'content-type': 'multipart/form-data', 'X-CSRFToken': csrftoken},
            withCredentials: true
        }
    )
    // .then(res => {
    //     console.log(res.data)
    // }).catch( e => {
    //     console.log(e)
    // })
    console.log(response)
    return response.status
}

/*
title = models.CharField(max_length=255) 
    upload_date = models.DateTimeField(auto_now_add=True)
    size = models.CharField(max_length = 50)
    file = models.FileField(upload_to=f'{BASE_DIR}/media/pdfs/',
                            blank=True, 
                            validators=[FileExtensionValidator(allowed_extensions=['pdf'])])
    user_id = models.ForeignKey(AUTH_USER_MODEL, on_delete=models.CASCADE)
*/
export const convertPDFToAudio = async (data) => {
    const formData = new FormData();
    formData.append('pdf', data.pdfFile[0]);
    formData.append('from_page', data.from ? data.from : 1);
    formData.append('to_page', data.to ? data.to : 9999);
    formData.append('rate', data.rate)
    // formData.append('language', data.language)
    formData.append('voice', data.voice)
    var audioFileName = getPdfName(data)
    formData.append('name', audioFileName)
    formData.append('jwt', storage.get('auth'))

    // console.log(storage.getcookie('csrftoken'))
    const csrftoken = storage.getcookie('csrftoken')
    // console.log(`Datos enviados: ${formData.get('name')}`)
    try{
        const uploadStatus = await uploadPdfFile(data)
        console.log(`status: ${uploadStatus}`)
        
    }catch (e){
        console.log(e)
        return

    }
    const response = await axios.post(
        'http://localhost:8000/sasubook/api/v1/convert_pdf_to_audio/', 
        formData, 
        {   
            responseType: 'blob', 
            // headers: {'content-type': 'multipart/form-data', 'X-CSRFToken': storage.getcookie('csrftoken')},
            headers: {'content-type': 'multipart/form-data', 'X-CSRFToken': csrftoken},
            withCredentials: true
        } 
    )


    console.log(response)
    console.log('data:', response.data)
    if(response.data){

        const audioBlob = new Blob([response.data], {type:'audio/mpeg'})
        const url = window.URL.createObjectURL(audioBlob);
        const a = document.createElement('a')
        a.href = url
        // a.download = 'audio.mp3'
        // var name = data.pdfFile[0].name.split('.') //funciona
        // let fileName = data.pdfFile[0].name
        // let lastDot = fileName.lastIndexOf('.')
        // var audioFileName = fileName.substring(0, lastDot)
        a.download = `${audioFileName}.mp3`
        a.click()
    }else{
        console.log("No hay data para guardar")
    }
}

