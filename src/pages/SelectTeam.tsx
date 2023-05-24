import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { GetAllTimesRoute, KEY_API } from "../utils/APIRoutes";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { ToastOptions } from "../protocols/toastProtocol";
import Countries from "../components/Countries";
import Teams from "../components/Teams";


//TO-DO: Listar e escolher o time do país (ou liga)
export default function SelectTeam() {
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(undefined);
    const [teams, setTeams] = useState([]);
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
        async function fetchData() {
            try {
                const user = await JSON.parse(`${localStorage.getItem("current-user")}`);
                setCurrentUser(user);
                
                const optionsRequest = {
                    method: "GET",
                    url: `${GetAllTimesRoute}/countries`,
                    headers: {
                      "x-apisports-key": user.apiKey
                    }
                };
                const { data } = await axios.request(optionsRequest);
                //console.log(data);
                setIsLoading(false);
                setCountries(data.response);
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
                    <>
                        <h3>Primeiro, escolha seu país</h3>
                        <Countries 
                            setSelectedCountry={setSelectedCountry}
                            countries={countries} 
                        />
                    </>
                    {selectedCountry !== undefined && (
                        <>
                            <h3>Agora, selecione seu time</h3>
                            <Teams 
                                setTeam={setTeam}
                                setTeams={setTeams}
                                teams={teams} 
                                setCurrentUser={setCurrentUser}
                                selectedCountry={selectedCountry}
                            />
                        </>
                    )}
                </Container> 
            }
            <ToastContainer />
        </>
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

    h3 {
        color: white;
        font-size: 20px;
        margin-top: 3rem;
    }


`;