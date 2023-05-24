import React, { useState, useEffect } from "react";
import styled from "styled-components";

type Country = {
    flag: string | undefined;
    name: string | undefined;
}

export default function Countries({ countries, setSelectedCountry }) {

    const [currentSelected, setCurrentSelected] = useState(undefined);

    function changeCountry(index: React.Key | number, country: Country) {
        setCurrentSelected(index);
        setSelectedCountry(country);
    }

    return (
        <>
        <Container selected={currentSelected ? "50%" : "100%"}>
            <div className="countries">
                {countries.map((country: Country, i: React.Key | number) => {
                    return(
                        <div 
                            className={`country ${i === currentSelected ? "selected" : ""}`} 
                            key={i}
                            onClick={() => changeCountry(i, country)}    
                        >
                            <div className="flag">
                                <img src={country.flag} alt={country.name}/>
                            </div>
                            <div className="country-name">
                                <p>{country.name}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </Container>
        </>

    )
}

const Container = styled.div`
    display: grid;
    overflow: hidden;
    background-color: #671045;
    height: ${props => props.selected};

    .countries {
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: auto;
        padding-top: 1.5rem;
        gap: 0.8rem;&::-webkit-scrollbar {
            width: 1rem;
            border: 1px solid rgba(255, 255, 255, 0.2);
            &-thum: {
                background-color: black;
                width: 0.9rem;
                border-radius: 1rem;
                border: 1px solid rgba(255, 255, 255, 0.9);
            }
        }

        .country {
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

            .flag {
                img {
                    height: 2rem;
                }
            }

            .country-name {
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