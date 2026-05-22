# Realidad aumentada educativa con AR.js y GitHub Pages

Este repositorio contiene una experiencia gratuita de realidad aumentada educativa hecha con HTML, CSS, JavaScript, A-Frame, AR.js NFT/Image Tracking y qrcode.js. Funciona como sitio estatico en GitHub Pages, sin backend, sin bases de datos externas y sin servicios pagos.

Cuando el sitio este publicado, cualquier persona podra abrir el enlace o escanear un codigo QR, permitir la camara del celular, apuntar hacia una imagen marcador y visualizar un modelo 3D GLB en realidad aumentada.

## Que es este proyecto

El proyecto muestra un modelo 3D sobre una imagen marcador personalizada. Usa AR.js con marcadores NFT, por lo que la imagen se convierte previamente en tres archivos: `marcador.fset`, `marcador.fset3` y `marcador.iset`.

Incluye:

- `index.html`: pagina principal e interfaz para generar QR.
- `creator.html`: guia para preparar el marcador y el modelo.
- `viewer.html`: visor que abre la camara y muestra el modelo en RA.
- `css/style.css`: diseno responsive.
- `js/creator.js`: previsualizacion y QR.
- `js/viewer.js`: configuracion editable del modelo y marcador.

## Requisitos

- Una cuenta gratuita de GitHub.
- Un repositorio publico o privado con GitHub Pages habilitado.
- Un modelo 3D en formato `.glb`.
- Una imagen marcador en formato `.jpg`.
- Un celular con navegador moderno y permiso de camara.
- Conexion a internet para cargar A-Frame, AR.js y qrcode.js desde CDN.

GitHub Pages es gratuito, pero no guarda archivos subidos desde la pagina. Para cambiar el modelo o marcador, debes reemplazar los archivos dentro del repositorio.

## Como descargar un modelo GLB desde Sketchfab

1. Entra a [Sketchfab](https://sketchfab.com/).
2. Busca un modelo con licencia descargable.
3. Revisa la licencia y respeta las condiciones de atribucion.
4. Descarga el modelo en formato glTF/GLB.
5. Si recibes una carpeta con varios archivos, usa el archivo `.glb` cuando este disponible.
6. Renombra el archivo como `modelo.glb`.
7. Colocalo en `assets/models/modelo.glb`.

Consejo: usa modelos ligeros. Para celulares, intenta mantener el archivo por debajo de 20 MB.

## Como elegir una buena imagen marcador

Una buena imagen marcador debe tener:

- Muchos detalles visuales.
- Alto contraste.
- Formas y texturas variadas.
- Pocas areas lisas o repetidas.
- Buena nitidez.

Evita imagenes muy oscuras, borrosas, con patrones repetitivos o con grandes espacios vacios. Una fotografia o ilustracion con varios detalles suele funcionar mejor que un icono simple.

## Como convertir la imagen en marcador NFT

1. Abre [NFT Marker Creator](https://carnaux.github.io/NFT-Marker-Creator/).
2. Sube la imagen marcador.
3. Espera a que la herramienta procese la imagen.
4. Descarga los archivos generados.
5. Renombralos exactamente asi:
   - `marcador.fset`
   - `marcador.fset3`
   - `marcador.iset`
6. Colocalos en `assets/markers/`.

En el visor se usa la ruta `assets/markers/marcador` sin extension. AR.js agrega las extensiones necesarias automaticamente.

## Como reemplazar el modelo

1. Toma tu archivo GLB.
2. Renombralo como `modelo.glb`.
3. Reemplaza el archivo ubicado en `assets/models/modelo.glb`.
4. Abre `js/viewer.js` si necesitas ajustar la escala, posicion o rotacion:

```js
const MODEL_SCALE = "5 5 5";
const MODEL_POSITION = "0 0 0";
const MODEL_ROTATION = "0 0 0";
```

## Como reemplazar el marcador

1. Reemplaza la imagen visible en `assets/images/marcador.jpg`.
2. Convierte esa misma imagen con NFT Marker Creator.
3. Reemplaza estos archivos:
   - `assets/markers/marcador.fset`
   - `assets/markers/marcador.fset3`
   - `assets/markers/marcador.iset`
4. No cambies la ruta base en `viewer.html` ni en `js/viewer.js`, salvo que tambien cambies los nombres de archivo.

## Como publicar en GitHub Pages

1. Crear repositorio en GitHub.
2. Subir todos los archivos.
3. Ir a Settings.
4. Entrar en Pages.
5. En Source seleccionar Deploy from a branch.
6. Elegir main y /root.
7. Guardar.
8. Esperar el enlace publico.
9. Abrir:

```text
https://usuario.github.io/nombre-repositorio/
```

10. Generar QR con la URL de `viewer.html`.

Ejemplo:

```text
https://usuario.github.io/nombre-repositorio/viewer.html
```

## Como generar el QR

1. Publica el sitio en GitHub Pages.
2. Abre `index.html` o `creator.html`.
3. Escribe la URL publica completa de `viewer.html`.
4. Pulsa `Generar QR`.
5. Comparte el QR con estudiantes o imprimelo junto con la imagen marcador.

## Como probar desde celular

1. Abre el enlace de GitHub Pages desde el celular.
2. Entra a `Ver realidad aumentada`.
3. Permite el uso de la camara.
4. Apunta hacia la imagen marcador.
5. Si no aparece el modelo, mejora la iluminacion, acerca la camara o revisa que el marcador este completo y enfocado.

## Problemas frecuentes

### No aparece el modelo

- Revisa que `assets/models/modelo.glb` sea un GLB real.
- Revisa que los tres archivos NFT esten en `assets/markers/`.
- Comprueba que el modelo no sea demasiado grande.
- Ajusta `MODEL_SCALE`, `MODEL_POSITION` y `MODEL_ROTATION` en `js/viewer.js`.

### La camara no abre

- Usa HTTPS. GitHub Pages ya publica con HTTPS.
- Revisa los permisos del navegador.
- Prueba en Chrome, Edge o Safari actualizado.

### El marcador no se detecta

- Usa una imagen con mas detalles y contraste.
- Evita reflejos, sombras fuertes o baja iluminacion.
- Imprime el marcador con buena calidad.
- Apunta al marcador completo, no solo a una esquina.

### El QR no se genera

- qrcode.js se carga desde CDN, por lo que necesitas conexion a internet.
- Verifica que la URL escrita sea valida.

### Cambie archivos desde la pagina, pero no quedaron guardados

La pagina solo permite previsualizar archivos. GitHub Pages es gratuito, pero no guarda archivos subidos desde la pagina. Para cambiar el modelo o marcador, debes reemplazar los archivos dentro del repositorio.
