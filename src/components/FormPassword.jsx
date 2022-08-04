import React, { useState } from "react";
import styled from "styled-components";
import { lowerCaseLetters, numbers, specialCharacters, upperCaseLetters } from "../../utils/characters";

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Box = styled.div`
  width: 400px;
  height: 400px;
  background-color: #fff;
  padding: 10px 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 11px -3px rgba(0, 0, 0, 0.3);

  display: flex;
  flex-direction: column;

  h3 {
    text-align: center;
    margin: 10px 0 20px;
  }

  .input {
    width: 100%;
    display: flex;
    justify-content: center;

    input {
      width: 100%;
      padding: 10px;
      border: none;
      border-radius: 10px;
      outline: 1px solid lightgray;
      font-size: 15px;
    }

    button {
      padding: 10px;
      background-color: dodgerblue;
      border: none;
      border-radius: 10px;
      margin-left: 10px;
      font-size: 14px;
      font-weight: bold;
      color: #fff;
      cursor: pointer;
    }
  }

  .inputCheckbox {
    width: 100%;
    margin: 40px auto 20px;

    div {
      margin-bottom: 10px;
      label {
        margin-left: 15px;

        &:nth-child(1) {
          margin: 0;
        }
      }

      #input1 {
        width: 100%;
        margin: 5px 0;
        display: block;
      }

      span {
        font-weight: bold;
      }
    }
  }

  button {
    padding: 15px;
    background-color: dodgerblue;
    border: none;
    border-radius: 10px;
    font-size: 14px;
    font-weight: bold;
    color: #fff;
    cursor: pointer;
  }
`;

const FormPassword = () => {
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(8);
  const [includeUppercase, setIncludeUppercase] = useState(false);
  const [includeLowercase, setIncludeLowercase] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);

  const handleClick = () => {
    // console.log(typeof passwordLength, includeUppercase, includeLowercase, includeNumbers, includeSymbols);
    let characterList = '';

    if(includeLowercase) {
        characterList = characterList + lowerCaseLetters;
    }
    if(includeUppercase) {
        characterList = characterList + upperCaseLetters;
    }
    if(includeNumbers) {
        characterList = characterList + numbers;
    }
    if(includeSymbols) {
        characterList = characterList + specialCharacters;
    }

    setPassword(createPassword(characterList));


  }

  const createPassword = (characterList) => {

    let password = '';
    const characterListLength = characterList.length
    
    for (let index = 0; index < passwordLength; index++) {
        const characterIndex = Math.round(Math.random() * characterListLength);
        password = password + characterList.charAt(characterIndex)
    }
    return password;
  }

  const copyInput = () => {
    navigator.clipboard.writeText(password)
  }

  return (
    <Container>
      <Box>
        <h3>Generador de contraseñas</h3>
        <div className="input">
          <input type="text" name="password" defaultValue={password} />
          <button onClick={copyInput}>Copiar</button>
        </div>
        <div className="inputCheckbox">
          <div>
            <label htmlFor="input1" className="input1">
              Seguridad de la contraseña 
            </label> <span>({passwordLength})</span>
            <input
              type="range"
              defaultValue={passwordLength}
              min={8}
              max={50}
              name="password-length"
              id="input1"
              onChange={(e) => setPasswordLength(e.target.value)}
            />
          </div>
          <div>
            <input type="checkbox" name="include-lowercase" id="input2" onChange={() => setIncludeLowercase(!includeLowercase)} />
            <label htmlFor="input2">Incluir letras minúsculas</label>
          </div>
          <div>
            <input type="checkbox" name="include-uppercase" id="input3" onChange={() => setIncludeUppercase(!includeUppercase)} />
            <label htmlFor="input3">Incluir letras mayúsculas</label>
          </div>
          <div>
            <input type="checkbox" name="include-numbers" id="input4" onChange={() => setIncludeNumbers(!includeNumbers)} />
            <label htmlFor="input4">Incluir números</label>
          </div>
          <div>
            <input type="checkbox" name="include-symbols" id="input5" onChange={() => setIncludeSymbols(!includeSymbols)} />
            <label htmlFor="input5">Incluir símbolos</label>
          </div>
        </div>
        <button onClick={handleClick}>Generar Contraseña</button>
      </Box>
    </Container>
  );
};

export default FormPassword;
