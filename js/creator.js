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
