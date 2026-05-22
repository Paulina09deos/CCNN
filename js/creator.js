(function () {
  const markerInput = document.querySelector("[data-marker-input]");
  const markerPreview = document.querySelector("[data-marker-preview]");
  const modelInput = document.querySelector("[data-model-input]");
  const modelName = document.querySelector("[data-model-name]");
  const qrInput = document.querySelector("#qr-url");
  const fillUrlButton = document.querySelector("[data-fill-viewer-url]");
  const generateButton = document.querySelector("[data-generate-qr]");
  const qrMessage = document.querySelector("[data-qr-message]");
  const qrTarget = document.querySelector("#qr-code");

  function viewerUrlFromCurrentPage() {
    const current = new URL(window.location.href);
    const path = current.pathname.replace(/(index|creator)\.html$/, "viewer.html");
    current.pathname = path.endsWith("/") ? `${path}viewer.html` : path;
    current.search = "";
    current.hash = "";
    return current.toString();
  }

  function showMessage(message) {
    if (qrMessage) {
      qrMessage.textContent = message;
    }
  }

  function generateQr() {
    if (!qrTarget || !qrInput) {
      return;
    }

    const url = qrInput.value.trim() || viewerUrlFromCurrentPage();
    qrInput.value = url;
    qrTarget.innerHTML = "";

    if (typeof QRCode === "undefined") {
      qrTarget.textContent = "No se pudo cargar qrcode.js. Revisa tu conexion a internet.";
      showMessage("qrcode.js se carga desde CDN y requiere conexion para generar el QR.");
      return;
    }

    new QRCode(qrTarget, {
      text: url,
      width: 220,
      height: 220,
      colorDark: "#1f2933",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H
    });

    showMessage("QR generado. Pruebalo desde un celular con acceso a internet.");
  }

  if (markerInput && markerPreview) {
    markerPreview.addEventListener("error", function () {
      markerPreview.src = "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='800' viewBox='0 0 1200 800'%3E%3Crect width='1200' height='800' fill='%23f6f8fb'/%3E%3Crect x='60' y='60' width='1080' height='680' fill='none' stroke='%231f2933' stroke-width='18'/%3E%3Ccircle cx='250' cy='230' r='110' fill='%23167c80'/%3E%3Ccircle cx='950' cy='230' r='110' fill='%23f0b429'/%3E%3Cpolygon points='600,145 735,365 465,365' fill='%231f2933'/%3E%3Ctext x='600' y='465' font-family='Arial, Helvetica, sans-serif' font-size='54' font-weight='700' text-anchor='middle' fill='%231f2933'%3EMARCADOR RA%3C/text%3E%3Ctext x='600' y='540' font-family='Arial, Helvetica, sans-serif' font-size='30' font-weight='700' text-anchor='middle' fill='%231f2933'%3EReemplaza assets/images/marcador.jpg%3C/text%3E%3C/svg%3E";
      markerPreview.alt = "Marcador de ejemplo generado mientras se reemplaza assets/images/marcador.jpg";
    });

    markerInput.addEventListener("change", function () {
      const file = markerInput.files && markerInput.files[0];
      if (!file) {
        return;
      }
      markerPreview.src = URL.createObjectURL(file);
      markerPreview.alt = `Previsualizacion de ${file.name}`;
    });
  }

  if (modelInput && modelName) {
    modelInput.addEventListener("change", function () {
      const file = modelInput.files && modelInput.files[0];
      if (!file) {
        modelName.textContent = "Ningun modelo seleccionado.";
        return;
      }
      const sizeMb = (file.size / (1024 * 1024)).toFixed(2);
      modelName.textContent = `${file.name} (${sizeMb} MB). Subelo como assets/models/modelo.glb.`;
    });
  }

  if (fillUrlButton && qrInput) {
    fillUrlButton.addEventListener("click", function () {
      qrInput.value = viewerUrlFromCurrentPage();
      showMessage("URL del visor completada. Puedes generar el QR.");
    });
  }

  if (generateButton) {
    generateButton.addEventListener("click", generateQr);
  }

  if (qrTarget) {
    qrTarget.textContent = "Aqui aparecera el QR.";
  }
})();
