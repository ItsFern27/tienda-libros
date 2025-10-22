    // Agregar al carrito
        function addToCart(bookId) {
            const book = books.find(b => b.id === bookId);
            cart.push(book);
            updateCartCount();
            showNotification(`"${book.title}" agregado al carrito`);
        }

        // Actualizar contador del carrito
        function updateCartCount() {
            document.getElementById('cartCount').textContent = cart.length;
        }

        // Mostrar notificación
        function showNotification(message) {
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                top: 100px;
                right: 20px;
                background-color: #4CAF50;
                color: white;
                padding: 15px 25px;
                border-radius: 8px;
                box-shadow: 0 5px 15px rgba(0,0,0,0.3);
                z-index: 10000;
                animation: slideIn 0.3s ease;
            `;
            notification.textContent = message;
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }, 2000);
        }

        // Carousel
        function moveCarousel(direction) {
            const items = document.getElementById('carouselItems');
            const totalSlides = 3;
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

        // Auto-play carousel
        setInterval(() => moveCarousel(1), 5000);

        // Toggle cart
        function toggleCart() {
            if (cart.length === 0) {
                alert('Tu carrito está vacío');
            } else {
                const cartContent = cart.map(item => `${item.title} - S/ ${item.price.toFixed(2)}`).join('\n');
                const total = cart.reduce((sum, item) => sum + item.price, 0);
                alert(`Carrito (${cart.length} items):\n\n${cartContent}\n\nTotal: S/ ${total.toFixed(2)}`);
            }
        }

        // Búsqueda
        document.getElementById('searchInput').addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const filteredBooks = books.filter(book => 
                book.title.toLowerCase().includes(searchTerm) || 
                book.author.toLowerCase().includes(searchTerm)
            );
            
            const grid = document.getElementById('booksGrid');
            if (searchTerm === '') {
                loadBooks();
            } else {
                grid.innerHTML = filteredBooks.map(book => `
                    <div class="book-card">
                        <div class="book-image">${book.number}</div>
                        <div class="book-info">
                            <div class="book-title">${book.title}</div>
                            <div class="book-author">${book.author}</div>
                            <div class="book-price">S/ ${book.price.toFixed(2)}</div>
                            <button class="add-to-cart-btn" onclick="addToCart(${book.id})">
                                <i class="fas fa-shopping-cart"></i> Agregar al carrito
                            </button>
                        </div>
                    </div>
                `).join('');
            }
        });

        // Inicializar
        loadBooks();

        // Animaciones CSS adicionales
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);