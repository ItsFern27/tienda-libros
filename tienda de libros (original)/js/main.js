// Variables globales
let cart = [];
let currentSlide = 0;
const totalSlides = 3;

// Inicializar cuando carga la página
document.addEventListener('DOMContentLoaded', function() {
    loadBooks();
    loadNovedades();
    startCarousel();
    setupSearch();
});

// Cargar libros en la página
function loadBooks(category = 'all') {
    const grid = document.getElementById('booksGrid');
    const filteredBooks = category === 'all' 
        ? books 
        : books.filter(book => book.category === category);
    
    grid.innerHTML = filteredBooks.map(book => `
        <div class="book-card" data-category="${book.category}">
            ${book.bestseller ? '<span class="book-badge">Bestseller</span>' : ''}
            <div class="book-image-container">
                <img src="${book.image}" 
                     alt="${book.title}" 
                     class="book-image-real"
                     onerror="this.src='img/no-image.jpg'">
            </div>
            <div class="book-info">
                <div class="book-title">${book.title}</div>
                <div class="book-author">${book.author}</div>
                <div class="book-price">S/ ${book.price.toFixed(2)}</div>
                <button class="add-to-cart-btn" onclick="addToCart(${book.id})">
                    <i class="fas fa-shopping-cart"></i> Agregar al Carrito
                </button>
            </div>
        </div>
    `).join('');
}

// También actualiza loadNovedades
function loadNovedades() {
    const grid = document.getElementById('novedadesGrid');
    grid.innerHTML = novedades.map(book => `
        <div class="book-card">
            <span class="book-badge" style="background-color: #FF9800;">¡Nuevo!</span>
            <div class="book-image-container">
                <img src="${book.image}" 
                     alt="${book.title}" 
                     class="book-image-real"
                     onerror="this.src='img/no-image.jpg'">
            </div>
            <div class="book-info">
                <div class="book-title">${book.title}</div>
                <div class="book-author">${book.author}</div>
                <div class="book-price">S/ ${book.price.toFixed(2)}</div>
                <button class="add-to-cart-btn" onclick="addToCart(${book.id}, true)">
                    <i class="fas fa-shopping-cart"></i> Agregar al Carrito
                </button>
            </div>
        </div>
    `).join('');
}
// Filtrar por categoría
function filterByCategory(category) {
    // Actualizar tabs activos
    document.querySelectorAll('.category-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Cargar libros filtrados
    loadBooks(category);
    
    // Scroll suave a la sección
    document.getElementById('destacados').scrollIntoView({ behavior: 'smooth' });
}

// Agregar al carrito
function addToCart(bookId, isNew = false) {
    const allBooks = [...books, ...novedades];
    const book = allBooks.find(b => b.id === bookId);
    
    if (book) {
        // Verificar si ya existe en el carrito
        const existingItem = cart.find(item => item.id === bookId);
        
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ ...book, quantity: 1 });
        }
        
        updateCartCount();
        showNotification(`"${book.title}" agregado al carrito ✓`);
        saveCartToStorage();
    }
}

// Actualizar contador del carrito
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartCount').textContent = totalItems;
}

// Mostrar/Ocultar carrito
function toggleCart() {
    const modal = document.getElementById('cartModal');
    
    if (cart.length === 0) {
        showNotification('Tu carrito está vacío 🛒', 'info');
        return;
    }
    
    updateCartDisplay();
    modal.style.display = 'block';
}

function closeCart() {
    document.getElementById('cartModal').style.display = 'none';
}


// Actualizar vista del carrito (Versión PRO con estadísticas)
function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    // Carrito vacío
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div style="text-align: center; padding: 60px 20px;">
                <i class="fas fa-shopping-cart" style="font-size: 80px; color: #ddd; margin-bottom: 20px;"></i>
                <h3 style="color: #666; margin-bottom: 10px;">Tu carrito está vacío</h3>
                <p style="color: #999;">¡Explora nuestro catálogo y encuentra tu próximo libro favorito!</p>
                <button onclick="closeCart(); document.getElementById('destacados').scrollIntoView({behavior: 'smooth'});" 
                        style="margin-top: 20px; padding: 12px 30px; background: #2196F3; color: white; border: none; border-radius: 25px; cursor: pointer; font-size: 16px;">
                    Explorar Libros
                </button>
            </div>
        `;
        cartTotal.textContent = '0.00';
        
        // Ocultar sección de resumen si existe
        const cartSummary = document.querySelector('.cart-summary');
        if (cartSummary) cartSummary.style.display = 'none';
        
        return;
    }
    
    // Mostrar sección de resumen si existe
    const cartSummary = document.querySelector('.cart-summary');
    if (cartSummary) cartSummary.style.display = 'block';
    
    // Calcular estadísticas
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal >= 100 ? 0 : 10.00;
    const total = subtotal + shipping;
    
    // Renderizar header con estadísticas
    const modalTitle = document.querySelector('.modal-content h2');
    if (modalTitle) {
        modalTitle.innerHTML = `
            🛒 Mi Carrito 
            <span style="font-size: 16px; color: #666; font-weight: normal;">
                (${totalItems} ${totalItems === 1 ? 'artículo' : 'artículos'})
            </span>
        `;
    }
    
    // Renderizar items
    cartItemsContainer.innerHTML = cart.map((item, index) => `
        <div class="cart-item" style="animation: slideIn 0.3s ease ${index * 0.1}s both;">
            <div class="cart-item-image">
                <img src="${item.image}" 
                     alt="${item.title}" 
                     onerror="this.src='img/no-image.jpg'">
            </div>
            <div class="cart-item-info">
                <div class="cart-item-title">${item.title}</div>
                <div class="cart-item-author">por ${item.author}</div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn" onclick="decreaseQuantity(${item.id})" 
                            ${item.quantity === 1 ? 'title="Eliminar"' : 'title="Disminuir"'}>
                        <i class="fas fa-minus"></i>
                    </button>
                    <span class="quantity-number">${item.quantity}</span>
                    <button class="quantity-btn" onclick="increaseQuantity(${item.id})" title="Aumentar">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
                <div class="cart-item-price">
                    ${item.quantity > 1 ? `<small style="color: #999;">S/ ${item.price.toFixed(2)} c/u</small><br>` : ''}
                    <strong>S/ ${(item.price * item.quantity).toFixed(2)}</strong>
                </div>
            </div>
            <button class="remove-item" onclick="removeFromCart(${item.id})" title="Eliminar del carrito">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');
    
    // Actualizar elementos de resumen
    const subtotalElement = document.getElementById('cartSubtotal');
    const shippingElement = document.getElementById('cartShipping');
    
    if (subtotalElement) {
        subtotalElement.textContent = `S/ ${subtotal.toFixed(2)}`;
    }
    
    if (shippingElement) {
        if (shipping === 0) {
            shippingElement.innerHTML = '<span style="color: #4CAF50; font-weight: bold;">GRATIS 🎉</span>';
        } else {
            const remaining = 100 - subtotal;
            shippingElement.innerHTML = `
                S/ ${shipping.toFixed(2)}
                <br>
                <small style="color: #FF9800; display: inline-block; margin-top: 5px;">
                    💡 ¡Agrega S/ ${remaining.toFixed(2)} más para envío gratis!
                </small>
            `;
        }
    }
    
    // Actualizar total
    cartTotal.textContent = total.toFixed(2);
    
    // Agregar animación de entrada
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateX(-20px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
    `;
    if (!document.querySelector('style[data-cart-animation]')) {
        style.setAttribute('data-cart-animation', 'true');
        document.head.appendChild(style);
    }
}



// Aumentar cantidad
function increaseQuantity(bookId) {
    const item = cart.find(item => item.id === bookId);
    if (item) {
        item.quantity++;
        updateCartCount();
        updateCartDisplay();
        saveCartToStorage();
    }
}

// Disminuir cantidad
function decreaseQuantity(bookId) {
    const item = cart.find(item => item.id === bookId);
    if (item) {
        if (item.quantity > 1) {
            item.quantity--;
            updateCartCount();
            updateCartDisplay();
            saveCartToStorage();
        } else {
            removeFromCart(bookId);
        }
    }
}

// Proceder al pago
function checkout() {
    if (cart.length === 0) {
        showNotification('Tu carrito está vacío', 'error');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    alert(`🎉 ¡Gracias por tu compra!\n\nTotal de artículos: ${itemCount}\nTotal a pagar: S/ ${total.toFixed(2)}\n\n📦 Tu pedido será procesado en breve.\n📧 Recibirás un correo de confirmación.`);
    
    // Limpiar carrito
    cart = [];
    updateCartCount();
    updateCartDisplay();
    closeCart();
    saveCartToStorage();
}

// Sistema de notificaciones
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = 'notification';
    
    const colors = {
        success: '#4CAF50',
        error: '#ff4444',
        info: '#2196F3'
    };
    
    notification.style.backgroundColor = colors[type] || colors.success;
    notification.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideInRight 0.3s ease reverse';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Control del carrusel
function moveCarousel(direction) {
    const items = document.getElementById('carouselItems');
    currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
    items.style.transform = `translateX(-${currentSlide * 100}%)`;
    updateIndicators();
}

function goToSlide(index) {
    const items = document.getElementById('carouselItems');
    currentSlide = index;
    items.style.transform = `translateX(-${currentSlide * 100}%)`;
    updateIndicators();
}

function updateIndicators() {
    document.querySelectorAll('.indicator').forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide);
    });
}

function startCarousel() {
    setInterval(() => {
        moveCarousel(1);
    }, 5000);
}

// Sistema de búsqueda
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase().trim();
        
        if (searchTerm === '') {
            loadBooks();
            return;
        }
        
        const filteredBooks = books.filter(book => 
            book.title.toLowerCase().includes(searchTerm) || 
            book.author.toLowerCase().includes(searchTerm) ||
            book.description.toLowerCase().includes(searchTerm)
        );
        
        const grid = document.getElementById('booksGrid');
        
        if (filteredBooks.length === 0) {
            grid.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px;">
                    <i class="fas fa-search" style="font-size: 64px; color: #ddd; margin-bottom: 20px;"></i>
                    <h3 style="color: #666;">No se encontraron resultados para "${searchTerm}"</h3>
                    <p style="color: #999;">Intenta con otras palabras clave</p>
                </div>
            `;
            return;
        }
        
        grid.innerHTML = filteredBooks.map(book => `
            <div class="book-card" data-category="${book.category}">
                ${book.bestseller ? '<span class="book-badge">Bestseller</span>' : ''}
                <div class="book-image-container">
                    <img src="${book.image}" 
                         alt="${book.title}" 
                         class="book-image-real"
                         onerror="this.src='img/no-image.jpg'">
                </div>
                <div class="book-info">
                    <div class="book-title">${book.title}</div>
                    <div class="book-author">${book.author}</div>
                    <div class="book-price">S/ ${book.price.toFixed(2)}</div>
                    <button class="add-to-cart-btn" onclick="addToCart(${book.id})">
                        <i class="fas fa-shopping-cart"></i> Agregar al Carrito
                    </button>
                </div>
            </div>
        `).join('');
    });
}
// Guardar carrito en LocalStorage
function saveCartToStorage() {
    try {
        localStorage.setItem('bookstore_cart', JSON.stringify(cart));
    } catch (e) {
        console.log('No se pudo guardar el carrito');
    }
}

// Cargar carrito desde LocalStorage
function loadCartFromStorage() {
    try {
        const savedCart = localStorage.getItem('bookstore_cart');
        if (savedCart) {
            cart = JSON.parse(savedCart);
            updateCartCount();
        }
    } catch (e) {
        console.log('No se pudo cargar el carrito');
    }
}

// Cerrar modal al hacer clic fuera
window.onclick = function(event) {
    const modal = document.getElementById('cartModal');
    if (event.target === modal) {
        closeCart();
    }
}

// Cargar carrito al iniciar
loadCartFromStorage();

// Smooth scroll para los enlaces
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});






let currentUser = null;

// Verificar si hay usuario guardado al cargar
document.addEventListener('DOMContentLoaded', function() {
    loadUserFromStorage();
    updateUserMenu();
});

// Cargar usuario desde localStorage
function loadUserFromStorage() {
    const savedUser = localStorage.getItem('bookstore_user');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        updateUserMenu();
    }
}

// Guardar usuario en localStorage
function saveUserToStorage() {
    if (currentUser) {
        localStorage.setItem('bookstore_user', JSON.stringify(currentUser));
    } else {
        localStorage.removeItem('bookstore_user');
    }
}

// Alternar menú de usuario
function toggleUserMenu() {
    const userMenu = document.getElementById('userMenu');
    
    if (!currentUser) {
        openLoginModal();
        return;
    }
    
    userMenu.classList.toggle('active');
}

// Cerrar menú al hacer clic fuera
document.addEventListener('click', function(event) {
    const userMenu = document.getElementById('userMenu');
    const userIcon = document.getElementById('userIcon');
    
    if (!userIcon.contains(event.target) && !userMenu.contains(event.target)) {
        userMenu.classList.remove('active');
    }
});

// Actualizar menú de usuario
function updateUserMenu() {
    const userMenuContent = document.getElementById('userMenuContent');
    const userIcon = document.getElementById('userIcon');
    
    if (currentUser) {
       userIcon.style.color = secondaryColor;
        userMenuContent.innerHTML = `
            <div class="user-info">
                <div class="user-info-name">${currentUser.name}</div>
                <div class="user-info-email">${currentUser.email}</div>
            </div>
            <div class="user-menu-item" onclick="viewProfile()">
                <i class="fas fa-user"></i> Mi Perfil
            </div>
            <div class="user-menu-item" onclick="viewOrders()">
                <i class="fas fa-box"></i> Mis Pedidos
            </div>
            <div class="user-menu-item" onclick="viewFavorites()">
                <i class="fas fa-heart"></i> Favoritos
            </div>
            <div class="user-menu-item" onclick="logout()">
                <i class="fas fa-sign-out-alt"></i> Cerrar Sesión
            </div>
        `;
    } else {
        userIcon.style.color = '';
        userMenuContent.innerHTML = `
            <div class="user-menu-item" onclick="openLoginModal()">
                <i class="fas fa-sign-in-alt"></i> Iniciar Sesión
            </div>
            <div class="user-menu-item" onclick="openRegisterModal()">
                <i class="fas fa-user-plus"></i> Registrarse
            </div>
        `;
    }
}

// Abrir modal de login
function openLoginModal() {
    const modal = document.getElementById('loginModal');
    modal.style.display = 'block';
    switchTab('login');
    document.getElementById('userMenu').classList.remove('active');
}

// Abrir modal de registro
function openRegisterModal() {
    const modal = document.getElementById('loginModal');
    modal.style.display = 'block';
    switchTab('register');
    document.getElementById('userMenu').classList.remove('active');
}

// Cerrar modal de login
function closeLoginModal() {
    document.getElementById('loginModal').style.display = 'none';
}

// Cambiar entre tabs
function switchTab(tab) {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const tabs = document.querySelectorAll('.login-tab');
    
    tabs.forEach(t => t.classList.remove('active'));
    
    if (tab === 'login') {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
        tabs[0].classList.add('active');
    } else {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
        tabs[1].classList.add('active');
    }
}

// Manejar login
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    // Simular autenticación (en producción, esto sería una llamada a tu backend)
    const users = JSON.parse(localStorage.getItem('bookstore_users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        currentUser = {
            name: user.name,
            email: user.email
        };
        
        if (rememberMe) {
            saveUserToStorage();
        }
        
        updateUserMenu();
        closeLoginModal();
        showNotification(`¡Bienvenido de vuelta, ${user.name}! 👋`, 'success');
    } else {
        showNotification('Correo o contraseña incorrectos', 'error');
    }
}

// Manejar registro
function handleRegister(event) {
    event.preventDefault();
    
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const passwordConfirm = document.getElementById('registerPasswordConfirm').value;
    
    // Validar contraseñas
    if (password !== passwordConfirm) {
        showNotification('Las contraseñas no coinciden', 'error');
        return;
    }
    
    // Obtener usuarios existentes
    const users = JSON.parse(localStorage.getItem('bookstore_users') || '[]');
    
    // Verificar si el email ya existe
    if (users.find(u => u.email === email)) {
        showNotification('Este correo ya está registrado', 'error');
        return;
    }
    
    // Crear nuevo usuario
    const newUser = {
        name,
        email,
        password,
        createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    localStorage.setItem('bookstore_users', JSON.stringify(users));
    
    // Auto-login
    currentUser = {
        name: newUser.name,
        email: newUser.email
    };
    
    saveUserToStorage();
    updateUserMenu();
    closeLoginModal();
    showNotification(`¡Bienvenido, ${name}! Tu cuenta ha sido creada 🎉`, 'success');
}

// Cerrar sesión
function logout() {
    currentUser = null;
    saveUserToStorage();
    updateUserMenu();
    showNotification('Sesión cerrada correctamente', 'info');
    document.getElementById('userMenu').classList.remove('active');
}

// Funciones de perfil (placeholder)
function viewProfile() {
    showNotification('Próximamente: Página de perfil', 'info');
    document.getElementById('userMenu').classList.remove('active');
}

function viewOrders() {
    showNotification('Próximamente: Mis pedidos', 'info');
    document.getElementById('userMenu').classList.remove('active');
}

function viewFavorites() {
    showNotification('Próximamente: Favoritos', 'info');
    document.getElementById('userMenu').classList.remove('active');
}

// ========================================
// BUSCADOR MEJORADO
// ========================================

// Crear contenedor de resultados si no existe
function createSearchResults() {
    const searchBar = document.querySelector('.search-bar');
    let searchResults = document.getElementById('searchResults');
    
    if (!searchResults) {
        searchResults = document.createElement('div');
        searchResults.id = 'searchResults';
        searchResults.className = 'search-results';
        searchBar.appendChild(searchResults);
    }
    
    return searchResults;
}

// Configurar buscador mejorado
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = createSearchResults();
    
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase().trim();
        
        // Ocultar resultados si está vacío
        if (searchTerm === '') {
            searchResults.classList.remove('active');
            loadBooks();
            return;
        }
        
        // Filtrar libros
        const filteredBooks = books.filter(book => 
            book.title.toLowerCase().includes(searchTerm) || 
            book.author.toLowerCase().includes(searchTerm) ||
            book.description.toLowerCase().includes(searchTerm)
        );
        
        // Mostrar resultados en dropdown
        if (filteredBooks.length > 0) {
            searchResults.innerHTML = filteredBooks.slice(0, 5).map(book => `
                <div class="search-result-item" onclick="selectSearchResult(${book.id})">
                    <img src="${book.image}" alt="${book.title}" class="search-result-image" onerror="this.src='img/no-image.jpg'">
                    <div class="search-result-info">
                        <div class="search-result-title">${highlightText(book.title, searchTerm)}</div>
                        <div class="search-result-author">${book.author}</div>
                    </div>
                    <div class="search-result-price">S/ ${book.price.toFixed(2)}</div>
                </div>
            `).join('');
            searchResults.classList.add('active');
        } else {
            searchResults.innerHTML = `
                <div class="search-no-results">
                    <i class="fas fa-search"></i>
                    <p>No se encontraron resultados para "${searchTerm}"</p>
                </div>
            `;
            searchResults.classList.add('active');
        }
        
        // Actualizar grid principal
        updateMainGrid(filteredBooks);
    });
    
    // Cerrar resultados al hacer clic fuera
    document.addEventListener('click', function(event) {
        if (!searchInput.contains(event.target) && !searchResults.contains(event.target)) {
            searchResults.classList.remove('active');
        }
    });
}

// Resaltar texto en búsqueda
function highlightText(text, search) {
    const regex = new RegExp(`(${search})`, 'gi');
    return text.replace(regex, '<mark style="background-color: #FFF59D; padding: 2px;">$1</mark>');
}

// Seleccionar resultado de búsqueda
function selectSearchResult(bookId) {
    const book = books.find(b => b.id === bookId);
    if (book) {
        // Scroll al libro
        document.getElementById('destacados').scrollIntoView({ behavior: 'smooth' });
        
        // Cerrar dropdown
        document.getElementById('searchResults').classList.remove('active');
        
        // Highlight el libro seleccionado
        setTimeout(() => {
            const bookCards = document.querySelectorAll('.book-card');
            bookCards.forEach((card, index) => {
                if (books[index]?.id === bookId) {
                    card.style.animation = 'pulse 1s ease';
                    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            });
        }, 500);
    }
}

// Actualizar grid principal
function updateMainGrid(filteredBooks) {
    const grid = document.getElementById('booksGrid');
    
    if (filteredBooks.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px;">
                <i class="fas fa-search" style="font-size: 64px; color: #ddd; margin-bottom: 20px;"></i>
                <h3 style="color: #666;">No se encontraron resultados</h3>
                <p style="color: #999;">Intenta con otras palabras clave</p>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = filteredBooks.map(book => `
        <div class="book-card" data-category="${book.category}">
            ${book.bestseller ? '<span class="book-badge">Bestseller</span>' : ''}
            <div class="book-image-container">
                <img src="${book.image}" 
                     alt="${book.title}" 
                     class="book-image-real"
                     onerror="this.src='img/no-image.jpg'">
            </div>
            <div class="book-info">
                <div class="book-title">${book.title}</div>
                <div class="book-author">${book.author}</div>
                <div class="book-price">S/ ${book.price.toFixed(2)}</div>
                <button class="add-to-cart-btn" onclick="addToCart(${book.id})">
                    <i class="fas fa-shopping-cart"></i> Agregar al Carrito
                </button>
            </div>
        </div>
    `).join('');
}

// Animación de pulse
const pulseStyle = document.createElement('style');
pulseStyle.textContent = `
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); box-shadow: 0 15px 40px rgba(33, 150, 243, 0.4); }
    }
`;
document.head.appendChild(pulseStyle);