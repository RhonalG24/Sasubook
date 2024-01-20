import axios from "axios"

const usersFilesApi = axios.create({
    baseURL: 'http://localhost:8000/sasubook/api/v1/usersFiles/'
})

export const uploadFile = async (file) => {
    // const formData = new FormData()
    // formData.append('pdf', pdfFile)

    // await axios.post('http://localhost:8000/sasubook/api/v1/convert_pdf_to_audio/', formData, {responseType: 'blob', headers: {'Content-Type': 'multipart/form-data'}} )

    return usersFilesApi.post('/', file)

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

export const convertPDFToAudio = async (data) => {
    const formData = new FormData();
    formData.append('pdf', data.pdfFile[0]);
    formData.append('from_page', data.from);
    formData.append('to_page', data.to);
    formData.append('rate', data.rate)
    // formData.append('language', data.language)
    formData.append('gender', data.gender)

    const response = await axios.post('http://localhost:8000/sasubook/api/v1/convert_pdf_to_audio/', formData, {responseType: 'blob', headers: {'content-type': 'multipart/form-data'}} )

    console.log(response)
    console.log('data:', response.data)
    if(response.data){

        const audioBlob = new Blob([response.data], {type:'audio/mpeg'})
        const url = window.URL.createObjectURL(audioBlob);
        const a = document.createElement('a')
        a.href = url
        a.download = 'audio.mp3'
        var name = data.pdfFile[0].name.split('.')
        a.download = `${name[0]}.mp3`
        a.click()
    }else{
        console.log("No hay data para guardar")
    }
}

