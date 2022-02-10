import React from "react";
import { useState, useContext } from "react";
import { renderMatches } from "react-router";

import Title from "../Header/Header";
import Context from "../context/context";
import { apiUrl ,devUrl } from "../../config/api";
import {useNavigate} from "react-router";



function PlaceOrder () {
     
    const {context, setContext} = useContext(Context)
    
    const navigate = useNavigate()

    function redirectToHome() {
        navigate('/')
    }

    let payloadDataForPizzas = context.cartFinalised;
    //console.log(payloadDataForPizzas)

    let someVariable = payloadDataForPizzas.map(element => {
        return {
            name: element.name,
            base: element.base,
            sauce: element.sauce,
            toppings: element.toppings
        }
    });
    console.log(someVariable)

    const [state , setState]= useState({
        user_id: 1,
        pizza: someVariable,
            side:[],
            drink:[],
    })



    function getPizzacart() 
    {
        let data = context.cartFinalised;//this could also be session storage in the live, but because I have to KEEP F**KING RESTARTING VITE TO GET IT TO UPDATE, thatway lies madness
            //data = JSON.parse(data)
            //console.log(data)

            if (data!= null)
                return(
                        data.reduce(
                            (sum, {price}) => sum + price, 0
                        ).toFixed(2)
                    )
            else return(console.log("There is no cart"))
        }

    const sendCartToBackEnd=() =>{
        
        const payloadForbackEnd ={  
            "user_id":1,
            "pizza": state.pizza,
            "side": state.side,
            "drink": state.drink
        }
        console.log(payloadForbackEnd)

        devUrl.post('/api/orders/new', payloadForbackEnd)
        .then(function (response) {
            if(response.status === 201){
                setState(prevState => ({
                    ...prevState,
                    'successMessage' : 'Order successful. Redirecting to home page..'
                }))
                redirectToHome();
                console.log(null)
            } else{
                console.log("Some error ocurred");
            }
        })
        .catch(function (error) {
            console.log(error);
        });   
    }
    
    return(
        <>
        <h1>Place Order Page</h1>
        <div>Your total: {getPizzacart()}</div>
        <button onClick={sendCartToBackEnd}>Place Order</button>
        <div>Your Pizzas will be ready in 30 minutes!</div>
        </>
    )

}

export default PlaceOrder