import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { GetAllTimesRoute, KEY_API } from "../utils/APIRoutes";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { ToastOptions } from "../protocols/toastProtocol";
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

export default function TeamDashboard() {
    const navigate = useNavigate();
    const options: string[] = [
        "Lista de jogadores",
        "Formação mais utilizada",
        "Tabela de resultados",
        "Tabela de resultados"
    ]

    const [team, setTeam] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState({});
    const [currentSelected, setCurrentSelected] = useState(undefined);
    const toastOptions: ToastOptions = {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'light',
    };

    function changeOption(index: number, team: Team) {
        setCurrentSelected(index);
        setTeam(team);
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const currenTeam = await JSON.parse(`${localStorage.getItem("current-team")}`);
                if (!currenTeam) {
                    navigate("/select-team");
                    return
                }

                const user = await JSON.parse(`${localStorage.getItem("current-user")}`);
                setCurrentUser(user);
                const optionsRequest = {
                    method: "GET",
                    url: `${GetAllTimesRoute}?name=${currenTeam.name}`,
                    headers: {
                      "x-apisports-key": user.apiKey
                    }
                };
                const { data } = await axios.request(optionsRequest);
                console.log(data);
                setIsLoading(false);
                setTeam(data.response[0]);
            } catch (error) {
                console.log(error);
                //toast.error("Erro ao carregar os times", toastOptions);
                alert("Erro ao carregar o time");
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
                    <h3>Como eu amo o {team.team.name}</h3>
                    <div className="logo">
                        <img src={team.team.logo} alt={team.team.code}/>
                    </div>
                    <div className="options-team">
                        {options.map((option, i) => {
                            return(
                                <div 
                                    className={`option ${i === currentSelected ? "selected" : ""}`} 
                                    key={i}
                                    onClick={() => changeOption(i, team)}    
                                >
                                    {option}
                                </div>
                            )
                        })}
                    </div>
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

    .options-team {
        display: flex;
        flex-direction: column;
        gap: 3.5rem;
        background-color: #00000076;
        border-radius: 2rem;
        margin-bottom: 4.2rem;
        padding: 3rem 5rem;

        .option {
            background-color: #671045;
            min-height: 5rem;
            width: 95%;
            cursor: pointer;
            border-radius: 0.2rem;
            padding: 0.4rem;
            gap: 1rem;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: 0.5s ease-in-out;
            color: white;

            &:hover {
                background-color: #4e0eff;
            }
            &:active{
                scale: 1.2;
                transform: translateY(3px)
            }
        }

        .selected{
            background-color: #9186f3;
    }
    } 


`;