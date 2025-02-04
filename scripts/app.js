// Simulação de dados
const products = [
    { 
        id: 1, 
        name: "Produto 1", 
        price: 50, 
        image: "assets/images/product1.jpg" 
    },
    { id: 2, 
        name: "Produto 2", 
        price: 75, 
        image: "assets/images/product2.jpg" },

    { id: 3,
         name: "Produto 3",
          price: 100,
           image: "assets/images/product3.jpg" },

    {
        id:4 ,
         name:"mesa" ,
          price:67.00, 
           image:"assets/images/product3.jpg"
    }, 

    {
        id:5,
        name:"toalha",
        price:99.00,
        image:"assets/images/product3.jpg",
    }
   
];
// Lista de produtos simulada, cada produto contém id, nome, preço e imagem.

// Seleção dos elementos do DOM
const productGrid = document.querySelector('.product-grid'); // Seleciona o container que exibe os produtos.
const searchBar = document.querySelector('.search-bar'); // Seleciona a barra de busca.

// Função para renderizar os produtos
function renderProducts(productsToRender) {
    productGrid.innerHTML = ''; // Limpa o conteúdo atual do grid.
    productsToRender.forEach(product => {
        // Gera o HTML para cada produto.
        const productHTML = `
            <div class="product-card">
              <img src="${product.image}" alt="${product.name}" class="product-image">
              <h3 class="product-name">${product.name}</h3>
              <p class="product-price">$${product.price.toFixed(2)}</p>
              <button class="add-to-cart" data-id="${product.id}">Adicionar ao Carrinho</button>
            </div>
        `;
        productGrid.insertAdjacentHTML('beforeend', productHTML); // Insere o HTML do produto no grid.
    });
}

// Event Listener para a barra de busca
function debounce(func, delay) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), delay);
    };
}

const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase().trim();
    
    if (!searchValue) {
        renderProducts(products); // Mostra todos os produtos se a busca estiver vazia.
        return;
    }

    const filteredProducts = products.filter(product => {
        const name = product.name.toLowerCase();
        return searchValue.split(" ").every(term => name.includes(term));
    });

    renderProducts(filteredProducts);
};

searchBar.addEventListener('input', debounce(handleSearch, 300));

// Inicialização
renderProducts(products); // Renderiza todos os produtos ao carregar a página.






// Seleciona os elementos
const cartContainer = document.getElementById('cart-container');
const productsContainer = document.getElementById('products-container');

// Recupera o carrinho do localStorage ou inicia um vazio
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Função para salvar o carrinho no localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Função para renderizar os produtos disponíveis
function renderProducts() {
    const products = [
        { id: 1, name: "Produto A", price: 50 },
        { id: 2, name: "Produto B", price: 30 },
        { id: 3, name: "Produto C", price: 70 }
    ];

    productsContainer.innerHTML = products.map(product => `
        <div class="product">
            <h3>${product.name}</h3>
            <p>R$ ${product.price}</p>
            <button onclick="addToCart(${product.id}, '${product.name}', ${product.price})">Adicionar ao Carrinho</button>
        </div>
    `).join('');
}

// Função para adicionar um produto ao carrinho
function addToCart(id, name, price) {
    const itemIndex = cart.findIndex(item => item.id === id);

    if (itemIndex !== -1) {
        cart[itemIndex].quantity++;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }

    saveCart();
    renderCart();
}

// Função para remover um produto do carrinho
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    renderCart();
}

// Função para renderizar o carrinho
function renderCart() {
    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>O carrinho está vazio</p>";
        return;
    }

    cartContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <h4>${item.name} (x${item.quantity})</h4>
            <p>R$ ${item.price * item.quantity}</p>
            <button onclick="removeFromCart(${item.id})">Remover</button>
        </div>
    `).join('');
}

// Inicializa a página
renderProducts();
renderCart();
