let loupe = document.getElementById('loupe')
let iconzapOpen = document.getElementById('iconzapopen')
let iconzapclose = document.getElementById('iconzapclose')
let formContact = document.getElementById('formContact')
let cep = document.getElementById('cep')
const showProducts = document.getElementById('showProducts')

const food = [
    { name: 'X-Salada', price: 30, vegan: false, src: './assets/xsalada.jpeg' },
    { name: 'X-Bacon', price: 34, vegan: false, src: './assets/xbacon.png' },
    { name: 'X-Bacon Egg', price: 39, vegan: false, src: './assets/bacon-egg.png' },
    { name: 'Monstruoso', price: 50, vegan: false, src: './assets/monstruoso.png' },
    { name: 'Big Vegano', price: 55, vegan: true, src: './assets/xvegan.png' },
    { name: 'X-Vegan', price: 45, vegan: true, src: './assets/monstruoso-vegan.png' },
]

function formatCoin(value) {
    const valueFormated = value.toLocaleString('pt-br', {
        style: 'currency',
        currency: 'BRL',
    })
    return valueFormated
}

// ShowMenu Products
let myProdcuts = []
function ShowAllProducts() {
    food.forEach((item) => {
        myProdcuts = myProdcuts + `
        <li class="cards-products">
        <img src=${item.src} alt="product">
        <p class="card-description">${item.name}</p>
        <p class="price-product span">${formatCoin(item.price)}</p>
        </li>
    `
    })
    showProducts.innerHTML = myProdcuts
    myProdcuts = ''
}

// Give Ten for cent of discount
function giveDiscount() {
    const newValues = food.map((item) => ({
        ...item,
        price: item.price * 0.9,
    }))

    let myProductsDiscount = []
    newValues.forEach((item) => {
        myProductsDiscount = myProductsDiscount + `
        <li class="cards-products">
        <img src=${item.src} alt="product">
        <p class="card-description">${item.name}</p>
        <p class="price-product span">${formatCoin(item.price)}</p>
        </li>
    `
    })
    showProducts.innerHTML = myProductsDiscount
}


// Sum Prices of Products
function sumProducts() {

    let sumPrices = food.reduce((acc, valuecurrent) => {
        return acc + valuecurrent.price
    }, 0)

    showProducts.innerHTML = `
    <li class="cards-products">
    <p class="price-product span">Valor Total Dos Produtos ${formatCoin(sumPrices)}</p>
    </li>   
    `
}

// Show only vegan Products
function filterVegan() {
    let showVeganProducts = []
    food.filter((veganProducts) => {
        if (veganProducts.vegan) {
            showVeganProducts = showVeganProducts + `
            <li class="cards-products">
            <img src=${veganProducts.src} alt="product">
            <p class="card-description">${veganProducts.name}</p>
            <p class="price-product span">${formatCoin(veganProducts.price)}</p>
            </li>       
            `
            showProducts.innerHTML = showVeganProducts
        }
    })
}

// Function for search CEP of client
function searchCEP() {
    if (cep.value === '') {
        showDetails.innerHTML = 'Favor Digitar o CEP'
    } else {
        showDetails.innerHTML = 'Pesquisando CEP...'
        $("#rua").val('...')
        $("#bairro").val('...')
        $("#cidade").val('...')

        setTimeout(() => {
            $.ajax(({
                type: 'GET',
                url: 'https://viacep.com.br/ws/' + cep.value + '/json/',
                dataType: 'json',
                success: function (data) {
                    if (!("erro" in data)) {
                        $("#rua").val(data.logradouro)
                        $("#bairro").val(data.bairro)
                        $("#cidade").val(data.localidade)
                        showDetails.innerHTML = 'Dados Pessoais'
                        const btnEnviar = document.createElement("button")
                        btnEnviar.innerHTML = "Enviar"
                        btnEnviar.style.display = 'flex'
                        btnEnviar.style.justifyContent = 'center'
                        btnEnviar.style.position = 'fixed'
                        btnEnviar.style.bottom = '8px'
                        btnEnviar.style.padding = '6px'
                        btnEnviar.style.width = '100px'
                        btnEnviar.style.textAlign = 'center'
                        btnEnviar.style.height = '38px'
                        btnEnviar.style.border = '1px solid #fff'
                        btnEnviar.style.backgroundColor = '#075E54'
                        btnEnviar.style.margin = '0px 0px -4px'
                        btnEnviar.style.border = '1px solid #fff'
                        btnEnviar.style.borderRadius = '8px'
                        btnEnviar.style.color = '#fff'
                        btnEnviar.style.cursor = 'pointer'
                        btnEnviar.style.fontWeight = '600'
                        document.getElementById('sendContact').appendChild(btnEnviar)
                        btnEnviar.addEventListener('click', () => {
                            showDetails.innerHTML = 'Enviando dados...'
                            setTimeout(() => {
                                showDetails.innerHTML = 'Dados enviado!'
                            }, 2000)

                            setTimeout(() => {
                                formContact.style.display = 'none'
                                $("#cep").val("")
                                $("#rua").val("")
                                $("#bairro").val("")
                                $("#cidade").val("")
                                showDetails.innerHTML = 'Dados Pessoais'
                                btnEnviar.style.display = 'none'
                            }, 3000)
                        })

                    } else {

                        showDetails.innerHTML = 'CEP Não Localizado!'
                    }
                }

            }))

        }, 2000)
    }
}

// Open and close form zap
iconzapOpen.addEventListener('click', () => {
    formContact.style.display = 'flex'
    iconzapclose.style.display = 'block'
    iconzapOpen.style.display = 'none'
    formContact.classList.add('fadeIn')

})

iconzapclose.addEventListener('click', () => {
    formContact.style.display = 'none'
    iconzapOpen.style.display = 'flex'
    iconzapclose.style.display = 'none'
    formContact.classList.add('fadeOut')
    formContact.classList.remove('fadeOut')

})

//show arrow
document.getElementById('callAttendant').addEventListener('click', () => {
    iconzapOpen.style.display = 'block'
    document.getElementById('arrow').style.display = 'block'
    setTimeout(() => {
        document.getElementById('arrow').style.display = 'none'
    }, 2000)
})