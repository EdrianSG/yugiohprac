# YU-GI-OH AR | Mago Oscuro (versión 0.2)

Esta carpeta ya contiene **tu archivo `targets.mind`**, compilado para la carta, y **tu modelo `moustruo.glb`**, guardado en `assets/mago_oscuro.glb` con la escala ajustada para AR. No tienes que volver a compilar ni descargar el modelo.

## Lo que hace

- Abre la webcam o la cámara trasera de tu celular mediante el navegador.
- Reconoce la imagen de carta que tiene tu `targets.mind` (objetivo nº 0).
- Muestra el Mago Oscuro 3D sobre la carta, con su animación incorporada, y lo sigue al moverla.
- Muestra **ATK 2500** y **DEF 2100** al encontrar la carta.
- Botón **Ataque mágico**: movimiento simple + destello; **no** calcula daño ni puntos de vida todavía.

## Laptop (Linux, Windows, macOS)

1. Descomprime el ZIP. Entra en la carpeta `YuGiOh_AR_Mago_Oscuro_v0.2`.
2. Abre una terminal dentro de esa carpeta.
3. Linux/macOS: `python3 -m http.server 8000`. Windows: `py -m http.server 8000`.
4. Abre **http://localhost:8000/** en Chrome o Edge (con webcam).
5. Acepta el permiso de cámara. Coloca la carta física del Mago Oscuro frente a la cámara.
6. Mantén toda la carta visible, sin reflejos, con suficiente iluminación y a unos 20–40 cm para empezar; ajusta la distancia según la webcam.
7. Cuando se detecte, aparecerá el modelo. Pulsa **Ataque mágico** para ver la animación.

**Nota importante:** `targets.mind` debe haberse compilado a partir del mismo arte/edición de carta que muestras. Si la carta física es otra ilustración, puede no reconocerla. No has subido la imagen original con la que generaste `.mind`, por lo que esa coincidencia se debe comprobar con tu carta real.

## Android (HTTPS)

1. En GitHub, crea un repositorio público, por ejemplo `yugioh-ar`.
2. Sube los archivos **dentro** de esta carpeta a la raíz del repositorio: `index.html`, `targets.mind`, `css/`, `js/`, `assets/`, etc. No subas solamente el ZIP.
3. Ve a **Settings → Pages → Deploy from a branch → main → /(root)** y guarda.
4. Visita `https://TU_USUARIO.github.io/yugioh-ar/` con Chrome en Android y permite usar la cámara.
5. Enfoca la carta sobre una mesa, preferentemente con luz uniforme y sin brillos.

La cámara desde una IP HTTP como `http://192.168.1.10:8000/` no funcionará generalmente en el celular; usa HTTPS.

## Funcionamiento sin internet

A-Frame 1.6.0, MindAR 1.2.5 y la fuente del texto 3D están incluidos en el proyecto (`js/lib/` y `assets/fonts/`), así que **ya no se necesita conexión** una vez que el navegador accede a los archivos (por ejemplo, desde `http://localhost:8000/`). Solo hace falta un servidor local o HTTPS para poder usar la cámara; abrir el archivo con `file:///` no funciona.

## Si algo falla

- **No hay cámara:** verifica los permisos y abre por HTTPS o localhost; no uses `file:///`.
- **Cámara activa, carta no detectada:** comprueba que `targets.mind` corresponda a esa misma ilustración/edición, ajusta foco, distancia e iluminación; evita reflejos.
- **Carta detectada pero no aparece el personaje:** espera a que cargue el GLB, revisa `assets/mago_oscuro.glb` y la consola F12 (errores de red/modelo).
- **El monstruo no está orientado como prefieres:** cambia el atributo `rotation="90 0 0"` de `#upright-model` en `index.html`. Por ejemplo `90 0 180` lo girará en el plano. No hace falta modificar el GLB.
- **Celular muestra versión anterior:** comprueba el despliegue de GitHub Pages y recarga sin caché.
- **Ataque no reduce LP:** es deliberado: esta versión demuestra animación, aún no tiene motor de duelos.

## Estructura

```
YuGiOh_AR_Mago_Oscuro_v0.2/
├── index.html             # Web AR lista para probar
├── targets.mind           # Archivo subido por el grupo
├── assets/
│   ├── mago_oscuro.glb    # Modelo subido, escala normalizada
│   └── fonts/             # Fuente Roboto MSDF para el texto 3D (local)
├── css/
│   └── app.css            # Diseño adaptable PC/Android
├── js/
│   ├── app.js             # Reconocimiento, animación y botones
│   └── lib/               # A-Frame y MindAR (copias locales, sin CDN)
└── README.md
```

## Reconocimientos y licencia

El GLB que suministraste contiene esta información de autoría: **“Dark magician yugioh”**, autor **medothegeek** (https://sketchfab.com/medothegeek), fuente https://sketchfab.com/3d-models/dark-magician-yugioh-b05a2227f5f148899cc9ae2c562fb5c8, licencia **Creative Commons Attribution 4.0** (https://creativecommons.org/licenses/by/4.0/). Ajustamos únicamente la escala y origen de la escena para AR. Conservamos estos metadatos. Si publican o presentan la aplicación, incluyan esta atribución.

Proyecto académico no afiliado a Konami.
# yugiohprac
