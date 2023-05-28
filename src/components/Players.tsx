import styled from "styled-components";
import { useEffect, useState } from "react";
import { GetPlayersRoute } from "../utils/APIRoutes";
import axios from "axios";

export default function Players({ currentUser }) {
    const [season, setSeason] = useState("");
    const [players, setPlayers] = useState([]);

    function handleChange(e: { target: { name: string; value: string; }; }) {
        setSeason(e.target.value)
    }

    async function getPlayers(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            const currenTeam = await JSON.parse(`${localStorage.getItem("current-team")}`);
            const optionsRequest = {
                method: "GET",
                url: `${GetPlayersRoute}?season=${season}&team=${currenTeam.id}`,
                headers: {
                  "x-apisports-key": currentUser.apiKey
                }
            };
            const { data } = await axios.request(optionsRequest);
            console.log(data.response);
            setPlayers(data.response);
        } catch (error) {
            alert("Erro ao selecionar os jogadores")
        }
    }

    return (
        <Container>
            <div className="players">
                <div className="season">
                    <form onSubmit={getPlayers}>
                        <label>Temporada:</label>
                        <input 
                            type="text"
                            placeholder="Temporada, ex: 2023"
                            name="season"
                            value={season}
                            onChange={(e) => handleChange(e)}
                        />
                        <button type="submit">Selecionar</button>
                    </form>
                </div>
                {season !== "" ?
                  players.map((player, index) => {
                    return (
                        <div className="player" key={index}>
                            <div className="photo">
                                <img src={player.player.photo}/>
                            </div>
                            <div className="name">
                                {player.player.name}
                            </div>
                            <div className="age">
                                {player.player.age}
                            </div>
                            <div className="nationality">
                                {player.player.nationality}    
                            </div> 
                        </div>
                    )
                  })
                : ""}
            </div>
        </Container>
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
`;