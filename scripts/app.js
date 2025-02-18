const productGrid = document.getElementById('product-grid');

// Lista de produtos (exemplo)
const products = [
    { id: 1, name: "Produto 1", price: 50.00, image: "assets/images/product1.jpg" },
    { id: 2, name: "Produto 2", price: 75.00, image: "assets/images/product2.jpg" },
    { id: 3, name: "Produto 3", price: 100.00, image: "assets/images/product3.jpg" }
];

// Função para criar um cartão de produto
function createProductCard(product) {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');

    productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <h3 class="product-name">${product.name}</h3>
        <p class="product-price">$${product.price.toFixed(2)}</p>
        <button class="add-to-cart" data-id="${product.id}">Adicionar ao Carrinho</button>
    `;

    productCard.querySelector('.add-to-cart').addEventListener('click', handleAddToCart);
    
    return productCard;
}

// Função para renderizar produtos
function renderProducts(productsToRender) {
    productGrid.innerHTML = ''; // Limpa o grid antes de renderizar
    productsToRender.forEach(product => {
        productGrid.appendChild(createProductCard(product));
    });
}

// Função para lidar com o evento de adicionar ao carrinho
function handleAddToCart(event) {
    const productId = event.target.dataset.id;
    alert(`Produto ${productId} adicionado ao carrinho!`);
}

// Renderiza os produtos ao carregar a página
renderProducts(products);
