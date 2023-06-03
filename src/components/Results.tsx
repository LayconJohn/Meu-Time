import styled from "styled-components";
import { useEffect, useState } from "react";
import { GetAllLeaguesByTeamRoute, GetTeamStatisticsRoute } from "../utils/APIRoutes";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Results({ currentUser, season, currentLeague }) {

    const [matches, setMatches] = useState({});
    const [wins, setWins] = useState({});
    const [draws, setDraws] = useState({});
    const [loses, setLoses] = useState({});

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
                //console.log(data.response);
                setMatches(data.response.fixtures.played);
                setWins(data.response.fixtures.wins);
                setDraws(data.response.fixtures.draws);
                setLoses(data.response.fixtures.loses);
            } catch (error) {
                toast.error("Erro ao carregar Os resultados");
            }
        }
        fetchData();
    }, [])

    return(
        <Container>
            <div className="table">
            <div className="table matches">
                <h3>Partidas</h3>
                {matches ? 
                <>
                    <p>Fora: <span>{matches.away}</span></p>
                    <p>Casa: <span>{matches.home}</span></p>
                    <p>Totais: <span>{matches.total}</span></p>
                </>
                :
                ""}
            </div>
            <div className="table wins">
                <h3>Vitórias</h3>
                {wins ? 
                <>
                    <p>Fora: <span>{wins.away}</span></p>
                    <p>Casa: <span>{wins.home}</span></p>
                    <p>Totais: <span>{wins.total}</span></p>
                </>
                :
                ""}
            </div>
            <div className="table draws">
                <h3>Empates</h3>
                {draws ? 
                <>
                    <p>Fora: <span>{draws.away}</span></p>
                    <p>Casa: <span>{draws.home}</span></p>
                    <p>Totais: <span>{draws.total}</span></p>
                </>
                :
                ""}
            </div>
            <div className="table draws">
                <h3>Derrotas</h3>
                {loses ? 
                <>
                    <p>Fora: <span>{loses.away}</span></p>
                    <p>Casa: <span>{loses.home}</span></p>
                    <p>Totais: <span>{loses.total}</span></p>
                </>
                :
                ""}
            </div>
            </div>

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

    .table {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        background-color: #00000076;
        gap: 1.5rem;
        border-radius: 2rem;
        padding: 3rem 3.8rem;

    }

    .matches, .wins, .draws, .loses {
        flex-direction: column;
        align-items: center;
        border-radius: 4rem;
        padding: 1.3rem 3.8rem;

        p {
            color: white;
            text-align: left;
            font-weight: bold;
        }

        span {
            color: #92bea5;
        }
    }
`;