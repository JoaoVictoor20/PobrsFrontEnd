import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import './index.css';

class DeletarUsuario extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cliente: {},
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
        const { id } = this.props.match.params;

        fetch(`${process.env.REACT_APP_API_URL}/sistema/clientes/${id}`)
        .then(data => {
            data.json().then(data => {
                if (data.error) {
                    this.setState({ erro: data.error});
                } else {
                    this.setState({ cliente: data});
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
                    <legend>Deletar Cliente</legend>
                    <div className="cliente-delete">
                        <label htmlFor="nome">Nome do Cliente: {this.state.cliente.nome}
                        </label>
                        <label htmlFor="cpf">CPF do Cliente: {this.state.cliente.cpf}
                        </label>

                        <p>Tem certeza que deseja deletar este registro?</p>

                        <button onClick={this.handleClick} className="btn-delete">
                            Remover
                        </button>
                        <Link to={`/clientes`}><button>Voltar</button></Link>
                    </div>
                </fieldset>
            );
        }
    }

    handleClick = event => {
        const { id } = this.props.match.params;

        fetch(`${process.env.REACT_APP_API_URL}/sistema/clientes/${id}`, {
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

export default DeletarUsuario;