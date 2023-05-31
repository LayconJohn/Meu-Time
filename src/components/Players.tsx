import styled from "styled-components";
import { useEffect, useState } from "react";
import { GetPlayersRoute } from "../utils/APIRoutes";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Players({ currentUser, season, setSeason }) {

    const [players, setPlayers] = useState([]);

    function handleChange(e: { target: { name: string; value: string; }; }) {
        setSeason(e.target.value)
    }

    async function getPlayers(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (season === "") {
            toast.error("Por favor selecione uma temporada");
        }
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
            //console.log(data.response);
            setPlayers(data.response);
        } catch (error) {
            toast.error("Erro ao selecionar os jogadores");
        }
    }

    return (
        <Container>
            <div className="players-container">
                <div className="season">
                    <form onSubmit={getPlayers}>
                        <label>Temporada:</label>
                        <input 
                            type="text"
                            placeholder="Ex: 2023"
                            name="season"
                            value={season}
                            onChange={(e) => handleChange(e)}
                        />
                        <button type="submit">Selecionar</button>
                    </form>
                </div>
                <div className="players">
                {season !== "" ?
                  players.map((player, index) => {
                    return (
                        <div className="player" key={index}>
                            <div className="photo">
                                <img src={player.player.photo}/>
                            </div>
                                <div className="player-description">
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
                        </div>
                    )
                  })
                : 
                ""
                }
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
    gap: 1rem;
    align-items: center;
    background-color: #31233E;
    position: relative;

    .season {
        position: absolute;
        top: 0;
        left: 50px;
    }

    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 3.5rem;
        background-color: #00000076;
        border-radius: 2rem;
        margin-bottom: 4.2rem;
        padding: 3rem 5rem;

        label {
            color: white;
            font-size: 1.2rem;
            font-weight: bold;
        }

        input {
        background-color: transparent;
        padding: 1rem; 
        border: 0.1rem solid #671045;
        border-radius: 0.5rem;
        color: #d1dab9;
        width: 100%;
        font-size: 1rem;

        &:focus{
            border: 0.1rem solid #92bea5;
            outline: none;
        }
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
    }

    .players-container {
        max-height: 700px;
        min-width: 500px; 
        display: flex;
        flex-direction: column;
        gap: 3.5rem;
        background-color: #00000076;
        border-radius: 2rem;
        margin-bottom: 4.2rem;
        padding: 3rem 5rem;
        overflow: auto;
        padding-top: 50px;
    }

    .players {
        margin-top: 280px;
    }

    .player {
        display: flex;
        align-items: center;

        .photo {
            img {
                height: 5rem;
                border-radius: 2rem;
            }
        }

        .player-description {
            color: white;
            
            div {
                margin: 0.2rem;
            }
        }
    }
`;