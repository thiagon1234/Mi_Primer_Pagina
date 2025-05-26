document.addEventListener('DOMContentLoaded', function () {
  const btn = document.getElementById('btnVerCatalogo');
  const select = document.getElementById('selectCategoria');
  const contenido = document.getElementById('contenidoCatalogo');
  const carrito = [];
  const listaCarrito = document.getElementById('listaCarrito');
  const totalCarrito = document.getElementById('totalCarrito');

  btn.addEventListener('click', () => {
    if (select.style.display === 'none') {
      select.style.display = 'block';
      btn.textContent = 'Ocultar categorías';
    } else {
      select.style.display = 'none';
      btn.textContent = 'Ver catálogo';
      contenido.innerHTML = ''; // limpiar catálogo al ocultar select
      select.value = '';
    }
  });

  select.addEventListener('change', (e) => {
    mostrarCategoria(e.target.value);
  });

  function mostrarCategoria(categoria) {
    const productos = {
      frutas: [
        { nombre: 'Manzana', precio: 50, imagen: 'https://media.istockphoto.com/id/184276818/es/foto/manzana-red.jpg?s=612x612&w=0&k=20&c=BFD8ixD7eyXMm3aSVIdz1hUsLG-lX8Ig2HBr6IVJuzU=' },
        { nombre: 'Banana', precio: 30, imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSw91g2wSbr4Z81f7bnPWCSyiG7kzCJUWelng&s' },
        { nombre: 'Naranja', precio: 40, imagen: 'https://media.istockphoto.com/id/672613170/es/foto/rodajas-de-naranja-aislado-sobre-blanco.jpg?s=612x612&w=0&k=20&c=GBaH5pQzLm0ugkBU1SrL3o9a0ED_tcFdVk8BbQmS7AQ=' },
        { nombre: 'Durazno', precio: 55, imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREVqf1vztHX-GupFSLjDucrRbjiCbymgiqeA&s' },
        { nombre: 'Uva', precio: 60, imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8cVFePNDclSR9ckMSM1s7ohJHJ5bDL0X3uw&s' },
        { nombre: 'Sandía', precio: 70, imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpibvjLdQZZElazW7WbT9f4u1wLYgYIbTgCg&s' },
        { nombre: 'Pera', precio: 50, imagen: 'https://media.istockphoto.com/id/1299073137/es/foto/peras-aisladas-fruta-de-pera-verde-de-una-y-media-con-hoja-sobre-fondo-blanco-rebanada-de-pera.jpg?s=612x612&w=0&k=20&c=8cEVuSqpRG1tCfSN1KhwUO6fgZ1a2YT032bHrDWfEzc=' },
        { nombre: 'Kiwi', precio: 65, imagen: 'https://media.istockphoto.com/id/834807852/es/foto/fruta-de-kiwi-entero-y-medio-kiwi-frutas-en-blanco.jpg?s=612x612&w=0&k=20&c=gOuxdy3L1fiuOxAMxiU9ffs_0tSDP_lv0CC5TGYBGJY=' },
        { nombre: 'Arándano', precio: 80, imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHYPWH4Z2in_t_EWXIcfp-n_-fcLmFQLaRLQ&s' },
        { nombre: 'Ciruela', precio: 50, imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS21OuzKJl3tjFNukpoKKbmkTO9iCNwd6WLg&s' },
        { nombre: 'Frutilla', precio: 75, imagen: 'https://media.istockphoto.com/id/1071084902/es/foto/fresa-aislado-en-blanco.jpg?s=612x612&w=0&k=20&c=TK-d2KKavDz02fDmaQrqqRSEKzxUCFv6jVY3savFkfM=' },
        { nombre: 'Melón', precio: 60, imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPA87oV_pUep3PIYkzeKEurpB4MRrs_dJYdA&s' }
      ],
      verduras: [
        { nombre: 'Papa', precio: 20, imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgPzsnoRsnCNht9RBvr3WdHqz1H7FFCRjozw&s' },
        { nombre: 'Boniato', precio: 25, imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIQnfCez0qmp3OH02bUr7Ch-pJ16A2OZpYjQ&s' },
        { nombre: 'Zapallo', precio: 30, imagen: 'https://eldoradouy.vtexassets.com/arquivos/ids/1161324-800-auto?v=638452598541670000&width=800&height=auto&aspect=true' },
        { nombre: 'Tomate', precio: 35, imagen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Bright_red_tomato_and_cross_section02.jpg/960px-Bright_red_tomato_and_cross_section02.jpg' },
        { nombre: 'Morrón', precio: 40, imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlGSfmKo0NiaGzxnM3k_rpu2v_gpFhPNuP1w&s' },
        { nombre: 'Ajo', precio: 50, imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQi2CYMxQmm6Z7m6S_8vK8uDhL1tK5_qam6HA&s' },
        { nombre: 'Zanahoria', precio: 28, imagen: 'https://tutifruti.com.uy/wp-content/uploads/2024/03/Zanahoria.jpg' },
        { nombre: 'Zapallito', precio: 33, imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNT9AWGk7tU-RG_RGC1dBev3HRwxUbBoeC_Q&s' },
        { nombre: 'Brócoli', precio: 45, imagen: 'https://images.cookforyourlife.org/wp-content/uploads/2018/08/shutterstock_294838064-min.jpg' },
        { nombre: 'Acelga', precio: 30, imagen: 'https://discouy.vtexassets.com/arquivos/ids/1945024-800-450?v=638791978133930000&width=800&height=450&aspect=true' },
        { nombre: 'Rabanito', precio: 20, imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ--5g5bPls7Vb80sMtxqp5fWBcXwSbrRCckA&s' },
        { nombre: 'Remolacha', precio: 25, imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZM3P9ooRLMlvHJc9AYx2hjpVmMF8w6YtR3Pq8iDAmwFsi2SCosTYl3lXLD34llvmhX90&usqp=CAU' },
        { nombre: 'Perejil', precio: 15, imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf8qhQGSrW-7Ca0h0b2Po65gq3V0CkcTyOvw&s' }
      ],
      otros: [
        { nombre: 'Huevos', precio: 60, imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSAsOR6sVmTDb292HTABsThCpsZJI0TLJQxQ&s' },
        { nombre: 'Papel higiénico', precio: 50, imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTlDLY9GyV89yeZMIL4yWvR44SVqD1ewQEpQ&s' },
        { nombre: 'Jabón líquido', precio: 90, imagen: 'https://mediato.com.uy/mvdpanel_productos_img/Jabon_liquido_Aqua_Fast_multi_accion_5lt.jpg' },
        { nombre: 'Harina', precio: 40, imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfA8h6_y6Mekv_l3zH3ZSEQA7cuVA1XOFR3g&s' }
      ]
    };

    const items = productos[categoria] || [];
    contenido.innerHTML = items.map(prod => `
      <div>
        <img src="${prod.imagen}" alt="${prod.nombre}" />
        <p>${prod.nombre}: $${prod.precio} por kg</p>
        <input type="number" placeholder="Cantidad en kg" min="0.1" step="0.1" id="cant-${prod.nombre}" />
        <button onclick="agregarAlCarrito('${prod.nombre}', ${prod.precio}, 'cant-${prod.nombre}')">Agregar al carrito</button>
      </div>
    `).join('');
  }

  // Ofertas con funcionalidad para agregar al carrito
  const ofertas = [
  {
    nombre: "Combo 1: 2 kg de Manzana + 1 kg de Banana",
    precio: 200,
    imagen: "https://cdn.pixabay.com/photo/2015/03/24/08/55/fruits-686202_1280.jpg"
  },
  {
    nombre: "Combo 2: 1 kg de Naranja + 1 kg de Zanahoria",
    precio: 150,
    imagen: "https://cdn.pixabay.com/photo/2018/02/23/10/01/orange-3170533_1280.jpg"
  },
  {
    nombre: "Combo 3: 1 kg de Papa + 1 kg de Zapallo + 1 kg de Tomate",
    precio: 220,
    imagen: "https://cdn.pixabay.com/photo/2017/02/23/20/57/vegetables-2099905_1280.jpg"
  },
  {
    nombre: "Combo 4: 3 kg de Frutilla",
    precio: 270,
    imagen: "https://cdn.pixabay.com/photo/2016/07/22/09/59/strawberries-1533549_1280.jpg"
  },
  {
    nombre: "Combo 5: 2 kg de Sandía + 1 kg de Uva",
    precio: 250,
    imagen: "https://cdn.pixabay.com/photo/2017/06/13/22/42/fruits-2400164_1280.jpg"
  },
  {
    nombre: "Combo 6: 1 kg de Brócoli + 1 kg de Acelga + 1 kg de Remolacha",
    precio: 200,
    imagen: "https://cdn.pixabay.com/photo/2017/07/26/09/28/vegetables-2545905_1280.jpg"
  }
];

  const menuOfertas = document.getElementById('menuOfertas');

  window.mostrarOfertas = function () {
    if (menuOfertas.style.display === 'none' || menuOfertas.style.display === '') {
      menuOfertas.style.display = 'block';
      menuOfertas.innerHTML = ofertas.map((oferta, i) => `
        <div>
          <img src="${oferta.imagen}" alt="${oferta.nombre}" />
          <p>${oferta.nombre} - $${oferta.precio}</p>
          <input type="number" placeholder="Cantidad" min="1" step="1" id="cant-oferta-${i}" />
          <button onclick="agregarAlCarrito('${oferta.nombre}', ${oferta.precio}, 'cant-oferta-${i}')">Agregar al carrito</button>
        </div>
      `).join('');
    } else {
      menuOfertas.style.display = 'none';
      menuOfertas.innerHTML = '';
    }
  };

  window.agregarAlCarrito = function (nombre, precio, inputId) {
    let cantidadInput = document.getElementById(inputId);
    let cantidad = parseFloat(cantidadInput.value);
    if (isNaN(cantidad) || cantidad <= 0) {
      alert('Por favor, ingresa una cantidad válida mayor a 0');
      return;
    }
    carrito.push({ nombre, precio, cantidad });
    actualizarCarrito();
    cantidadInput.value = '';
  };

  function actualizarCarrito() {
    listaCarrito.innerHTML = '';
    let total = 0;
    carrito.forEach(item => {
      const subtotal = item.precio * item.cantidad;
      total += subtotal;
      const li = document.createElement('li');
      li.textContent = `${item.nombre} - ${item.cantidad} unidades - $${subtotal.toFixed(2)}`;
      listaCarrito.appendChild(li);
    });
    totalCarrito.textContent = total.toFixed(2);
  }

  window.mostrarResumen = function () {
    const form = document.querySelector('#pedido form');
    const nombre = form.nombre.value.trim();
    const direccion = form.direccion.value.trim();
    const telefono = form.telefono.value.trim();

    if (!nombre || !direccion || !telefono) {
      alert('Por favor, completa todos los campos para realizar el pedido.');
      return false;
    }

    if (carrito.length === 0) {
      alert('No has agregado productos al carrito.');
      return false;
    }

    let resumen = `<p><strong>Pedido para:</strong> ${nombre}</p>`;
    resumen += `<p><strong>Dirección:</strong> ${direccion}</p>`;
    resumen += `<p><strong>Teléfono:</strong> ${telefono}</p>`;
    resumen += `<p><strong>Productos:</strong></p><ul>`;

    carrito.forEach(item => {
      resumen += `<li>${item.nombre} - ${item.cantidad} unidades - $${(item.precio * item.cantidad).toFixed(2)}</li>`;
    });

    resumen += `</ul><p><strong>Total a pagar:</strong> $${totalCarrito.textContent}</p>`;

    document.getElementById('resumenPedido').innerHTML = resumen;

    return false;
  };
});
