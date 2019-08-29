fetch("http://localhost:8088/food")
    .then(response => response.json())
    .then(myParsedFoods => {
        myParsedFoods.forEach(food => {
            console.log(food) // Should have a `barcode` property

            // Now fetch the food from the Food API
            fetch(`https://world.openfoodfacts.org/api/v0/product/${food.barcode}.json`)
                .then(response => response.json())
                .then(productInfo => {
                    if (productInfo.product.ingredients_text) {
                      food.ingredients = productInfo.product.ingredients_text
                    } else {
                      food.ingredients = "no ingredients listed"
                    }

                    // Produce HTML representation
                    const foodAsHTML = foodFactory(food)

                    // Add representaiton to DOM
                    addFoodToDom(foodAsHTML)
                })
        })
    })

const foodFactory = (foodItem) =>{
    return`
        <div class = "box">
        <h1> ${foodItem.name} </h1>
        <p> ${foodItem.category} </p>
        <p> ${foodItem.ethnicity}</p>
        <p> ${foodItem.ingredients}</p>
        </div>
    `
}

const addFoodToDom = (foodHTML) => {
    const articleDom = document.querySelector(".foodList")
    articleDom.innerHTML += foodHTML
}