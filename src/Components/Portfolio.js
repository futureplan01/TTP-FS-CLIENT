import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import jsonp from 'jsonp';

class Portfolio extends Component{
    
    constructor (props){
        super(props);
        if(!this.props.isAuth) this.props.verifyToken()
        this.state = {isAuth:false,stockArray: [], symbol: '', price:0,size: 1,error:false};
        this.getStocks = this.getStocks.bind(this);
        this.stockClick = this.stockClick.bind(this);
        this.selectStock = this.selectStock.bind(this);
        this.buyStock = this.buyStock.bind(this);
    }
    buyStock(){
        let value = Number(this.state.size);
        if(this.state.price >= this.props.getAccount()|| !Number.isInteger(value) ){
            this.setState({error:true});
        }else{
            let totalPrice = this.state.symbol * this.state.size;
            totalPrice = totalPrice.toFixed(2);
            //confirm
            let answer = window.confirm(`You are about to buy ${this.state.symbol} for ${totalPrice}`);
            // Buy Stock
            if(answer){
                let newAccount = (Number(this.props.getAccount()) - Number(totalPrice));
                this.props.updateAccount(newAccount);
    
                // save Transaction 
                let transaction = {
                    symbol: this.state.symbol,
                    price: totalPrice,
                    size: this.state.size,
                    setOnInsert: {
                        createdAt: '',
                    }
                }
                this.props.updateTransaction(transaction);
            }
        }
    }
    getStocks(){
        jsonp('https://ws-api.iextrading.com/1.0/tops/last',null,(err,data)=>{
            if(err){
                console.log(err);
            }else{
                this.setState({stockArray: data});
            }
        })
    }
    selectStock(e){
        this.setState({size: e.target.value})
    }
    // Symbol Price Stock
    stockClick(e){
        let values = e.currentTarget.textContent;
        let array = values.split(',');
        this.setState({symbol: array[0], price:array[1]});

    }
    componentDidMount(){
        if(this.state.stockArray.length ===0 && this.props.isAuth)
        this.getStocks();
        
    }
    render(){
        if(!this.props.isAuth){
            return(<Redirect to ="/"/>)
        }
        let ErrorMessage;
        if(this.state.error){
            ErrorMessage = <div> 
                Please Make Sure You Have Enough Cash!
                <br/>
                Or You Have Selected A Whole Number
            </div>
        }
        return (
            <div>
            <h1 id='Portfolio'> Portfolio</h1>
            <div id='Portfolio'>Symbol, Price, Stock</div>
            <div className = 'split'>
                <div id= 'PortfolioContainer'>
                    <div>
                    {this.state.stockArray.map((stock,num)=>{
                         return(
                         <div key={num}>
                             <div className='stockContainer' onClick={this.stockClick}>
                                <span id ='stockSymbol'className ='stock symbol'>{stock.symbol}</span>,
                                <span  className ='stock price'>{stock.price}</span>,
                                <span  className ='stock size'>{stock.size}</span>
                            </div>
                            </div>)
                        })}
                    </div>
                </div>
                <div id='PurchaseContainer'>
                    <div>
                        <div id='Purchase'>Cash - {this.props.getAccount()}</div>
                        <br/>
                        <input readOnly value ={this.state.price*this.state.size} className = 'input'/>
                        <br/>
                        <input onChange={this.selectStock} value={this.state.size} className = 'input'/>
                        <br/>
                        <button onClick={this.buyStock} className = 'button'> BUY</button>
                    </div>
                    {ErrorMessage}
                </div>
            </div>
            </div>
        );
    }
}

export default Portfolio;





