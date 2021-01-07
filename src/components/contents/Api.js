import Axios from "axios"

export const getContents = (token) => 
    Axios.get (       
        `http://localhost:5000/apiv1/vendors/contents/myContents`,
        {
            headers: { "x-auth-token": token }
        }
    ).then(res => res.data)
        .catch(err => console.log(err))
export const getContent = (token, content_id) => 
    Axios.get (       
        `http://localhost:5000/apiv1/vendors/contents/${content_id}`,
        {
            headers: { "x-auth-token": token }
        }
    ).then(res => res.data)
        .catch(err => console.log(err))
export const updateContent = (token, content_id, contentDetails) => 
    Axios.put (       
        `http://localhost:5000/apiv1/vendors/contents/${content_id}`,
        contentDetails,
        {
            headers: { "x-auth-token": token }
        }
    ).then(res => res.data)
        .catch(err => console.log(err))
