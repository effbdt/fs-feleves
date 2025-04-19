async function downloadAndDisplay() { 
    const response = await fetch('http://localhost:5006/foodapi')
    const foods = await response.json()
    console.log(foods)

    if (Array.isArray(foods) && foods.length > 0) {
        let table = document.querySelector('.table')
        table.classList.remove('conditional-show')
    }
    
    let container = document.querySelector('#table-body')

    foods.map(x => {
        let td = document.createElement('td')
        td.innerHTML = x.name
        container.appendChild(p)
    })
}

downloadAndDisplay()