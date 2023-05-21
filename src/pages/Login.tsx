import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

export default function Login() {

    const navigate = useNavigate();
    const [valuesForm, setValuesForm] = useState({
        username: "",
        apiKey: ""
    });

    function handleChange(e: { target: { name: any; value: any; }; }) {
        setValuesForm({...valuesForm, [e.target.name]: e.target.value});
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (await validateKEY()) {
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
            url: "https://v3.football.api-sports.io/status",
            headers: {
              "x-rapidapi-host": "v3.football.api-sports.io",
              "x-rapidapi-key": valuesForm.apiKey
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
    
`;