import Axios from "axios"

export const getUser = (token, id) => 
    Axios.get (       
        `http://localhost:5000/apiv1/vendors/${id}`,
        {
            headers: { "x-auth-token": token }
        }
    ).then(res => res.data)
        .catch(err => console.log(err))