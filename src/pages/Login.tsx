import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import { LoginRoute } from "../utils/APIRoutes";

export default function Login() {

    const navigate = useNavigate();
    const [valuesForm, setValuesForm] = useState({
        username: "",
        apiKey: ""
    });

    useEffect(() => {
        if(localStorage.getItem("current-user")) {
            navigate("/select-team")
        }
    }, [])

    function handleChange(e: { target: { name: string; value: string; }; }) {
        setValuesForm({...valuesForm, [e.target.name]: e.target.value});
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (await validateKEY()) {
            localStorage.setItem("current-user", JSON.stringify(valuesForm));
            navigate("/");
        } else {
            alert("KEY invalid");
        }
    } 

    async function validateKEY(): Promise<boolean> {
        const { username, apiKey } = valuesForm;
        if (apiKey === "" || username === "") {
            return false;
        }
        const optionsRequest = {
            method: "GET",
            url: LoginRoute,
            headers: {
              "x-apisports-key": valuesForm.apiKey
            }
        };

        try {
            /*
            const response = await fetch(optionsRequest.url, {
                "method": optionsRequest.method,
                "headers": optionsRequest.headers
            });
            */
            const response = await axios.request(optionsRequest);
            if (response.status === 200 && response.data !== undefined) {
                return true;
            } else {
                return false;
            }

        } catch (error) {
            console.log(error);
            return false;
        }
    }

    return (
        <Container>
            <form onSubmit={handleSubmit}>
                <div className="logo">
                    <img src={logo} alt="Logo"/>
                </div>
                <input 
                    type="text"
                    placeholder="Usuário"
                    name="username"
                    onChange={(e) => handleChange(e)}
                    min="1"
                />
                <input 
                    type="password"
                    placeholder="API KEY"
                    name="apiKey"
                    onChange={(e) => handleChange(e)}
                    min="1"
                />
                <button type="submit">
                    Entrar
                </button>
            </form>
        </Container>
    )
}

const Container = styled.div`
    height:100vh;
    width:100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    background-color: #31233E;

    .logo {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        
        img {
        height: 15rem;
        border-radius: 2rem;
        }

        h1 {
        color: white;
        text-transform: uppercase;
        }
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 3.5rem;
        background-color: #00000076;
        border-radius: 2rem;
        margin-bottom: 4.2rem;
        padding: 3rem 5rem;

        input {
        background-color: transparent;
        padding: 1rem; 
        border: 0.1rem solid #671045;
        border-radius: 0.5rem;
        color: #d1dab9;
        width: 100%;
        font-size: 1rem;

        &:focus{
            border: 0.1rem solid #92bea5;
            outline: none;
        }
        }
    }

    button {
      background-color: #671045;
      color: white;
      padding: 1rem 2rem;
      border: none;
      font-weight: bold;
      cursor: pointer;
      border-radius: 0.4rem;
      font-size: 1rem;
      text-transform: uppercase;
      transition: 0.5s ease-in-out;
      &:hover {
        background-color: #4e0eff;
      }
      &:active{
        scale: 1.2;
        transform: translateY(3px)
      }
    }

`;