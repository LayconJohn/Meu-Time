import styled from "styled-components";
import { useEffect, useState } from "react";
import { GetAllLeaguesByTeamRoute, GetTeamStatisticsRoute } from "../utils/APIRoutes";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type League = {
    id: number;
    logo: string;
    name: string;
    type: string;
}

export default function Formation({ currentUser, season, currentLeague, setCurrentLeague }) {
    const [formation, setFormation] = useState();
    const [leagues, setLeagues] = useState([]);
    

    async function selectLeague(league: League) {
        setCurrentLeague(league);
        if (season === "") {
            toast.error("Por favor, antes selecione uma temporada");
        }
        try {
            const currenTeam = await JSON.parse(`${localStorage.getItem("current-team")}`);
            const optionsRequest = {
                method: "GET",
                url: `${GetTeamStatisticsRoute}?season=${season}&team=${currenTeam.id}&league=${league.id}`,
                headers: {
                  "x-apisports-key": currentUser.apiKey
                }
            };
            const { data } = await axios.request(optionsRequest);
            //console.log(data.response.lineups[0]);
            setFormation(data.response.lineups[0]);
        } catch (error) {
            toast.error("Erro ao selecionar a liga")
        }
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const currenTeam = await JSON.parse(`${localStorage.getItem("current-team")}`);
                const optionsRequest = {
                    method: "GET",
                    url: `${GetAllLeaguesByTeamRoute}?team=${currenTeam.id}`,
                    headers: {
                      "x-apisports-key": currentUser.apiKey
                    }
                };
                const { data } = await axios.request(optionsRequest);
                //console.log(data.response);
                setLeagues(data.response);
            } catch (error) {
                toast.error("Erro ao carregar as ligas");
            }
        }
        fetchData();
    }, [])

    return (
        <Container>
            {currentLeague? 
            "" 
            : 
            <div className="leagues">
                <label>Escolha uma liga:</label>
                {leagues.map((league, i) => {
                    return (
                        <div className={`league-name`} key={i} onClick={() => selectLeague(league.league)}>
                            {league.league.name}
                        </div>
                    )
                })}
            </div>
            }
            <div className="formation">
                <div className="league-logo">
                    <img src={currentLeague ? currentLeague.logo : ""} alt={currentLeague? currentLeague.name : ""}/>
                </div>
                <span>
                    A formação utilizada nessa liga é: {formation ? formation.formation : ""}
                </span>
            </div>
            <ToastContainer />
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    background-color: #31233E;
    position: relative;

    .leagues {
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #00000076;
        gap: 1rem;
        border-radius: 2rem;
        padding: 3rem 3.8rem;

        label {
            color: white;
            font-size: 1.2rem;
            font-weight: bold;
        }

        .league-name {
            color: white;
            cursor: pointer;

            &:hover {
                color: #92bea5;
                scale: 1.15;
            }
        }
    }

    .formation {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 3.5rem;
        background-color: #00000076;
        border-radius: 2rem;
        margin-bottom: 4.2rem;
        padding: 3rem 5rem;

        span {
            color: white;
            font-size: 1.5rem;
            font-weight: bold;
        }
    }
`