import React from 'react';
import { Link } from 'react-router-dom';

//header é um component
//cria uma pasta somente para ele pq vai ficar todos arquivos dele em um lugar só

//para importar o css, venho direto aqui tbm
import './header.css';

import logo from '../../images/logo.png';
import LogoText from '../../images/logo-text.png';

//stateless components - criamos componentes por meio de variaveis
//pode tirar os parenteses se desejar
const Header = () => {
    return(
    <>
        <header id="main-header">
            <div className="logo--image">
                <a href="/">
                    <img src={logo} />
                </a>
            </div>
            <div className="logo--text">
                <h2>Pobrs Informática</h2>
            </div>
            <div className="login">
                {/*<button className="login--button" >Entrar</button>*/}
                <a href="/">
                    <img src={logo} />
                </a>
            </div>
        </header>
    </>
    )
};

export default Header;
