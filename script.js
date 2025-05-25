document.addEventListener('DOMContentLoaded', function () {
  const btn = document.getElementById('btnVerCatalogo');
  const select = document.getElementById('selectCategoria');
  const contenido = document.getElementById('contenidoCatalogo');
  const carrito = [];
  const listaCarrito = document.getElementById('listaCarrito');
  const totalCarrito = document.getElementById('totalCarrito');

  btn.addEventListener('click', () => {
    select.style.display = select.style.display === 'none' ? 'block' : 'none';
  });

  select.addEventListener('change', (e) => {
    mostrarCategoria(e.target.value);
  });

  function mostrarCategoria(categoria) {
    const productos = {
      frutas: [
        { nombre: 'Manzana', precio: 50 },
        { nombre: 'Banana', precio: 30 },
        { nombre: 'Naranja', precio: 40 },
        { nombre: 'Durazno', precio: 55 },
        { nombre: 'Uva', precio: 60 },
        { nombre: 'Sandía', precio: 70 },
        { nombre: 'Pera', precio: 50 },
        { nombre: 'Kiwi', precio: 65 },
        { nombre: 'Arándano', precio: 80 },
        { nombre: 'Ciruela', precio: 50 },
        { nombre: 'Frutilla', precio: 75 },
        { nombre: 'Melón', precio: 60 }
      ],
      verduras: [
        { nombre: 'Papa', precio: 20 },
        { nombre: 'Boniato', precio: 25 },
        { nombre: 'Zapallo', precio: 30 },
        { nombre: 'Tomate', precio: 35 },
        { nombre: 'Morrón', precio: 40 },
        { nombre: 'Ajo', precio: 50 },
        { nombre: 'Zanahoria', precio: 28 },
        { nombre: 'Zapallito', precio: 33 },
        { nombre: 'Brócoli', precio: 45 },
        { nombre: 'Acelga', precio: 30 },
        { nombre: 'Rabanito', precio: 20 },
        { nombre: 'Remolacha', precio: 25 },
        { nombre: 'Perejil', precio: 15 }
      ],
      otros: [
        { nombre: 'Huevos', precio: 60 },
        { nombre: 'Papel higiénico', precio: 50 },
        { nombre: 'Jabón líquido', precio: 90 },
        { nombre: 'Harina', precio: 40 }
      ]
    };

    const items = productos[categoria] || [];
    contenido.innerHTML = items.map(prod => `
      <div>
        <p>${prod.nombre}: $${prod.precio} por kg</p>
        <input type="number" placeholder="Cantidad en kg" min="0.1" step="0.1" id="cant-${prod.nombre}" />
        <button onclick="agregarAlCarrito('${prod.nombre}', ${prod.precio}, 'cant-${prod.nombre}')">Agregar al carrito</button>
      </div>
    `).join('');
  }

  window.agregarAlCarrito = function (nombre, precio, inputId) {
    let cantidad = 1;
    if (inputId) {
      const input = document.getElementById(inputId);
      if (input && input.value) {
        cantidad = parseFloat(input.value);
        if (isNaN(cantidad) || cantidad <= 0) {
          alert("Ingresá una cantidad válida.");
          return;
        }
      }
    }
    carrito.push({ nombre, precio, cantidad });
    actualizarCarrito();
  };

  function actualizarCarrito() {
    listaCarrito.innerHTML = '';
    let total = 0;
    carrito.forEach(item => {
      const subtotal = item.precio * (item.cantidad || 1);
      total += subtotal;
      const li = document.createElement('li');
      li.textContent = `${item.nombre} - ${item.cantidad || 1}kg - $${subtotal}`;
      listaCarrito.appendChild(li);
    });
    totalCarrito.textContent = total;
  }

  window.mostrarResumen = function () {
    const resumen = document.getElementById('resumenPedido');
    if (carrito.length === 0) {
      alert("El carrito está vacío.");
      return false;
    }
    resumen.innerHTML = `
      <h4>Resumen del pedido:</h4>
      <ul>
        ${carrito.map(i => `<li>${i.nombre} - ${i.cantidad || 1}kg - $${i.precio * (i.cantidad || 1)}</li>`).join('')}
      </ul>
      <p><strong>Total:</strong> $${carrito.reduce((acc, i) => acc + i.precio * (i.cantidad || 1), 0)}</p>
    `;
    return true;
  };

  window.mostrarOfertas = function () {
    const ofertasDiv = document.getElementById('menuOfertas');
    ofertasDiv.style.display = ofertasDiv.style.display === 'none' ? 'block' : 'none';

    const combos = [
      { nombre: "2kg de papa + 1kg de boniato", precio: 100 },
      { nombre: "1kg de zanahoria + 1kg de tomate", precio: 60 },
      { nombre: "1kg de frutilla + 1kg de kiwi", precio: 120 },
      { nombre: "2kg de sandía + 1kg de durazno", precio: 110 },
      { nombre: "2kg de zapallo + 1kg de zapallito", precio: 90 }
    ];

    ofertasDiv.innerHTML = combos.map(combo => `
      <div>
        <p>${combo.nombre}: $${combo.precio}</p>
        <button onclick="agregarAlCarrito('${combo.nombre}', ${combo.precio}, null)">Agregar al carrito</button>
      </div>
    `).join('');
  };
});
