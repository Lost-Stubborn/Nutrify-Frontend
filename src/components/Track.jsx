import { useContext, useEffect, useState } from "react"
import { UserContext } from "../contexts/UserContext"
import Food from "./Food"
import Header from "./Header"

function Track() {

    const loggedData = useContext(UserContext)

    const [foodItems,setFoodsItems] = useState([])
    const [food,setFood] = useState(null)

    useEffect(() => {
        console.log(food)   
    })


    function searchFood(event) {

        if(event.target.value !== "") {
            fetch(`https://nutrify-api-kappa.vercel.app/${event.target.value}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${loggedData.loggedUser.token}`
                }
    
            })
            .then((response) => response.json())
            .then((data) => {
                if(data.message === undefined) {
                    setFoodsItems(data)
                }
                else {
                    setFoodsItems([])
                }
            })
            .catch((err) => {
                console.log(err)
            })
        }
        else {
            setFoodsItems([])
        }
        
    }


    return (
        <>
            <section className="container track-container">

                <Header/>

                <div className="search">

                    <input className="search-inp" type="search" onChange={searchFood}
                     placeholder="Search food item"/>

                     {

                        foodItems.length !== 0 ? (
                            <div className="search-results">

                                {
                                    foodItems.map((item) => {
                                        return (
                                            <p className="item" onClick={() => {
                                                setFood(item)
                                            }} key={item._id}>{item.name}</p>
                                        )
                                    })
                                }

                            </div>
                        ) : null

                     }

                </div>

                {
                    food!==null ? (<Food food={food}/>) : null
                }

                      

            </section>
        </>
    )
}

export default Track