// Mostrar/ocultar menú de catálogo
document.getElementById('btnVerCatalogo').addEventListener('click', () => {
  const menu = document.getElementById('menuCatalogo');
  menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
});

// Datos de productos con imágenes y precios
const productos = {
  frutas: {
    imagen: 'https://images.unsplash.com/photo-1574226516831-e1dff420e9a5?auto=format&fit=crop&w=400&q=80',
    items: [
      { nombre: 'Manzana', precio: 50 },
      { nombre: 'Banana', precio: 30 },
      { nombre: 'Naranja', precio: 40 }
    ]
  },
  verduras: {
    imagen: 'https://images.unsplash.com/photo-1506807803488-8eafc153e9e3?auto=format&fit=crop&w=400&q=80',
    items: [
      { nombre: 'Zanahoria', precio: 20 },
      { nombre: 'Lechuga', precio: 25 },
      { nombre: 'Tomate', precio: 35 }
    ]
  },
  otros: {
    imagen: 'https://images.unsplash.com/photo-1583152335110-4f5a84cfd80e?auto=format&fit=crop&w=400&q=80',
    items: [
      { nombre: 'Huevos (docena)', precio: 120 },
      { nombre: 'Harina (1 kg)', precio: 60 },
      { nombre: 'Aceite (1L)', precio: 180 }
    ]
  }
};

const botonesCategoria = document.querySelectorAll('.categoria-btn');
const contenidoCatalogo = document.getElementById('contenidoCatalogo');

botonesCategoria.forEach(boton => {
  boton.addEventListener('click', () => {
    const categoria = boton.getAttribute('data-categoria');
    mostrarCategoria(categoria);
  });
});

function mostrarCategoria(categoria) {
  const data = productos[categoria];
  if (!data) return;

  // Limpiar contenido anterior
  contenidoCatalogo.innerHTML = '';

  // Crear imagen
  const img = document.createElement('img');
  img.src = data.imagen;
  img.alt = categoria;
  contenidoCatalogo.appendChild(img);

  // Crear lista de productos con precios
  data.items.forEach(item => {
    const p = document.createElement('p');
    p.textContent = `${item.nombre}: $${item.precio}`;
    contenidoCatalogo.appendChild(p);
  });
}

// Función para mostrar/ocultar ofertas (la que ya tenías)
function mostrarOfertas() {
  const ofertas = document.getElementById('menuOfertas');
  ofertas.style.display = ofertas.style.display === 'none' ? 'block' : 'none';
}
