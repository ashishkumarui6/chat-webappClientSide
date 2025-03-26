const REACT_APP_CLOUDINARY_COLUD_NAME = "doircyprq"

const url = `https://api.cloudinary.com/v1_1/${REACT_APP_CLOUDINARY_COLUD_NAME}/auto/upload`


const uploadFile = async (file) => {
    const fromData = new FormData()
    fromData.append("file", file)
    fromData.append("upload_preset", "chat-webapp-file")

    const response = await fetch(url, {
        method: "post",
        body: fromData
    })

    const responseData = await response.json()


    return responseData



}

export default uploadFile