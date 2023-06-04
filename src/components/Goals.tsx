import styled from "styled-components";
import { useEffect, useState } from "react";
import { GetAllLeaguesByTeamRoute, GetTeamStatisticsRoute } from "../utils/APIRoutes";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

type GoalsByMinutes = {
    "0-15": {
        total: number,
        percentage: string
    },
    "31-45": {
        total: number,
        percentage: string
    },
    "46-60": {
        total: number,
        percentage: string
    },
    "61-75": {
        total: number,
        percentage: string
    },
    "76-90": {
        total: number,
        percentage: string
    },
    "91-105": {
        total: number,
        percentage: string
    },
    "106-120": {
        total: number,
        percentage: string
    }
}

export default function Goals({ currentUser, season, currentLeague }) {
    const minutes: String[] = [
        "0-15",
        "16-30",
        "31-45",
        "46-60",
        "61-75",
        "76-90",
        "91-105",
        "106-120"
    ]

    const [goalsFor, setGoalsfor] = useState({});
    const [goalsAgainst, setGoalsAgainst] = useState({});
    const [optionsGoals, setOptionsGoals] = useState("");

    function handleChange(e: { target: { name: string; value: string; }; }) {
        setOptionsGoals(e.target.value);
    }

    function selectOptionGoal(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (optionsGoals === "for") {
            toast.success("Gols a favor escolhido com sucesso!");
        } else {
            toast.success("Gols contra escolhido com sucesso!");
        }
    }

    useEffect(() => {
        async function fetchData() {
            if (season === "") {
                toast("Por favor selecione uma temporada");
                return;
            }
            if (!currentLeague) {
                toast("Por favor selecione uma Liga");
                return;
            }
            try {
                const currenTeam = await JSON.parse(`${localStorage.getItem("current-team")}`);
                const optionsRequest = {
                    method: "GET",
                    url: `${GetTeamStatisticsRoute}?season=${season}&team=${currenTeam.id}&league=${currentLeague.id}`,
                    headers: {
                      "x-apisports-key": currentUser.apiKey
                    }
                };
                const { data } = await axios.request(optionsRequest);
                console.log(data.response.goals);
                setGoalsfor(data.response.goals.for.minute);
                setGoalsAgainst(data.response.goals.against.minute);
            } catch (error) {
                toast.error("Erro ao carregar os Gols");
            }
        }
        fetchData();
    }, []);

    return(
        <Container>
            {optionsGoals === "" ? 
                <div className="options-goals">
                    <form onSubmit={selectOptionGoal}>
                        <p>Quais gols deseja analisar?</p>
                        <input 
                            type="radio"
                            name="options"
                            value="for"
                            onChange={(e) => handleChange(e)}
                        />Gols a favor 
                        <input 
                            type="radio"
                            name="options"
                            value="against"
                            onChange={(e) => handleChange(e)}
                        />Gols contra
                        <button type="submit">
                            Selecionar
                        </button>
                    </form>
                </div>
            : 
                optionsGoals === "for" ? 
                    <div className="goals for">
                        {minutes.map((minute, i) => {
                            return (
                                <p>
                                    {minute}
                                </p>
                            )
                        })}
                    </div> 
                : 
                    <div className="goals against">

                    </div>     
                }
            <ToastContainer />
        </Container>
    )
} 

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.8rem;
    align-items: center;
    background-color: #31233E;
    position: relative;

    .options-goals {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        background-color: #00000076;
        gap: 1.5rem;
        border-radius: 2rem;
        padding: 3rem 3.8rem;

        form {
            color: white;
            diplay: flex;
            flex-direction: column;
            
            p {
                font-size: 1.2rem;
                font-weight: bold;
            }

            input {
                cursor: pointer;

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
            }
        }
    }
`;