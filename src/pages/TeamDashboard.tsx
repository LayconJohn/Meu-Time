import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { GetAllTimesRoute, KEY_API } from "../utils/APIRoutes";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { ToastOptions } from "../protocols/toastProtocol";
import { useNavigate } from "react-router-dom";



export default function TeamDashboard() {
    const navigate = useNavigate();

    const [teamName, setTeamName] = useState(undefined);
    const [team, setTeam] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState({});
    const toastOptions: ToastOptions = {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'light',
    };

    useEffect(() => {
        async function fecthData() {
            const currenTeam = await JSON.parse(`${localStorage.getItem("current-team")}`);
            if (!currenTeam) {
                navigate("/select-team");
                return
            }
            console.log(currenTeam);
            setTeamName(currenTeam.name);
        }
        fecthData();
    }, []);

    //TO-DO: Adaptar para pegar o time selecionado
    useEffect(() => {
        async function fetchData() {
            try {
                const user = await JSON.parse(`${localStorage.getItem("current-user")}`);
                setCurrentUser(user);
                
                const optionsRequest = {
                    method: "GET",
                    url: `${GetAllTimesRoute}?name=${teamName}`,
                    headers: {
                      "x-apisports-key": user.apiKey
                    }
                };
                const { data } = await axios.request(optionsRequest);
                console.log(data);
                setIsLoading(false);
                setTeam(data.response);
            } catch (error) {
                console.log(error);
                //toast.error("Erro ao carregar os times", toastOptions);
                alert("Erro ao carregar os times");
            }
        }
        fetchData();
    }, []);

    return (
        <>
            {isLoading ?
                "Is loading"
                : 
                <Container>
                    
                </Container> 
            }
            <ToastContainer />
        </>
    )
}

const Container = styled.div`

`;