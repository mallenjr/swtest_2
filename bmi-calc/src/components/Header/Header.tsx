import React from 'react';
import styled from 'styled-components';

const NavBar = styled.div`
    flex: 1;
    height: 64px;
    background-color: #355070;
    color: white;
    padding-left: 20px;
    width: 100%;
    display: flex;
    flex-direction: row;
`;

const SignatureContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    height: 64px;
    padding-left: 8px;
`;

const Signature = styled.p`
    font-weight: 400;
    margin-bottom: 0;
    font: inherit;
    font-size: 0.9em;
`;

function Header() {
    return (
        <NavBar>
            <h2>BMI Calculator</h2>
            <SignatureContainer>
                <Signature>By: Michael Allen Jr.</Signature>
            </SignatureContainer>
        </NavBar>
    )
}

export default Header;