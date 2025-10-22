// Base de datos de productos
const books = [
    {
        id: 1,
        title: 'Cien Años de Soledad',
        author: 'Gabriel García Márquez',
        price: 45.90,
        category: 'ficcion',
        isbn: '978-0307474728',
        description: 'La obra maestra del realismo mágico',
        stock: 15,
        bestseller: true,
        image: 'img/libros/cien-anos-soledad.jpg' // ⬅️ NUEVA PROPIEDAD
    },
    {
        id: 2,
        title: 'El Principito',
        author: 'Antoine de Saint-Exupéry',
        price: 32.50,
        category: 'infantil',
        isbn: '978-0156012195',
        description: 'Un clásico de la literatura infantil',
        stock: 20,
        bestseller: true,
        image: 'img/libros/el-principito.jpg'
    },
    {
        id: 3,
        title: 'Sapiens',
        author: 'Yuval Noah Harari',
        price: 58.00,
        category: 'no-ficcion',
        isbn: '978-0062316110',
        description: 'De animales a dioses: Breve historia de la humanidad',
        stock: 12,
        bestseller: true,
        image: 'img/libros/sapiens.jpg'
    },
    {
        id: 4,
        title: '1984',
        author: 'George Orwell',
        price: 38.90,
        category: 'ficcion',
        isbn: '978-0451524935',
        description: 'Una distopía clásica sobre el totalitarismo',
        stock: 18,
        bestseller: false,
        image: 'img/libros/1984.jpg'
    },
    {
        id: 5,
        title: 'El Alquimista',
        author: 'Paulo Coelho',
        price: 35.00,
        category: 'ficcion',
        isbn: '978-0062315007',
        description: 'Una fábula sobre seguir tus sueños',
        stock: 25,
        bestseller: true,
        image: 'img/libros/el-alquimista.jpg'
    },
    {
        id: 6,
        title: 'Harry Potter y la Piedra Filosofal',
        author: 'J.K. Rowling',
        price: 65.00,
        category: 'infantil',
        isbn: '978-0439708180',
        description: 'El inicio de la saga mágica más famosa',
        stock: 30,
        bestseller: true,
        image: 'img/libros/harry-potter.jpg'
    },
    {
        id: 7,
        title: 'Padre Rico Padre Pobre',
        author: 'Robert Kiyosaki',
        price: 42.00,
        category: 'no-ficcion',
        isbn: '978-1612680194',
        description: 'Qué les enseñan los ricos a sus hijos',
        stock: 22,
        bestseller: true,
        image: 'img/libros/padre-rico.jpg'
    },
    {
        id: 8,
        title: 'Don Quijote de la Mancha',
        author: 'Miguel de Cervantes',
        price: 52.00,
        category: 'ficcion',
        isbn: '978-8420412146',
        description: 'La obra cumbre de la literatura española',
        stock: 10,
        bestseller: false,
        image: 'img/libros/don-quijote.jpg'
    },
    {
        id: 9,
        title: 'Breve Historia del Tiempo',
        author: 'Stephen Hawking',
        price: 48.00,
        category: 'academico',
        isbn: '978-0553380163',
        description: 'Del Big Bang a los agujeros negros',
        stock: 8,
        bestseller: false,
        image: 'img/libros/historia-tiempo.jpg'
    },
    {
        id: 10,
        title: 'El Principito Ilustrado',
        author: 'Antoine de Saint-Exupéry',
        price: 55.00,
        category: 'infantil',
        isbn: '978-0156013987',
        description: 'Edición especial con ilustraciones',
        stock: 15,
        bestseller: false,
        image: 'img/libros/principito-ilustrado.jpg'
    },
    {
        id: 11,
        title: 'Hábitos Atómicos',
        author: 'James Clear',
        price: 49.90,
        category: 'no-ficcion',
        isbn: '978-1847941831',
        description: 'Cambios pequeños, resultados extraordinarios',
        stock: 20,
        bestseller: true,
        image: 'img/libros/habitos-atomicos.jpg'
    },
    {
        id: 12,
        title: 'El Código Da Vinci',
        author: 'Dan Brown',
        price: 43.50,
        category: 'ficcion',
        isbn: '978-0307474278',
        description: 'Un thriller de misterio histórico',
        stock: 14,
        bestseller: false,
        image: 'img/libros/codigo-davinci.jpg'
    },
    {
        id: 13,
        title: 'Introducción a la Programación',
        author: 'John Zelle',
        price: 68.00,
        category: 'academico',
        isbn: '978-1590282410',
        description: 'Aprende a programar con Python',
        stock: 12,
        bestseller: false,
        image: 'img/libros/programacion.jpg'
    },
    {
        id: 14,
        title: 'La Sutil Arte de que te Importe un Caraj*',
        author: 'Mark Manson',
        price: 39.90,
        category: 'no-ficcion',
        isbn: '978-0062457714',
        description: 'Un enfoque disruptivo para vivir una buena vida',
        stock: 18,
        bestseller: true,
        image: 'img/libros/sutil-arte.jpg'
    },
    {
        id: 15,
        title: 'Matilda',
        author: 'Roald Dahl',
        price: 34.00,
        category: 'infantil',
        isbn: '978-0142410370',
        description: 'La historia de una niña extraordinaria',
        stock: 16,
        bestseller: false,
        image: 'img/libros/matilda.jpg'
    },
    {
        id: 16,
        title: 'Cálculo: Una Variable',
        author: 'James Stewart',
        price: 95.00,
        category: 'academico',
        isbn: '978-1285740621',
        description: 'Texto universitario de cálculo',
        stock: 6,
        bestseller: false,
        image: 'img/libros/calculo.jpg'
    }
];

// Novedades
const novedades = [
    {
        id: 17,
        title: 'El Problema de los Tres Cuerpos',
        author: 'Liu Cixin',
        price: 52.00,
        category: 'ficcion',
        isbn: '978-0765382030',
        description: 'Ciencia ficción épica china',
        stock: 10,
        isNew: true,
        image: 'img/libros/tres-cuerpos.jpg'
    },
    {
        id: 18,
        title: 'Piensa Rápido, Piensa Despacio',
        author: 'Daniel Kahneman',
        price: 54.90,
        category: 'no-ficcion',
        isbn: '978-0374533557',
        description: 'Los dos sistemas que rigen cómo pensamos',
        stock: 8,
        isNew: true,
        image: 'img/libros/piensa-rapido.jpg'
    },
    {
        id: 19,
        title: 'El Hobbit',
        author: 'J.R.R. Tolkien',
        price: 47.00,
        category: 'ficcion',
        isbn: '978-0547928227',
        description: 'La precuela de El Señor de los Anillos',
        stock: 12,
        isNew: true,
        image: 'img/libros/el-hobbit.jpg'
    },
    {
        id: 20,
        title: 'Educated',
        author: 'Tara Westover',
        price: 44.00,
        category: 'no-ficcion',
        isbn: '978-0399590504',
        description: 'Una memoria sobre educación y familia',
        stock: 9,
        isNew: true,
        image: 'img/libros/educated.jpg'
    }
];