// Ajusta estas variables para cambiar el modelo, marcador y transformaciones.
const MODEL_URL = "assets/models/modelo.glb";
const MARKER_URL = "assets/markers/marcador";
const MODEL_SCALE = "5 5 5";
const MODEL_POSITION = "0 0 0";
const MODEL_ROTATION = "0 0 0";

(function () {
  const statusEl = document.querySelector("[data-ar-status]");
  const root = document.querySelector("#ar-content-root");
  const markerFiles = [".fset", ".fset3", ".iset"].map((extension) => `${MARKER_URL}${extension}`);

  function setStatus(message) {
    if (statusEl) {
      statusEl.textContent = message;
    }
  }

  async function assetLooksReady(url, kind) {
    try {
      const response = await fetch(url, { cache: "no-store" });
      if (!response.ok) {
        return false;
      }

      if (kind === "glb") {
        const header = await response.arrayBuffer();
        const bytes = new Uint8Array(header.slice(0, 4));
        return String.fromCharCode(...bytes) === "glTF";
      }

      const text = await response.text();
      return text.trim().length > 40 && !text.includes("ARCHIVO DE EJEMPLO");
    } catch (error) {
      return false;
    }
  }

  async function verifyAssets() {
    const modelReady = await assetLooksReady(MODEL_URL, "glb");
    const markerReadyList = await Promise.all(markerFiles.map((file) => assetLooksReady(file, "marker")));
    const markersReady = markerReadyList.every(Boolean);

    if (!modelReady || !markersReady) {
      const missing = [];
      if (!modelReady) {
        missing.push("assets/models/modelo.glb");
      }
      if (!markersReady) {
        missing.push("assets/markers/marcador.fset, marcador.fset3 y marcador.iset");
      }
      setStatus(`Faltan archivos reales: ${missing.join(" | ")}.`);
      return false;
    }

    return true;
  }

  function createArContent() {
    if (!root) {
      return;
    }

    const nft = document.createElement("a-nft");
    nft.setAttribute("type", "nft");
    nft.setAttribute("url", MARKER_URL);
    nft.setAttribute("smooth", "true");
    nft.setAttribute("smoothCount", "10");
    nft.setAttribute("smoothTolerance", ".01");
    nft.setAttribute("smoothThreshold", "5");

    const model = document.createElement("a-entity");
    model.setAttribute("gltf-model", MODEL_URL);
    model.setAttribute("scale", MODEL_SCALE);
    model.setAttribute("position", MODEL_POSITION);
    model.setAttribute("rotation", MODEL_ROTATION);

    model.addEventListener("model-loaded", function () {
      setStatus("Modelo cargado. Apunta la camara hacia la imagen marcador.");
    });

    model.addEventListener("model-error", function () {
      setStatus("No se pudo cargar el modelo GLB. Reemplaza assets/models/modelo.glb.");
    });

    nft.addEventListener("markerFound", function () {
      setStatus("Marcador detectado. Si no aparece el modelo, mejora la iluminacion o acercate al marcador.");
    });

    nft.addEventListener("markerLost", function () {
      setStatus("Apunta la camara hacia la imagen marcador.");
    });

    nft.appendChild(model);
    root.appendChild(nft);
  }

  async function start() {
    setStatus("Permite el uso de la camara.");

    const ready = await verifyAssets();
    if (!ready) {
      return;
    }

    createArContent();
    setStatus("Apunta la camara hacia la imagen marcador.");
  }

  window.addEventListener("camera-init", function () {
    setStatus("Camara activa. Apunta la camara hacia la imagen marcador.");
  });

  window.addEventListener("camera-error", function () {
    setStatus("No se pudo acceder a la camara. Revisa los permisos del navegador.");
  });

  document.addEventListener("DOMContentLoaded", start);
})();
