import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './produtos.css';

export default class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            produto: [],
            erro: null
        };
    }

    componentDidMount () {
        fetch(`${process.env.REACT_APP_API_URL}/sistema/produtos`)
            .then(produto => 
                produto.json().then(produto => this.setState({ produto }))
            )
                .catch(erro => this.setState({ erro }))
    }

    render () {
        const { produto } = this.state;
        //const idCliente = req.params.params.idCliente;
        return (
            <>
            <div className="produto-Options">
            <Link to={`/cadastroProduto`}><button>Inserir novo produto</button></Link>
            </div>

            <div className="produto-list">
                {produto.map((produto, index) => (
                    <div key={index} className="card mb-4">
                        <h3 className="card-header">{produto.nome}</h3>

                        <arcticle key={produto._id}>
                            <img src={`${produto.linkImg}`} alt="#" 
                            width="300px" height="300px"></img>
                            <p><strong>Preço: R$</strong>{produto.precoVenda}</p>
                            <p><strong>Descrição: </strong>{produto.descricao}</p>
                            <div className="buttons">
                            <Link to={`/produtosDetail/${produto.idProduto}`}><button type="submit"className="btn-cadastro-product">Detalhes</button></Link>
                            <Link to={`/deleteProduto/${produto.idProduto}`}><button type="submit" className="btn-cadastro-product">Remover Produto</button></Link>
                            </div>
                        </arcticle>
                    </div>
                ))}
            </div> 
            </>
        )
    };
}