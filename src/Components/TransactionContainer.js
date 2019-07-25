import React from 'react';
import Transaction from './Transactions';
import Header from './Header';

function TransactionContainer (props){
    return (
        <div>
            <Header/>
            <Transaction getTransaction={props.getTransaction}/>
        </div>
    );
}

export default TransactionContainer;