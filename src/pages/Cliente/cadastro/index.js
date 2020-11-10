//baseado no metodo insert 
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import './Cadastro.css';

class CriarCliente extends Component {
    constructor(props) {
        super(props);

        this.state ={ /**setando os estados iniciais do objeto usado na criação aparentemente*/
            cliente: {
                nome: "",
                end: "",//undefined
                email: "",
                password: "",
                telefone: "",
                cpf: "",
                cep: ""
            },
            erro: null,
            redirect: false
        };
    }

    exibeErro() { //Função executada caso de erro no preenchimento de algum código
        const { erro } = this.state;

        if (erro) {
            return (
                <div className="alert alert-danger" role="alert">
                    Ops! Erro de conexão com o servidor
                </div>
            );
        }
    }

    render() {
        const { redirect } = this.state;

        if (redirect) { //Caso o suario ja exista parece
            return <Redirect to="/produtos" />
        } else {
            return (
                <div className="page-main">
                    <form onSubmit={this.handleSubmit}>
                        <div className="container-form">
                            <h2>Cadastrar</h2>
                            <div className="cliente-insert">
                                <label htmlFor="nome">Nome* </label>
                                <input type="text" id= "nome" name="nome" placeholder="Nome" 
                                    minLength="3" maxLength="100" required value={this.state.cliente.nome} 
                                    onChange={this.handleInputChange} className="input-name" />
                            </div>
                            <div className="cliente-insert">
                                <label htmlFor="cpf">CPF*</label>
                                <input type="text" id="cpf" name="cpf" placeholder="CPF" minLength="11" 
                                maxLength="14" required value={this.state.cliente.cpf} 
                                onChange={this.handleInputChange} className="input-cpf" />
                            </div>
                            <div className="cliente-insert">
                                <label htmlFor="email">Email* </label>
                                <input type="email" id= "email" name="email" placeholder ="email"
                                minLength = "11" maxLength = "100" required value = {this.state.cliente.email} 
                                onChange={this.handleInputChange} className="input-email" />
                            </div>
                            <div className="cliente-insert">
                                <label htmlFor="telefone">Telefone</label>
                                <input type= "tel" id="telefone" name="telefone" placeholder="Telefone" 
                                minLength="8" maxLength="13" value={this.state.cliente.telefone}
                                onChange={this.handleInputChange} className="input-tel" />
                            </div>
                            <div className="cliente-insert">
                                <label htmlFor="end">Endereço* </label>
                                <input type="text" id= "end" name= "end" placeholder= "Endereço" 
                                minLength = "5" maxLength = "100" required value= {this.state.cliente.end} 
                                onChange={this.handleInputChange} />
                            </div>
                            <div className="cliente-insert">
                                <label htmlFor="cep">CEP*</label>
                                <input type="text" id="cep" name="cep" placeholder="CEP" minLength="7" 
                                maxLength="8" required value={this.state.cliente.cep} 
                                onChange={this.handleInputChange} className="input-cep" />
                            </div>
                            <button type="submit" className="btn btn-primary" className="btn-cadastro">
                                Cadastrar
                            </button>
                        </div>
                    </form>
                </div>
            );
        }
    }

    handleInputChange = event => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState(prevState => ({
            cliente: {...prevState.cliente, [name]: value}//no campo que tem o atributa "name" do value ele armazena o valor da box
        }));
        console.log(value);
    };

    handleSubmit = event => { // Usar isso na rota /id/produtos para usar a rota pro carrinho com metodo post
        fetch(`${process.env.REACT_APP_API_URL}/sistema/cadastro/clientes`, {
            method: "post",
            body: JSON.stringify(this.state.cliente),
            headers: {
                "Content-Type": "application/json"
            }
        })

            .then(data => {
                if (data.ok) {
                    this.setState({ redirect: true });
                } else {
                    data.json().then(data => {
                        if (data.error ) {
                            this.setState({erro: data.error});
                        }
                    });
                }
            })
            .catch(erro => this.setState({ erro: erro }));

        event.preventDefault();
    };
}

export default CriarCliente;