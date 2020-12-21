import Axios from "axios"

export const getContents = (token) => 
    Axios.get (       
        `http://localhost:5000/apiv1/vendors/contents/myContents`,
        {
            headers: { "x-auth-token": token }
        }
    ).then(res => res.data)
        .catch(err => console.log(err))
