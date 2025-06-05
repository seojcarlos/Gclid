# Captura y Persistencia de Parámetros de Tracking (GCLID, WBRAID, etc.)

Este conjunto de scripts permite capturar y almacenar parámetros de tracking de campañas publicitarias (Google Ads, Meta, etc.) en diferentes escenarios, incluso cuando los navegadores o bloqueadores dificultan el tracking tradicional.

---

## Objetivo principal

- ✅ Capturar los identificadores de conversión en el momento que llegan (`gclid`, `wbraid`, `gbraid`, etc.).
- ✅ Guardarlos de forma persistente (`localStorage`, `cookie` o `sesión`).
- ✅ Asignarlos automáticamente a los formularios de la web para su envío posterior.
- ✅ Robustez frente a bloqueadores (como Brave, AdBlock, etc.).

---

## Estrategias implementadas

### 🔥 Estrategia 1: Captura inmediata desde URL

```html
<script data-cookieconsent="ignore"> ... </script>
