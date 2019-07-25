import React, { Component } from 'react';
import jsonp from 'jsonp';

class Transactions extends Component{
    constructor(props){
        super(props);
        this.state = {stockArray :[]};
        this.getSymbols = this.getSymbols.bind(this);
        this.getSymbols();
    }
    getSymbols(){
      
       let allSymbols =  this.props.getTransaction().reduce((sum,value)=>{
            return sum+= value.symbol + ',';
        }, '?symbols=');

        //remove last comma in string
        allSymbols = allSymbols.slice(0,-1);
        let url = 'https://ws-api.iextrading.com/1.0/tops/last' + allSymbols;
        jsonp(url,null,(err,data)=>{
            if(err){
                console.log(err);
            }else{
                this.setState({stockArray: data});
            }
        })


    }
    componentDidMount(){
        //console.log(this.props.getTransaction());
    }
    render(){
        return (
            <div className = 'split'>
                <div id= 'PortfolioContainer'>
                <h1>Transaction </h1>
                    <div id = ''>
                        {this.props.getTransaction().map((action,i)=>{
                          return( <div key ={i}>
                                <div className = 'stockContainer'>
                                    <span className = 'stock'>{action.symbol}</span>
                                    <span className = 'stock'>{action.price}</span>
                                    <span className = 'stock'>{action.size}</span>
                                    <span className = 'stock'>{action.setOnInsert.createAt}</span>
                                </div>
                            </div>)
                        })}
                    </div>
                </div>
                <div id ='PurchaseContainer'>
                    <h1> Current Performance </h1>
                    <div>
                        {this.state.stockArray.map((action,i)=>{
                            return (<div key={i}>
                                <div className = 'stockContainer'>
                                    <span className = 'stock'>{action.symbol}</span>
                                    <span className = 'stock'>{action.price}</span>
                                </div>
                            </div>)
                        })}
                    </div>

                </div>
            </div>
        );
    }
}

export default Transactions;