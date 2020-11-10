import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

export default class Produto extends Component {
    state = { /*PQ AQUI DIFERENTE DO QUE MOSTRA TODOS OS CLIENTES É SÓ STATE E NÃO UM CONSTRUTOR*/
        produto: {},
    };

    componentDidMount () {/*Aparentemente verifica o componente td vez q foi montado pra ver se n tem nenhum erro*/
        const { idProduto } = this.props.match.params; /*Pesquisar sobre esse tipo*/
        
        fetch(`${process.env.REACT_APP_API_URL}/sistema/produtos/${idProduto}`)
            .then(produto =>
                produto.json().then(produto => this.setState({ produto }))
                )
                .catch(erro => this.setState({ erro }))
    }

    render () {
        const { produto, index } = this.state;

        return (
            <div className="base-details">
                <div className="produto-info">
                    <h1 className="info-nome">{produto.nome}</h1>
                    <h2 className="info-id">ID - {produto.idProduto}</h2>
                    <h2 className="info-cat">Categoria - {produto.catProduto}</h2>
                    <h2 className="info-pc">Preço de custo - {produto.precoCusto}</h2>
                    <h2 className="info-valor">Valor de venda - R${produto.precoVenda}</h2>
                    <b><p className="info-desc">Descrição: - {produto.descricao}</p></b>
                    <br />

                    <Link to={`/produtos`}><button  className="btn-back">Voltar</button></Link> <br />
                </div>
            </div>
        )
    };
}