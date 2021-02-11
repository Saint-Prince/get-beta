import React, { useState, useContext } from "react"
import UserContext from "../context/UserContext"
import { useHistory } from "react-router-dom"
import { NaijaBanks } from "./NaijaBanks"
import Axios from "axios"
import "../Auth/auth.css"
import Spinner from "../Misc/Spinner"
import ErrorNotice from "../Misc/ErrorNotice"

export default function CreateWallet () {

    const [business_name, setBusinessName] = useState()
    const [settlement_bank, setBank] = useState()
    const [account_number, setAccountNumber] = useState()
    const [validate, setValidate] = useState("")
    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState();

    const { userData } = useContext(UserContext);
    const history = useHistory();

    const submit = async (e) => {
        setLoading(true)
        e.preventDefault();
        try {
            const newAccount = 
            { business_name, settlement_bank, account_number };
            let id = userData.user.id;
            await Axios.post(
                `http://localhost:5000/apiv1/vendors/${id}/sub_account/create`, 
                newAccount,
                {
                    headers: { "x-auth-token": userData.token }
                }
            );
            setLoading(false)
            history.push(`/profile`)  

        } catch (err) {
            err.response.data.msg && setError(err.response.data.msg); 
        }
    }
    const handleNumber = (e) => {
        let max = 10
        let input = e.target.value;
        if (input.length > max) {
            setValidate("Account number exceeds 10 digits!")
        } else if (input.length < max ) {
            setValidate("Account number is less than 10 digits!")
        } else if (input.length === 10 ){
            setValidate("")
            setAccountNumber(input)
        }
    }
    return <div className="page">
        <h2 style={{ padding: '1rem', color: "#0e5996" }}> Create Wallet </h2>
        {
            error && <ErrorNotice message={error} clearError={() => setError(undefined)} />
        }

        <form className="form" onSubmit={submit}>
            <label htmlFor="business">Business Name </label>
            <input 
                id="business" 
                type="text" 
                required
                placeholder="Enter business name"
                onChange={(e => setBusinessName(e.target.value))} 
            />

            <label htmlFor="acc_no">Account Number </label>
            <input 
                id="acc_no" 
                type="number" 
                required
                placeholder= "Must be 10 digit" 
                onChange={handleNumber}
                style={{
                    outline: "none",
                    padding: "5px",
                    borderRadius: "8px",
                    background: "rgb(240, 248, 255)"
                }}
            />
            {
                validate ? <>
                <p style={{color: "crimson"}}>
                    {validate} 
                </p> <br/> </> : null
            }

            <label htmlFor="bank-name">Select Bank </label>
            <select id="bank-name"
                style = {{
                    outline: "none",
                    padding: "5px",
                    borderRadius: "15px",
                    background: "#f0f8ff",
                    color: "#333"
                }}
            onChange={ (e => setBank(e.target.value)) }
            > 
                {
                    NaijaBanks.map( bank => (
                        <option key={bank.id}> {bank.name} </option>
                    ))
                }    
            </select>
                

                <br/> <br/>
                {
                    isLoading ?
                    <>
                        <span> <Spinner/> </span> <br/>
                    </> : null
                }
            <p> Get Beta accepts 10 percent of transaction  </p> <br/>

            <input type="submit" value="Create Wallet" /> 
        </form>
    </div>
}