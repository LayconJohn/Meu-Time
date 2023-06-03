import styled from "styled-components";
import { useEffect, useState } from "react";
import { GetAllLeaguesByTeamRoute, GetTeamStatisticsRoute } from "../utils/APIRoutes";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

    const [goalsFor, setGoalsfor] = useState({});
    const [goalsAgainst, setGoalsAgainst] = useState({});

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
`;