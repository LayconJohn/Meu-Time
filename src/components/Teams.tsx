import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { GetAllTimesRoute } from "../utils/APIRoutes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

export default function Teams({ teams, setTeam, setTeams, setCurrentUser, selectedCountry }) {

    const [currentSelected, setCurrentSelected] = useState(undefined);
    const [isLoading, setIsLoading] = useState(true);

    function changeTeam(index: React.Key | number, team: Team) {
        setCurrentSelected(index);
        setTeam(team);
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const user = await JSON.parse(`${localStorage.getItem("current-user")}`);
                setCurrentUser(user);
                
                const optionsRequest = {
                    method: "GET",
                    url: `${GetAllTimesRoute}?country=${selectedCountry.name}`,
                    headers: {
                      "x-apisports-key": user.apiKey
                    }
                };
                const { data } = await axios.request(optionsRequest);
                console.log(data);
                setIsLoading(false);
                setTeams(data.response);
            } catch (error) {
                console.log(error);
                toast.error("Erro ao carregar os times", toastOptions);
            }
        }
        fetchData();
    }, [])

    return (
        <>
        <Container selected={currentSelected ? "50%" : "100%"}>
            <div className="teams">
                {teams.map((team: Team, i: React.Key | number) => {
                    return(
                        <div 
                            className={`team ${i === currentSelected ? "selected" : ""}`} 
                            key={i}
                            onClick={() => changeTeam(i, team)}    
                        >
                            <div className="logo">
                                <img src={team.team.logo} alt={team.team.code}/>
                            </div>
                            <div className="team-name">
                                <p>{team.team.name}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
            <ToastContainer />
        </Container>
        </>

    )
}

const Container = styled.div`
    display: grid;
    overflow: hidden;
    background-color: #671045;
    height: ${props => props.selected};

    .teams {
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: auto;
        padding-top: 1.5rem;
        gap: 0.8rem;


        .team {
            background-color: #ffffff39;
            min-height: 5rem;
            width: 90%;
            cursor: pointer;
            border-radius: 0.2rem;
            padding: 0.4rem;
            gap: 1rem;
            display: flex;
            align-items: center;
            transition: 0.5s ease-in-out;

            .logo {
                img {
                    height: 2rem;
                }
            }

            .team-name {
                p {
                    color: white;
                }
            }
        }

        .selected{
            background-color: #9186f3;
        }

    }
`;