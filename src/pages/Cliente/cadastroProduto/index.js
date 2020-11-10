import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import './cadastroProduto.css';

class CadastrarProduto extends Component {
    constructor(props){
        super(props);

        this.state = {
            produto: {
                nome: "",
                precoCusto: null,
                precoVenda: null,
                catProduto: null,
                descricao: '',
                linkImg: ""
            },
            erro: null,
            redirect: false
        };
    }

    exibeErro() {
        const { erro } = this.state;

        if(erro) {
            return (
                <div className="alert alert-danger" role="alert">
                    Ops" Erro de conexão com o servidor
                </div>
            )
        }
    }

    render() {
        const { redirect } = this.state;

        if(redirect) {
            return <Redirect to="/produtos"/>
        } else {
            return (
                <div className="main-base-p">
                    <form onSubmit={this.handleSubmit}>
                        <div>
                            <h1>Inserir novo Produto</h1>
                            <div className="produto-insert">
                                <label htmlFor="nome">Nome do produto* </label>
                                <input type="text" id= "nome" name="nome" placeholder="nome" minLength="3" 
                                maxLength="100" required value={this.state.produto.nome} 
                                onChange={this.handleInputChange} className="product-name" />
                            </div>
                            <div className="produto-insert">
                                <label htmlFor="precoCusto">Preço de custo* </label>
                                <input type="text" id= "precoCusto" name="precoCusto" placeholder= "Preço de custo" 
                                minLength = "2" maxLength = "100" required value= {this.state.produto.precoCusto} 
                                onChange={this.handleInputChange} className="price-product" />
                            </div>
                            <div className="produto-insert">
                                <label htmlFor="precoVenda">Preço de venda* </label>
                                <input type="text" id= "precoVenda" name="precoVenda" placeholder ="Preço de Venda" 
                                minLength = "2" maxLength = "100" required value = {this.state.produto.precoVenda} 
                                onChange={this.handleInputChange} className="price-sell" />
                            </div>
                            <div className="produto-insert">
                                <label htmlFor="catProduto">Categoria do produto</label>
                                <input type= "text" id="catProduto" name="catProduto" 
                                placeholder="Numero categoria do produto" minLength="0"  maxLength="3" 
                                value={this.state.produto.catProduto} onChange={this.handleInputChange} 
                                className="product-category" />
                            </div>
                            <div className="produto-insert">
                                <label htmlFor="descricao">Descrição do produto*</label>
                                <input type="text" id="descricao" name="descricao" placeholder="descrição" 
                                minLength="10" maxLength="250" required value={this.state.produto.descricao} 
                                onChange={this.handleInputChange} className="descript-product" />
                            </div>
                            <div className="produto-insert">
                                <label htmlFor="linkImg">Link/URL imagem do produto</label>
                                <input type="text" id="linkImg" name="linkImg" placeholder="URL Da imagem" 
                                minLength="7" maxLength="255" value={this.state.produto.linkImg} 
                                onChange={this.handleInputChange} className="url" />
                            </div>
                            <button type="submit" className="btn-cadastro-product">Cadastrar Produto</button>
                        </div>
                    </form>
                </div>
            )
        }
    }

    handleInputChange = event => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState(prevState => ({
            produto: {...prevState.produto, [name]: value}//no campo que tem o atributa "name" do value ele armazena o valor da box
        }));
        console.log(value);
    };

    handleSubmit = event => { // Usar isso na rota /id/produtos para usar a rota pro carrinho com metodo post
        fetch(`${process.env.REACT_APP_API_URL}/sistema/cadastro/produtos`, {
            method: "post",
            body: JSON.stringify(this.state.produto),
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

export default CadastrarProduto;