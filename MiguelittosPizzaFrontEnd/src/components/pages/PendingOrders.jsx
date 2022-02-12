import React from "react";
import { useEffect, useState } from "react";
import Title from "../Header/Header";
import apiUrl from "../../config/api";

const PendingOrders = () =>{
    //Url locations
    const summonOrdersURL = '/api/admin/orders/index'
    const putOrdersURL = '/api/admin/orders/'
    //state for saving order data from server
    const [orders, setOrders] = useState([])

    //get the orders from the server
    useEffect(async () => {
        console.log("Orders fetched")
          try{
            const {status, data} = await apiUrl.get(summonOrdersURL) 
            console.log (status, data)
            setOrders(data)
          }
          catch(error){
              console.error(error + " in order fetch")
          }
      }, [])
      //refresh the page to reload the orders
      function refreshPage(){
          window.location.reload(false);
      }
    //function to mark order as complete on the server and refresh the page
    const MarkOrderComplete = () => {
        
        const orderIDASecondTime = orders.map((newOrder, orderIndex) => {
           return (newOrder.id)
        })

        const payload = {
            "complete": true
        }
            apiUrl.put(putOrdersURL+orderIDASecondTime, payload)
            .then(function (response) {
                if(response.status === 201)
                {
                    console.log('success: Order marked complete')
                    refreshPage()
                } else{
                    console.log("Some error ocurred");
                }
            })
            .catch(function (error) {
                console.log(error);
            });   
      }
//function to return each order
   function returnOrders(){ 
       
       const EachOrder = orders.map((newOrder, orderIndex) => {
        
            return(
                <>
                <div id='OuterCard' className="card border-dark mb-3"style={{width: 33 +'em'}} >
                    <div id ='wholecard'>
                        <div id='everything but the button'>
                            <div id='header' className="card-header">
                                <div id='orderIDnumber'>
                                Order ID: {newOrder.id}
                                </div>
                                <div id='orderName'>
                                Name: {newOrder.name}
                                </div>
                            </div>
                            <div id="BodyContent" className="card-body text-dark">
                                <div id='EachPizza'>{newOrder.pizza.map((aPizza,idx) =>(
                                    // return each pizza in the order
                                    <><div id="pizzaName" className="card-title">
                                        <p>Pizzas Type: {aPizza.name}</p>
                                    </div>
                                    <div id="aboutApizza" className="card-text">
                                        <div id="pizzabase" >
                                               <p>Pizza base: {aPizza.base}</p>
                                        </div>
                                        <div id="Pizza Sauce">
                                               <p>Pizza Sauce: {aPizza.sauce}</p>
                                        </div>
                                        <div id ='pizzaToppings'>
                                               <p> Pizza Toppings:</p>
                                                <div id="justCode">{Object.keys(aPizza.toppings).map(function (key) {
                                                    var topping = aPizza.toppings[key];
                                                    return (//return each topping on the pizza
                                                        <div id="eachTopping">
                                                         <p>{key}: {topping}</p> 
                                                        </div>
                                                    );
                                                }
                                                )}
                                                </div>
                                        </div>
                                    </div>
                                        </>
                                    ))
                                }
                                </div>
                                <div id="drinks">
                                Drinks: {newOrder.drink}
                                </div>
                                <div id="sides">
                                Sides: {newOrder.side}
                                </div>
                            </div>
                        </div>
                        <div id="markCompleteButton">
                            <button onClick={MarkOrderComplete} className='btn btn-success'>Mark Complete</button>
                        </div>
                    </div>
                </div>
                </>
            )
    })
            return(EachOrder) 
    }



    return(
        <>
        <Title />

        <div id="OrdersPanel">
                <div>{returnOrders()}</div>
        </div>
        
        </>
    )
} 

export default PendingOrders