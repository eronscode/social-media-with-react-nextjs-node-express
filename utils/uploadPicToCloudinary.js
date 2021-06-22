import axios from 'axios';

async function uploadPic(media){
    try {
        const form = new FormData()
        form.append('file', media)
        form.append('upload_preset', 'social_media_app')
        form.append('cloud_name', 'osematthewcl')

        const res = await axios.post(process.env.CLOUDINARY_URL, form)
        return res.data.url
    } catch (error) {
        
    }
}

export {
    uploadPic
}