// Simulação de dados
const products = [
    { id: 1, name: "Produto 1", price: 50, image: "assets/images/product1.jpg" },
    { id: 2, name: "Produto 2", price: 75, image: "assets/images/product2.jpg" },
    { id: 3, name: "Produto 3", price: 100, image: "assets/images/product3.jpg" },
    { id: 4, name: "Mesa", price: 67.00, image: "assets/images/product4.jpg" },
    { id: 5, name: "Toalha", price: 99.00, image: "assets/images/product5.jpg" }
];
// Lista de produtos simulada, cada produto contém id, nome, preço e imagem.

// Seleção dos elementos do DOM
const productGrid = document.querySelector('.product-grid'); // Seleciona o container que exibe os produtos.
const searchBar = document.querySelector('.search-bar'); // Seleciona a barra de busca.

// novo
const cartContainer = document.querySelector('.cart-items'); // Contêiner do carrinho
const cartCount = document.querySelector('.cart-count'); // Para mostrar a quantidade de itens no carrinho
const cartTotal = document.querySelector('.total-price'); // Para mostrar o total do carrinho

// Carrinho de compras
let cart = [];


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
        productGrid.insertAdjacentHTML('beforeend', productHTML);
    });

    // Adiciona evento aos botões de "Adicionar ao Carrinho"
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', handleAddToCart);
    });
}



// Função para adicionar um produto ao carrinho
function handleAddToCart(event) {
    const productId = parseInt(event.target.getAttribute('data-id')); 
    if (isNaN(productId)) return; // Evita erro caso o ID seja inválido

    const product = products.find(p => p.id === productId);
    if (!product) return; // Evita erro se o produto não existir

    // Verifica se o produto já está no carrinho
    const productInCart = cart.find(item => item.id === productId);
    if (productInCart) {
        productInCart.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart(); // Atualiza o carrinho
}

// Função para atualizar a exibição do carrinho
function updateCart() {
    cartContainer.innerHTML = ''; // Limpa o carrinho

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Carrinho vazio</p>';
        cartTotal.textContent = 'Total: $0.00';
        return;
    }

    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
        const itemHTML = `
            <li>${item.name} x ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}</li>
        `;
        cartContainer.insertAdjacentHTML('beforeend', itemHTML);
    });

    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
}

// Função para renderizar os itens no carrinho
function renderCartItems() {
    cartContainer.innerHTML = ''; // Limpa o conteúdo atual do carrinho
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Carrinho vazio</p>';
    } else {
        cart.forEach(item => {
            const itemHTML = `
                <div class="cart-item">
                    <p>${item.name} x ${item.quantity}</p>
                    <p>$${(item.price * item.quantity).toFixed(2)}</p>
                </div>
            `;
            cartContainer.insertAdjacentHTML('beforeend', itemHTML);
        });
    }
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
renderProducts(products); // Renderiza todos os produtos ao carregar a página
updateCart(); // Atualiza o carrinho na inicialização
