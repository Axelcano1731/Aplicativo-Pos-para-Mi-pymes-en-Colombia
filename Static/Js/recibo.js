function imprimirRecibo() {
    // Obtenemos los datos del recibo
    const nombreCliente = document.getElementById("nombreCliente").textContent;
    const monto = document.getElementById("monto").textContent;
  
    // Actualizamos los datos del recibo
    document.getElementById("recibo").innerHTML = `
      <h1>Recibo de Pago</h1>
      <p>Nombre del cliente: ${nombreCliente}</p>
      <p>Monto: ${monto}</p>
    `;
  }