document.addEventListener('DOMContentLoaded', function () {
  const btn = document.getElementById('btnVerCatalogo');
  const select = document.getElementById('selectCategoria');
  const contenido = document.getElementById('contenidoCatalogo');

  const itemsCarritoDiv = document.getElementById('itemsCarrito');
  const totalCarritoSpan = document.getElementById('totalCarrito');
  const vaciarCarritoBtn = document.getElementById('vaciarCarrito');

  const detallePedidoDiv = document.getElementById('detallePedido');
  const totalPedidoSpan = document.getElementById('totalPedido');
  const detallePedidoTextoInput = document.getElementById('detallePedidoTexto');

  const formPedido = document.getElementById('formPedido');

  let carrito = [];

  // Productos
  const productos = {
    frutas: [
      { id: 'durazno', nombre: 'Durazno', precio: 80, img: 'img/frutas/durazno.jpg' },
      { id: 'uva', nombre: 'Uva', precio: 70, img: 'img/frutas/uva.jpg' },
      { id: 'sandia', nombre: 'Sandía', precio: 90, img: 'img/frutas/sandia.jpg' },
      { id: 'pera', nombre: 'Pera', precio: 60, img: 'img/frutas/pera.jpg' },
      { id: 'kiwi', nombre: 'Kiwi', precio: 100, img: 'img/frutas/kiwi.jpg' },
      { id: 'arandano', nombre: 'Arándano', precio: 120, img: 'img/frutas/arandano.jpg' },
      { id: 'ciruela', nombre: 'Ciruela', precio: 85, img: 'img/frutas/ciruela.jpg' },
      { id: 'frutilla', nombre: 'Frutilla', precio: 110, img: 'img/frutas/frutilla.jpg' },
      { id: 'melon', nombre: 'Melón', precio: 95, img: 'img/frutas/melon.jpg' },
    ],
    verduras: [
      { id: 'papa', nombre: 'Papa', precio: 40, img: 'img/verduras/papa.jpg' },
      { id: 'boniato', nombre: 'Boniato', precio: 50, img: 'img/verduras/boniato.jpg' },
      { id: 'zapallo', nombre: 'Zapallo', precio: 60, img: 'img/verduras/zapallo.jpg' },
      { id: 'tomate', nombre: 'Tomate', precio: 35, img: 'img/verduras/tomate.jpg' },
      { id: 'morron', nombre: 'Morrón', precio: 45, img: 'img/verduras/morron.jpg' },
      { id: 'ajo', nombre: 'Ajo', precio: 30, img: 'img/verduras/ajo.jpg' },
      { id: 'zanahoria', nombre: 'Zanahoria', precio: 25, img: 'img/verduras/zanahoria.jpg' },
      { id: 'zapallito', nombre: 'Zapallito', precio: 40, img: 'img/verduras/zapallito.jpg' },
      { id: 'brocoli', nombre: 'Brócoli', precio: 70, img: 'img/verduras/brocoli.jpg' },
      { id: 'acelga', nombre: 'Acelga', precio: 20, img: 'img/verduras/acelga.jpg' },
      { id: 'rabanito', nombre: 'Rabanito', precio: 15, img: 'img/verduras/rabanito.jpg' },
      { id: 'remolacha', nombre: 'Remolacha', precio: 25, img: 'img/verduras/remolacha.jpg' },
      { id: 'perejil', nombre: 'Perejil', precio: 10, img: 'img/verduras/perejil.jpg' },
    ],
    otros: [
      { id: 'huevos', nombre: 'Huevos', precio: 60, img: 'img/otros/huevos.jpg' },
      { id: 'papel_higienico', nombre: 'Papel Higiénico', precio: 50, img: 'img/otros/papel_higienico.jpg' },
      { id: 'jabon_liquido', nombre: 'Jabón Líquido', precio: 70, img: 'img/otros/jabon_liquido.jpg' },
      { id: 'harina', nombre: 'Harina', precio: 40, img: 'img/otros/harina.jpg' },
    ],
  };

  btn.addEventListener('click', () => {
    select.style.display = select.style.display === 'none' ? 'block' : 'none';
  });

  select.addEventListener('change', (e) => {
    const categoria = e.target.value;
    mostrarCategoria(categoria);
  });

  function mostrarCategoria(categoria) {
    if (!categoria || !productos[categoria]) {
      contenido.innerHTML = "";
      return;
    }

    let html = '';
    productos[categoria].forEach(prod => {
      html += `
        <div class="itemProducto">
          <img src="${prod.img}" alt="${prod.nombre}" />
          <p>${prod.nombre}: $${prod.precio}</p>
          <button onclick="agregarAlCarrito('${prod.id}')">Añadir al carrito</button>
        </div>
      `;
    });

    contenido.innerHTML = html;
  }

  // Función para obtener producto por id
  function obtenerProductoPorId(id) {
    for (let cat in productos) {
      const prod = productos[cat].find(p => p.id === id);
      if (prod) return prod;
    }
    return null;
  }

  window.agregarAlCarrito = function (id) {
    const producto = obtenerProductoPorId(id);
    if (!producto) return;

    const itemExistente = carrito.find(item => item.id === id);
    if (itemExistente) {
      itemExistente.cantidad++;
    } else {
      carrito.push({ ...producto, cantidad: 1 });
    }

    mostrarCarrito();
  };

  function mostrarCarrito() {
    if (carrito.length === 0) {
      itemsCarritoDiv.innerHTML = '<p>El carrito está vacío.</p>';
      totalCarritoSpan.textContent = '0';

      detallePedidoDiv.innerHTML = 'No hay productos en el carrito.';
      totalPedidoSpan.textContent = '0';
      detallePedidoTextoInput.value = '';
      return;
    }

    let html = '';
    let total = 0;
    let textoResumen = '';

    carrito.forEach(item => {
      total += item.precio * item.cantidad;
      html += `
        <div class="itemCarrito">
          <p>${item.nombre} - $${item.precio} x ${item.cantidad}</p>
        </div>
      `;
      textoResumen += `${item.nombre} x${item.cantidad} - $${item.precio * item.cantidad}\n`;
    });

    itemsCarritoDiv.innerHTML = html;
    totalCarritoSpan.textContent = total;

    detallePedidoDiv.innerHTML = textoResumen.replace(/\n/g, '<br>');
    totalPedidoSpan.textContent = total;
    detallePedidoTextoInput.value = textoResumen + `Total: $${total}`;
  }

  vaciarCarritoBtn.addEventListener('click', () => {
    carrito = [];
    mostrarCarrito();
  });

  // Validar carrito no vacío antes de enviar pedido
  formPedido.addEventListener('submit', function(e) {
    if (carrito.length === 0) {
      e.preventDefault();
      alert('El carrito está vacío. Por favor, agregá productos antes de enviar el pedido.');
    }
  });

  window.mostrarOfertas = function () {
    const ofertas = document.getElementById('menuOfertas');
    ofertas.style.display = ofertas.style.display === 'none' ? 'block' : 'none';
  };

  // Inicializamos
  mostrarCarrito();
});
