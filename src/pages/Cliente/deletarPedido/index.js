import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import './index.css';

class DeletarPedido extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pedido: {},
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
        const { idPedido } = this.props.match.params;

        fetch(`${process.env.REACT_APP_API_URL}/sistema/pedidos/${idPedido}`)
        .then(data => {
            data.json().then(data => {
                if (data.error) {
                    this.setState({ erro: data.error});
                } else {
                    this.setState({ pedido: data});
                }
            });
        })
        .catch(erro => this.setState({ erro: erro}));
    }

    render() {
        const { redirect } = this.state;

        if (redirect) {
            return <Redirect to="/clientes" />;
        } else {
            return (
                <fieldset>
                    <legend>Deletar Pedido</legend>
                    <div className="pedido-delete">
                        <label htmlFor="nome">Produto: {this.state.pedido.nomeProd}
                        </label>

                        <p>Tem certeza que deseja deletar este registro?</p>

                        <button onClick={this.handleClick} className="btn-delete">
                            Remover
                        </button>
                        <br/>
                        <Link to={`/pedidos`}><button>Voltar</button></Link>
                    </div>
                </fieldset>
            );
        }
    }

    handleClick = event => {
        const { idPedido } = this.props.match.params;

        fetch(`${process.env.REACT_APP_API_URL}/sistema/pedidos/${idPedido}`, {
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

export default DeletarPedido;