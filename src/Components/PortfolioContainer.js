import React from 'react';
import Portfolio from './Portfolio';
import Header from './Header';

function PortfolioContainer (props){
    return (
        <div>
            <Header/>
            <Portfolio updateAccount={props.updateAccount} isAuth={props.isAuth} verifyToken={props.verifyToken} updateTransaction={props.updateTransaction} getAccount={props.getAccount}/>
        </div>
    );
}

export default PortfolioContainer;
