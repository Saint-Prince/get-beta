import Axios from "axios"

export const getContents = (token, id) => 
    Axios.get (       
        `http://localhost:5000/apiv1/vendors/contents/myContents/${id}`,
        {
            headers: { "x-auth-token": token }
        }
    ).then(res => res.data)
        .catch(err => console.log(err))

export const getAllContents = (token) => 
    Axios.get (       
        `http://localhost:5000/apiv1/vendors/contents/users/allContents`,
        {
            headers: { "x-auth-token": token }
        }
    ).then(res => res.data)
        .catch(err => console.log(err))

export const getContentFiles = (token, id) => 
    Axios.get (       
        `http://localhost:5000/apiv1/vendors/contents/${id}/findFiles`,
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

export const getEnrolledContents = (token, id) => 
    Axios.get (       
        `http://localhost:5000/apiv1/vendors/${id}/subscribedContents`,
        {
            headers: { "x-auth-token": token }
        }
    ).then(res => res.data)
        .catch(err => console.log(err))
        
export const getEnrollers = (token, content_id) => 
    Axios.get (       
        `http://localhost:5000/apiv1/vendors/contents/subscribers/${content_id}`,
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

export const deleteContent = (token, content_id) => 
    Axios.delete (       
        `http://localhost:5000/apiv1/vendors/contents/${content_id}`,
        {
            headers: { "x-auth-token": token }
        }
    ).then(res => res.data)
        .catch(err => console.log(err))
