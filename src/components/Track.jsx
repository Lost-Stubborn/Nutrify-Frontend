import { useContext, useEffect, useState } from "react"
import { UserContext } from "../contexts/UserContext"

function Track() {

    const loggedData = useContext(UserContext)

    const [foodItems,setFoodsItems] = useState([])

    function searchFood(event) {

        if(event.target.value !== "") {
            fetch(`http://localhost:8000/foods/${event.target.value}`, {
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

                <div className="search">

                    <input className="search-inp" type="search" onChange={searchFood}
                     placeholder="Search food item"/>

                     {

                        foodItems.length !== 0 ? (
                            <div className="search-results">

                                {
                                    foodItems.map((item) => {
                                        return (
                                            <p className="item" key={item._id}>{item.name}</p>
                                        )
                                    })
                                }

                            </div>
                        ) : null

                     }

                </div>

            </section>
        </>
    )
}

export default Track