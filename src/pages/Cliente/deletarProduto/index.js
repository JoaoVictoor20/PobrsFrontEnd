import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import './index.css';

class DeletarProduto extends Component {
    constructor(props) {
        super(props);

        this.state = {
            produto: {},
            erro: null,
            redirect: false
        };
    }

    exibeErro() {
        const { erro } = this.state;

        if(erro) {
            return (
                <div className="alert alert-danger" role="alert">
                    Erro de conexão com o servidor
                </div>
            );
        }
    }

    componentDidMount() {
        const { idProduto } = this.props.match.params;

        fetch(`${process.env.REACT_APP_API_URL}/sistema/produtos/${idProduto}`)
        .then(data => {
            data.json().then(data => {
                if (data.error) {
                    this.setState({ erro: data.error});
                } else {
                    this.setState({ produto: data});
                }
            });
        })
        .catch(erro => this.setState({ erro: erro}));
    }

    render() {
        const { redirect } = this.state;

        if (redirect) {
            return <Redirect to="/produtos" />;
        } else {
            return (
                <fieldset>
                    <legend>Deletar Produto</legend>
                    <div className="produto-delete">
                        <label htmlFor="nome">Produto: {this.state.produto.nome}
                        </label>

                        <p>Tem certeza que deseja deletar este registro?</p>

                        <button onClick={this.handleClick} className="btn-delete">
                            Remover Produto
                        </button>
                        <Link to={`/produtos`}><button>Voltar</button></Link>
                    </div>
                </fieldset>
            );
        }
    }

    handleClick = event => {
        const { idProduto } = this.props.match.params;

        fetch(`${process.env.REACT_APP_API_URL}/sistema/deleteProduto/${idProduto}`, {
            method: "delete"
        })
            .then(data => {
                if(data.ok) {
                    this.setState({ redirect: true });
                } else {
                    data.json().then(data => {
                        if (data.error) {
                            this.setState({erro: data.error});
                        }
                    });
                }
            })
            .catch(erro => this.setState({erro: erro}));

            event.preventDefault();
    };
}

export default DeletarProduto;