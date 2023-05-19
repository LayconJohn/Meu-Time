import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { GetAllTimesRoute, KEY_API } from "../utils/APIRoutes";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { ToastOptions } from "../protocols/toastProtocol";



export default function TeamDashboard() {
    const [teams, setTeams] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
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
        async function fetchData() {
            try {
                const { data } = await axios.get(GetAllTimesRoute, {
                    headers: {
                        "x-rapidapi-host": "v3.football.api-sports.io",
                        'x-rapidapi-key': KEY_API
                    }
                })
                console.log(data.response);
                setIsLoading(false);
                setTeams(data.response);
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
                    {teams.map((value, i) => {
                        return (
                            <div className="team" key={i}>
                                Time
                            </div>
                        )
                    })}
                </Container> 
            }
            <ToastContainer />
        </>
    )
}

const Container = styled.div`

`;