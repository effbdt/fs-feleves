// let allFoods = []

// async function downloadAndDisplay() {
//     const response = await fetch('http://localhost:5006/foodapi')
//     const foods = await response.json()
//     console.log(foods)

//     if (Array.isArray(foods) && foods.length > 0) {
//         let table = document.querySelector('.table')
//         table.classList.remove('conditional-show')
//     }

//     foods.map(x => {
//         allFoods.push(x)
//     })
// }


function listByExpiration() {
    fetch('http://localhost:5006/foodapi/priorotized', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
        .then(resp => {
            console.log('Response: ', resp)
            if (resp.status === 200) {
                return resp.json()
            }
        })
        .then(foodList => {
            if (!foodList || foodList.length === 0) {
                return
            }
                document.querySelector('.table').classList.remove('conditional-show')
            let tableBody = document.querySelector('#prioritized-list')
            tableBody.innerHTML = ''

            const today = new Date()
            //this sets the hours to 0 in the day
            today.setHours(0, 0, 0, 0);

            foodList.forEach(food => {
                let tr = document.createElement('tr')

                let nameTd = document.createElement('td')
                let dateTd = document.createElement('td')

                nameTd.innerHTML = food.name
                dateTd.innerHTML = food.expirationDate.split('T')[0]

                tr.appendChild(nameTd)
                tr.appendChild(dateTd)

                let expiration = new Date(food.expirationDate)
                let timeDifference = expiration - today
                //difference is in milliseconds so this is how you calculate it into days
                let dayDifference = timeDifference / (1000 * 60 * 60 * 24)


                console.log(dayDifference)
                if (dayDifference <= 2) {
                    tr.classList.add('table-danger')
                }
                else if (dayDifference <= 5) {
                    tr.classList.add('table-warning')
                }

                tableBody.appendChild(tr)
            });
        })

}

