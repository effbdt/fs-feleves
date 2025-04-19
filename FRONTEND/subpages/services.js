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
        headers: {'Content-Type': 'application/json'}
    })
    .then(resp => {
        console.log('Response: ', resp)
        if (resp.status === 200) {
            document.querySelector('.table').classList.remove('conditional-show')
            return resp.json()
        }
    })
    .then(foodList => {
        let tableBody = document.querySelector('#prioritized-list')
        tableBody.innerHTML = ''
        
        foodList.forEach(food => {
            let tr = document.createElement('tr')
            
            let nameTd = document.createElement('td')
            let dateTd = document.createElement('td')

            nameTd.innerHTML = food.name
            dateTd.innerHTML = food.expirationDate.split('T')[0]

            tr.appendChild(nameTd)
            tr.appendChild(dateTd)

            tableBody.appendChild(tr)
        });
    })
   
}

