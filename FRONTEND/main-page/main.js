let allFoods = []


async function downloadAndDisplay() {
    const response = await fetch('http://localhost:5006/foodapi')
    const foods = await response.json()
    console.log(foods)

    if (Array.isArray(foods) && foods.length > 0) {
        document.querySelector('#main-table').classList.remove('conditional-show')
        document.querySelector('#table-header').classList.remove('conditional-show')
    }
    else {
        document.querySelector('#main-table').classList.add('conditional-show')
        document.querySelector('#table-header').classList.add('conditional-show')
    }

    document.querySelector('#table-body').innerHTML = ''
    allFoods = []

    foods.map(x => {
        allFoods.push(x)

        let tr = document.createElement('tr')

        tr.classList.add('table-info')

        let nametd = document.createElement('td')
        let quantitytd = document.createElement('td')
        let datetd = document.createElement('td')
        let delTd = document.createElement('td')

        nametd.innerHTML = x.name

        quantitytd.innerHTML = x.quantity
        datetd.innerHTML = x.expirationDate.split('T')[0]

        tr.appendChild(nametd)
        tr.appendChild(quantitytd)
        tr.appendChild(datetd)
        tr.appendChild(delTd)

        let deleteButton = document.createElement('button')
        deleteButton.classList.add('btn')
        deleteButton.classList.add('btn-danger')
        deleteButton.innerHTML = 'Törlés'
        deleteButton.idParameter = x.name
        deleteButton.addEventListener('click', deleteFood)
        delTd.appendChild(deleteButton)

        document.querySelector('#table-body').appendChild(tr)
    })
}

downloadAndDisplay()


function deleteFood(event) {
    //this way spaces dont break the code, since the parameter is a name string
    fetch(`http://localhost:5006/foodapi/${encodeURIComponent(event.target.idParameter)}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', }
    })
        .then(resp => {
            console.log('Response: ', resp)
            if (resp.status === 200) {
                downloadAndDisplay()
            }

        })
}

function reset() {
    document.querySelector('#name-entry').value = ''
    document.querySelector('#quantity-entry').value = ''
    document.querySelector('#date-entry').value = ''
}

function createFood() {
    let foodName = document.querySelector('#name-entry').value
    let foodquantity = document.querySelector('#quantity-entry').value
    let foodexpirationdate = document.querySelector('#date-entry').value

    fetch('http://localhost:5006/foodapi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify({
            Name: foodName,
            Quantity: Number(foodquantity),
            ExpirationDate: foodexpirationdate
        })
    })
        .then(resp => {
            console.log('Response: ', resp)
            if (resp.status === 200) {
                downloadAndDisplay()
                reset()
            } else {
                return resp.text().then(text => alert(text))
            }
        })
        .catch(error => {
            alert("Hiba történt: " + error.message)
        })
}
