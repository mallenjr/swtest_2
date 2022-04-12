import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from "axios";

const Row = styled.div`
    display: flex;
    flex-direction: row;
`;

const Column = styled(Row)`
    flex-direction: column;
`;

const Container = styled(Column)`
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 100%;
    max-width: 800px;
    padding: 40px 0;
    height: 100px;
`;

const Input = styled.input`
    border-radius: 4px;
    width: 120px;
    margin: 4px 0;
`;

const ModalContainer = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 100;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgba(0,0,0,0.50);
`;

const Modal = styled.div`
    position: relative;
    border-radius: 4px;
    background-color: white;
    border: 0.5px solid #CACACA;
    padding: 8px;
    display: flex;
    flex-direction: column;
    width: 280px;
`;

const Text = styled.p`
    margin: 4px 0;
    font: inherit;
`;

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}
  
function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  
    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }
  
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  
    return windowDimensions;
}

function Calculator() {
    const [feet, updateFeet] = useState('');
    const [inches, updateInches] = useState('');
    const [weight, updateWeight] = useState('');
    const [submit, updateSubmit] = useState(null);
    const [results, updateResults] = useState(null);
    const { height, width } = useWindowDimensions();

    useEffect(() => {
        if (submit === null) {
            return;
        }

        if (feet === '' || inches === '' || weight === '') {
            return;
        }
        
        axios.post(`api/bmi`, {
            feet: parseInt(feet),
            inches: parseInt(inches),
            weight: parseFloat(weight),
        })
        .then(res=>{
            if (res.status !== 200) {
                alert('There was an error. Please try again!');
                return;
            }

            updateResults(res.data);
            updateSubmit(null);
        });
    }, [submit]);

    const onUpdate = e => {
        switch (e.target.placeholder) {
            case 'height (feet)': 
                updateFeet(e.target.value);
                break;
            case 'height (inches)': 
                updateInches(e.target.value);
                break;
            case 'weight (lbs)': 
                updateWeight(e.target.value);
                break;
        }
    }

    if (width < 830) {
        return (
            <Container>
                {results !== null ? (
                    <ModalContainer>
                        <Modal>
                            <Text>Your BMI is: {results.bmi}</Text>
                            <Text>You are categorized as: {results.category}</Text>
                            <Input type={'button'} value="Okay!" style={{ backgroundColor: '#6d597a', color: 'white', width: '120px', alignSelf: 'center', marginTop: '12px' }} onClick={() => updateResults(null)} />
                        </Modal>
                    </ModalContainer>
                ) : (
                    <></>
                )}
                <Column style={{ padding: '30px' }}>
                    <h2>According to the CDC:</h2>
                    <p>Body Mass Index (BMI) is a person’s weight in kilograms (or pounds) divided by the square of height in meters (or feet). A high BMI can indicate high body fatness. BMI screens for weight categories that may lead to health problems, but it does not diagnose the body fatness or health of an individual.</p>
                    <h3>Calculate BMI</h3>
                    <Input type={'number'} value={feet} onChange={onUpdate} placeholder={'height (feet)'} style={{ width: '200px'}} />
                    <Input type={'number'} value={inches} onChange={onUpdate}  placeholder={'height (inches)'} style={{ width: '200px'}} />
                    <Input type={'number'} value={weight} onChange={onUpdate} placeholder={'weight (lbs)'} style={{ width: '200px'}} />
                    <Input type={'button'} value="Calculate" style={{ backgroundColor: '#6d597a', color: 'white', width: '208px' }} onClick={() => updateSubmit(!submit)} />
                </Column>
            </Container>
        );
    }

    return (
        <Container>
            {results !== null ? (
                <ModalContainer>
                    <Modal>
                        <Text>Your BMI is: {results.bmi}</Text>
                        <Text>You are categorized as: {results.category}</Text>
                        <Input type={'button'} value="Okay!" style={{ backgroundColor: '#6d597a', color: 'white', width: '120px', alignSelf: 'center', marginTop: '12px' }} onClick={() => updateResults(null)} />
                    </Modal>
                </ModalContainer>
            ) : (
                <></>
            )}
            <Row>
                <div>
                    <h2>According to the CDC:</h2>
                    <p>Body Mass Index (BMI) is a person’s weight in kilograms (or pounds) divided by the square of height in meters (or feet). A high BMI can indicate high body fatness. BMI screens for weight categories that may lead to health problems, but it does not diagnose the body fatness or health of an individual.</p>
                </div>
                <div style={{ marginLeft: '30px' }}>
                    <h3>Calculate BMI</h3>
                    <Input type={'number'} value={feet} onChange={onUpdate} placeholder={'height (feet)'}/>
                    <Input type={'number'} value={inches} onChange={onUpdate}  placeholder={'height (inches)'}/>
                    <Input type={'number'} value={weight} onChange={onUpdate} placeholder={'weight (lbs)'}/>
                    <Input type={'button'} value="Calculate" style={{ backgroundColor: '#6d597a', color: 'white', width: '120px' }} onClick={() => updateSubmit(!submit)} />
                </div>
            </Row>
        </Container>
    );
}

export default Calculator;