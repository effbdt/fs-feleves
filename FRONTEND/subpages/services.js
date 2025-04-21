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
                alert('A lista üres!')

                return
            }
            document.querySelector('#service1-table').classList.remove('conditional-show')
            let expirationTable = document.querySelector('#prioritized-list')
            expirationTable.innerHTML = ''

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

                if (dayDifference <= 2) {
                    tr.classList.add('table-danger')
                }
                else if (dayDifference <= 5) {
                    tr.classList.add('table-warning')
                }

                expirationTable.appendChild(tr)
            });
        })
}

function suggestionsList() {
    fetch('http://localhost:5006/foodapi/suggestions', {
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
                alert('Nincs ajánlani való elem!')

                return
            }
            document.querySelector('#service2-table').classList.remove('conditional-show')
            let suggestionTable = document.querySelector('#suggestions-list')
            suggestionTable.innerHTML = ''

            foodList.forEach(food => {
                let tr = document.createElement('tr')

                let nameTd = document.createElement('td')
                let quantitytd = document.createElement('td')
                let dateTd = document.createElement('td')

                nameTd.innerHTML = food.name
                quantitytd.innerHTML = food.quantity
                dateTd.innerHTML = food.expirationDate.split('T')[0]

                tr.appendChild(nameTd)
                tr.appendChild(quantitytd)
                tr.appendChild(dateTd)

                suggestionTable.appendChild(tr)
            });
        })
}

let allFoods = []

async function download() {
    const response = await fetch('http://localhost:5006/foodapi')
    const foods = await response.json()
    console.log(foods)

    allFoods = []

    foods.map(x => {
        allFoods.push(x)
    })
}

download()

function foodRationEstimation() {
    fetch('http://localhost:5006/foodapi/estimation', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
        .then(resp => {
            console.log('Response: ', resp)
            if (resp.status === 200) {
                return resp.json()
            }
        })
        .then(usageEstimation => {
            if (!usageEstimation || usageEstimation.length === 0) {
                alert('A lista üres!')

                return
            }

            document.querySelector('#service3-table').classList.remove('conditional-show')
            let estimationTable = document.querySelector('#estimation-list')
            estimationTable.innerHTML = ''

            for (let i = 0; i < allFoods.length; i++) {
                console.log(i)

                let tr = document.createElement('tr')

                let nameTd = document.createElement('td')
                let estimationTd = document.createElement('td')

                nameTd.innerHTML = allFoods[i].name
                estimationTd.innerHTML = Math.ceil(usageEstimation[i]) + ' ' + 'db'

                tr.appendChild(nameTd)
                tr.appendChild(estimationTd)

                estimationTable.appendChild(tr)
            }
        })
}
