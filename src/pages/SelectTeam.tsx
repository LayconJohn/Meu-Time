import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { GetAllTimesRoute, KEY_API } from "../utils/APIRoutes";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Countries from "../components/Countries";
import Teams from "../components/Teams";
import { useNavigate } from "react-router-dom"; 

type Team = {
    team: {
        id?: number;
        name: string | undefined;
        code: string | undefined;
        country: string | undefined;
        founded: number | undefined;
        national: boolean;
        logo: string | undefined;
    },
    venue: {
        id: number,
        name: string | undefined,
        address: string | undefined,
        city: string | undefined,
        capacity: number | undefined,
        surface: string | undefined,
        image: string | undefined
    }
}

//TO-DO: Listar e escolher o time do país (ou liga)
export default function SelectTeam() {

    const navigate = useNavigate();

    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(undefined);
    const [teams, setTeams] = useState([]);
    const [team, setTeam] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        async function fecthData() {
            const currenTeam = await JSON.parse(`${localStorage.getItem("current-team")}`);
            if (currenTeam) {
                navigate("/");
            }
        }
        fecthData();
    }, []);

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
                toast.error("Erro ao carregar os times");
            }
        }
        fetchData();
    }, []);

    function selectTeam(team: Team) {
        if (!team) {
            alert("Time não selecionado!");
            return;
        }
        localStorage.setItem("current-team", JSON.stringify(team.team));
        navigate("/");
    }

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
                            <button onClick={() => selectTeam(team)}>
                                Selecionar time
                            </button>
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