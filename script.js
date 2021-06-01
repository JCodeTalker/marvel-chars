
var charNum = 0 //represents character currently on screen
var json
var timestamp = "1622316257"
const publicapikey = '48aff73d463883e712ecdfb3ce8b6b0a'
var md5 = '51b792a62058de22abd327f1947adf1f'

fetch(`https://gateway.marvel.com/v1/public/characters?limit=99&ts=${timestamp}&apikey=${publicapikey}&hash=${md5}`
).then((response) => {
    return response.json()
}).then((jsonParsed) => {
    json = jsonParsed
    loadCharacter(charNum, json)
})

function navBar() {
    document.getElementById('current').innerHTML = charNum + 1
    let previous = document.getElementById('previous')
    let next = document.getElementById('next')
    let minusOne = document.getElementById('minusOne')
    let minusTwo = document.getElementById('minusTwo')
    minusOne.innerHTML = charNum
    minusTwo.innerHTML = charNum - 1
    let plusOne = document.getElementById('plusOne')
    let plusTwo = document.getElementById('plusTwo')
    plusOne.innerHTML = charNum + 2
    plusTwo.innerHTML = charNum + 3
    if (charNum <= 0) {
        charNum = 0
        previous.className = "page-item disabled"
    } else {
        previous.className = "page-item"
    }
    if (charNum >= 98) {
        charNum = 98
        next.className = "page-item disabled"
    } else {
        next.className = "page-item"
    }
    charNum >= 2 ? minusTwo.style = "display: block;" : minusTwo.style = "display: none;"
    charNum >= 1 ? minusOne.style = "display: block;" : minusOne.style = "display: none;"
}

function loadCharacter(number, jsonParsed) {
    const herois = document.getElementById('heros')
    const name = jsonParsed.data.results[number].name
    const description = jsonParsed.data.results[number].description
    const descriptionElem = document.getElementById('description')
    if (description) {
        descriptionElem.innerHTML = description
    } else {
        descriptionElem.innerHTML = 'No description found.'
    }
    navBar()
    document.getElementById('name').innerHTML = `Name: ${name}`
    const path = jsonParsed.data.results[number].thumbnail.path + '.' + jsonParsed.data.results[0].thumbnail.extension
    const imagem = document.getElementById('image')
    imagem.src = path
}