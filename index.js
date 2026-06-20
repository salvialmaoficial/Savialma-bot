const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

// ============================================================
// CONFIGURACIÓN PRINCIPAL
// ============================================================
const VERIFY_TOKEN = "savialma2024";
const WHATSAPP_TOKEN = "EAAONx37Ww6ABRzf5PqCdWjDZAkXtAnuexgrIZBYoQ4iOOFDFcIm0BvtdQsZC0jc2LznZAhzzcZCxxlJWhKKS9oQHWhk0HnYb38J4vIAFAU949RW0w1ilsiq41XqYZC7t2bZCjUo8tZAy2mx7w3SZAl8hLlaYb0OfTppH9sP0LaW8swWacEZBWU0IuKuKAIHBL6qTiTzAZDZD";
const PHONE_NUMBER_ID = "1228361870353010";
const MI_NUMERO = "573209116688"; // Tu número para notificaciones

// ============================================================
// IMÁGENES DE TESTIMONIOS
// ============================================================
const testimonios = {
  mantequillas: [
    "https://res.cloudinary.com/dp85u74fp/image/upload/v1781538118/WhatsApp_Image_2026-06-15_at_10.41.17_AM_sprnff.jpg",
    "https://res.cloudinary.com/dp85u74fp/image/upload/v1781538118/WhatsApp_Image_2026-06-15_at_10.41.17_AM_3_yiwlpv.jpg",
    "https://res.cloudinary.com/dp85u74fp/image/upload/v1781538118/WhatsApp_Image_2026-06-15_at_10.41.17_AM_1_fl3f8a.jpg",
    "https://res.cloudinary.com/dp85u74fp/image/upload/v1781538118/WhatsApp_Image_2026-06-15_at_10.41.17_AM_2_qf8ydt.jpg"
  ],
  exfoliantes: [
    "https://res.cloudinary.com/dp85u74fp/image/upload/v1781611426/WhatsApp_Image_2026-06-16_at_7.01.52_AM_ytpwov.jpg",
    "https://res.cloudinary.com/dp85u74fp/image/upload/v1781611457/WhatsApp_Image_2026-06-16_at_7.01.52_AM_1_tlmte2.jpg",
    "https://res.cloudinary.com/dp85u74fp/image/upload/v1781611483/WhatsApp_Image_2026-06-16_at_7.01.52_AM_2_ii359w.jpg",
    "https://res.cloudinary.com/dp85u74fp/image/upload/v1781611503/WhatsApp_Image_2026-06-16_at_7.01.52_AM_3_qbkn5w.jpg"
  ],
  velas: [
    "https://res.cloudinary.com/dp85u74fp/image/upload/v1781611986/WhatsApp_Image_2026-06-16_at_7.10.55_AM_3_dzpuuy.jpg",
    "https://res.cloudinary.com/dp85u74fp/image/upload/v1781612019/WhatsApp_Image_2026-06-16_at_7.10.55_AM_1_tewrao.jpg",
    "https://res.cloudinary.com/dp85u74fp/image/upload/v1781612054/WhatsApp_Image_2026-06-16_at_7.10.55_AM_2_qdwa7v.jpg",
    "https://res.cloudinary.com/dp85u74fp/image/upload/v1781612082/WhatsApp_Image_2026-06-16_at_7.10.55_AM_rtq1le.jpg"
  ]
};

// ============================================================
// LINKS DE HOTMART (NO MODIFICAR)
// ============================================================
const links = {
  mantequillas: "https://go.hotmart.com/D105493536V",
  exfoliantes: "https://go.hotmart.com/K105493562L",
  velas: "https://go.hotmart.com/F106211488C"
};

// ============================================================
// SECUENCIAS DE MENSAJES
// ============================================================
const mensajes = {
  mantequillas: {
    1: (nombre) => `Mucho gusto ${nombre}, buenas tardes, quiero entenderte bien, cuéntame:\n\n¿Qué es lo que quieres lograr con esto exactamente?`,
    2: (nombre) => `Qué bueno que me lo dices porque esto es exactamente para eso 👇\n\nEl Arte de las Mantequillas Corporales es un método que te enseña a hacer y vender mantequillas desde casa, sin experiencia, sin invertir mucho y a tu propio ritmo. ✨\n\nHay mujeres que me escribieron igual que tú con dudas, sin saber por dónde empezar y hoy tienen pedidos todas las semanas sin salir de su casa.\n\nYa son 427 las que dieron el paso. Acá te mando lo que dice una de ellas 👆`,
    3: (nombre) => `${nombre}, esto es todo lo que incluye 👇\n\n📚 32 módulos en video donde aprendes las 7 fórmulas completas, cómo costear cada producto, cómo armar tu catálogo, diseñar tu logo y presentar tu marca con empaque profesional.\n\nY además recibes 7 bonos sin costo adicional 🎁\n\n✅ Comunidad exclusiva en WhatsApp\n✅ Recetas de Bombas de baño\n✅ Recetas de Shimmer corporal\n✅ Recetas de Sales de baño\n✅ Recetas de Jabones artesanales\n✅ Listado de proveedores en 19 países\n✅ Certificado al finalizar\n\nÚnico pago, acceso de por vida, sin mensualidades 🔒\n\nEl método está en $180.000 → hoy solo $85.000 COP\nMás del 50% de descuento, y este precio no va a durar 🔥\n\nSi en 7 días sientes que no era lo que esperabas, Hotmart te devuelve el 100% del dinero. Sin preguntas. Sin rollos.\n\n¿Lo pagas con tarjeta o con transferencia? 👇\n${links.mantequillas}`
  },
  exfoliantes: {
    1: (nombre) => `Mucho gusto ${nombre}, buenas tardes, quiero entenderte bien, cuéntame:\n\n¿Qué es lo que quieres lograr con esto exactamente?`,
    2: (nombre) => `Qué bueno que me lo dices porque esto es exactamente para eso 👇\n\nEl Arte de los Exfoliantes Corporales es un método que te enseña a hacer y vender exfoliantes desde casa, sin experiencia, sin invertir mucho y a tu propio ritmo. ✨\n\nHay mujeres que empezaron sin saber nada de cosmética, sin herramientas costosas, sin laboratorio, sin nada y hoy tienen pedidos todas las semanas desde su casa.\n\nAcá te mando lo que dice una de ellas 👆`,
    3: (nombre) => `${nombre}, esto es todo lo que incluye 👇\n\n📚 Desde cero hasta tu primer producto listo para vender — E-book completo descargable + más de 10 clases en video: las primeras 5 te enseñan las 7 fórmulas de exfoliantes corporales, y las siguientes te llevan por costos, peso de insumos, cómo escalar para grandes cantidades y una clase especial para diseñar el logo de tu emprendimiento.\n\nY además recibes estos bonos sin costo adicional 🎁\n\n✅ Comunidad exclusiva en WhatsApp para dudas e inquietudes\n✅ E-book de Mantequillas Corporales\n✅ E-book de Jelly Spa\n✅ Listado de proveedores verificados por país\n✅ Certificado de participación con tu nombre\n\nÚnico pago, acceso de por vida, desde el celular o el computador 🔒\n\nEl método está en $148.000 → hoy solo $74.000 COP\nMás del 50% de descuento, y este precio no va a durar 🔥\n\nSi en 7 días sientes que no era lo que esperabas, Hotmart te devuelve el 100% del dinero. Sin preguntas. Sin rollos.\n\n¿Lo pagas con tarjeta o con transferencia? 👇\n${links.exfoliantes}`
  },
  velas: {
    1: (nombre) => `Mucho gusto ${nombre}, buenas tardes, quiero entenderte bien, cuéntame:\n\n¿Qué es lo que quieres lograr con esto exactamente?`,
    2: (nombre) => `Qué bueno que me lo dices porque esto es exactamente para eso 👇\n\nEl Arte Creativo es un método que te enseña a hacer y vender velas artesanales y jabones desde casa, sin experiencia, sin invertir mucho y a tu propio ritmo. ✨\n\nHay mujeres que empezaron sin saber ni cómo derretir una cera — y hoy tienen pedidos de velas personalizadas para bodas, fechas especiales y decoración. Todo desde la casa, todo con sus manos.\n\nAcá te mando lo que dice una de ellas 👆`,
    3: (nombre) => `📚 Desde tu primera vela y tu primer jabón hasta técnicas avanzadas que se venden solas — más de 120 clases en video con más de 21 horas de contenido: velas básicas, intermedias y avanzadas en más de 30 estilos diferentes (suculentas, capuchino, iceberg, glitter, navideñas, ponquesito y muchas más), jabones hidratantes, exfoliantes, medicinales y decorativos en distintas técnicas, más módulos completos de costos, empaque, marca y redes sociales para vender.\n\nY eso más 18 bonos incluidos sin costo adicional 🎁\n\n✅ Bombas de baño\n✅ Shampoo en barra\n✅ Mantequilla corporal\n✅ Bálsamo labial\n✅ Varitas difusoras\n✅ Velas navideñas y fechas especiales\n✅ Calendario de Adviento\n✅ Decoración de envases\n✅ Módulo Nuevas Empresarias\n✅ Velas de manifestación\n✅ Lista de proveedores verificados\n✅ Comunidad VIP de apoyo\n✅ Certificado internacional\n✅ 100 recetas de jabones artesanales\n✅ Curso de saponificación en frío\n✅ Desmaquillante natural\n✅ Actualizaciones permanentes\n\nÚnico pago, acceso de por vida, desde el celular o el computador 🔒\n\nEl método está en $258.000 → hoy solo $129.000 COP\nMás del 50% de descuento, y este precio no va a durar 🔥\n\nSi en 7 días sientes que no era lo que esperabas, Hotmart te devuelve el 100% del dinero. Sin preguntas. Sin rollos.\n\n¿Lo pagas con tarjeta o con transferencia? 👇\n${links.velas}`
  }
};

// ============================================================
// ESTADO DE USUARIOS (memoria del bot)
// ============================================================
const usuarios = {};

// ============================================================
// FUNCIONES DE DETECCIÓN
// ============================================================

function detectarMetodo(texto) {
  const t = texto.toLowerCase();
  if (t.includes('mantequilla') || t.includes('body butter') || t.includes('mantequillas')) return 'mantequillas';
  if (t.includes('exfoliante') || t.includes('exfoliantes') || t.includes('scrub')) return 'exfoliantes';
  if (t.includes('vela') || t.includes('velas') || t.includes('jabon') || t.includes('jabón') || t.includes('jabones') || t.includes('artesanal')) return 'velas';
  return null;
}

function detectarNombre(texto) {
  const t = texto.toLowerCase();
  const patrones = [
    /soy\s+([a-záéíóúñ]+)/i,
    /me llamo\s+([a-záéíóúñ]+)/i,
    /mi nombre es\s+([a-záéíóúñ]+)/i,
    /hola,?\s+soy\s+([a-záéíóúñ]+)/i,
    /hola,?\s+me llamo\s+([a-záéíóúñ]+)/i,
  ];
  for (const patron of patrones) {
    const match = texto.match(patron);
    if (match) return match[1].charAt(0).toUpperCase() + match[1].slice(1).toLowerCase();
  }
  return null;
}

function esMensajeCorto(texto) {
  const respuestasCortas = ['si', 'sí', 'ok', 'okay', 'okey', 'oky', 'okei', 'dale', 'gracias', 'listo', 'claro', 'perfecto', 'bien', 'buenas', 'hola', 'bueno', 'va', 'vamos', 'genial', 'excelente', 'entendido', 'de acuerdo'];
  const t = texto.toLowerCase().trim();
  if (t.split(' ').length <= 4) return true;
  return respuestasCortas.some(r => t === r || t.startsWith(r + ' ') || t.endsWith(' ' + r));
}

function esInteresEnIngreso(texto) {
  const t = texto.toLowerCase();
  const palabrasClave = ['ingreso', 'dinero', 'ganar', 'negocio', 'vender', 'emprender', 'ayuda economica', 'ayuda económica', 'trabajo', 'plata', 'ingresos', 'extra', 'casa', 'independencia', 'independiente', 'propio negocio', 'desde casa'];
  return palabrasClave.some(p => t.includes(p));
}

function obtenerPais(numero) {
  if (numero.startsWith('57')) return 'Colombia 🇨🇴';
  if (numero.startsWith('58')) return 'Venezuela 🇻🇪';
  if (numero.startsWith('52')) return 'México 🇲🇽';
  if (numero.startsWith('51')) return 'Perú 🇵🇪';
  if (numero.startsWith('56')) return 'Chile 🇨🇱';
  if (numero.startsWith('54')) return 'Argentina 🇦🇷';
  if (numero.startsWith('593')) return 'Ecuador 🇪🇨';
  if (numero.startsWith('595')) return 'Paraguay 🇵🇾';
  if (numero.startsWith('598')) return 'Uruguay 🇺🇾';
  if (numero.startsWith('591')) return 'Bolivia 🇧🇴';
  if (numero.startsWith('1')) return 'USA/Puerto Rico 🇺🇸';
  if (numero.startsWith('34')) return 'España 🇪🇸';
  return 'País desconocido 🌍';
}

// ============================================================
// FUNCIONES DE ENVÍO
// ============================================================

async function enviarTexto(para, texto) {
  await axios.post(`https://graph.facebook.com/v18.0/${PHONE_NUMBER_ID}/messages`, {
    messaging_product: 'whatsapp',
    to: para,
    text: { body: texto }
  }, {
    headers: { Authorization: `Bearer ${WHATSAPP_TOKEN}` }
  });
}

async function enviarImagen(para, url) {
  await axios.post(`https://graph.facebook.com/v18.0/${PHONE_NUMBER_ID}/messages`, {
    messaging_product: 'whatsapp',
    to: para,
    type: 'image',
    image: { link: url }
  }, {
    headers: { Authorization: `Bearer ${WHATSAPP_TOKEN}` }
  });
}

async function notificarme(mensaje) {
  await enviarTexto(MI_NUMERO, mensaje);
}

// ============================================================
// WEBHOOK VERIFICACIÓN
// ============================================================
app.get('/webhook', (req, res) => {
  if (req.query['hub.verify_token'] === VERIFY_TOKEN) {
    res.send(req.query['hub.challenge']);
  } else {
    res.sendStatus(403);
  }
});

// ============================================================
// WEBHOOK PRINCIPAL
// ============================================================
app.post('/webhook', async (req, res) => {
  res.sendStatus(200);

  try {
    const body = req.body;
    if (body.object !== 'whatsapp_business_account') return;

    const message = body.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
    if (!message || message.type !== 'text') return;

    const from = message.from;
    const texto = message.text?.body?.trim() || '';
    const pais = obtenerPais(from);

    // Inicializar usuario si no existe
    if (!usuarios[from]) {
      usuarios[from] = {
        paso: 0,
        nombre: null,
        metodo: null,
        esperandoNombre: false,
        esperandoMetodo: false,
        bloqueado: false
      };
    }

    const u = usuarios[from];
    if (u.bloqueado) return; // Ya está en manos tuyas

    // --------------------------------------------------------
    // ESPERANDO NOMBRE (se revisa ANTES que paso 0)
    // --------------------------------------------------------
    if (u.esperandoNombre) {
      const palabras = texto.trim().split(/\s+/);
      const nombreDetectado = detectarNombre(texto) || palabras[palabras.length - 1];
      u.nombre = nombreDetectado.charAt(0).toUpperCase() + nombreDetectado.slice(1).toLowerCase();
      u.esperandoNombre = false;

      if (!u.metodo) {
        u.esperandoMetodo = true;
        await enviarTexto(from, `Mucho gusto ${u.nombre} 😊 ¿En cuál de nuestros métodos estás interesada?\n\n• Mantequillas corporales\n• Exfoliantes corporales\n• Velas y jabones artesanales`);
        return;
      }

      u.paso = 1;
      await enviarTexto(from, mensajes[u.metodo][1](u.nombre));
      return;
    }

    // --------------------------------------------------------
    // ESPERANDO MÉTODO (se revisa ANTES que paso 0)
    // --------------------------------------------------------
    if (u.esperandoMetodo) {
      const metodo = detectarMetodo(texto);
      if (metodo) {
        u.metodo = metodo;
        u.esperandoMetodo = false;
        u.paso = 1;
        await enviarTexto(from, mensajes[u.metodo][1](u.nombre));
      } else {
        await enviarTexto(from, `¿Cuál te interesa más?\n\n• Mantequillas corporales\n• Exfoliantes corporales\n• Velas y jabones artesanales`);
      }
      return;
    }

    // --------------------------------------------------------
    // PASO 0: Primer mensaje — detectar nombre y método
    // --------------------------------------------------------
    if (u.paso === 0) {
      const nombre = detectarNombre(texto);
      const metodo = detectarMetodo(texto);

      if (nombre) u.nombre = nombre;
      if (metodo) u.metodo = metodo;

      // Si no tiene nombre, preguntar
      if (!u.nombre) {
        u.esperandoNombre = true;
        await enviarTexto(from, `Hola, ¿con quién tengo el gusto? 😊`);
        return;
      }

      // Si no tiene método, preguntar
      if (!u.metodo) {
        u.esperandoMetodo = true;
        await enviarTexto(from, `Hola ${u.nombre} 😊 ¿En cuál de nuestros métodos estás interesada?\n\n• Mantequillas corporales\n• Exfoliantes corporales\n• Velas y jabones artesanales`);
        return;
      }

      // Tiene todo — avanzar al mensaje 1
      u.paso = 1;
      await enviarTexto(from, mensajes[u.metodo][1](u.nombre));
      return;
    }

    // --------------------------------------------------------
    // PASO 1: Respuesta a la pregunta calificadora
    // --------------------------------------------------------
    if (u.paso === 1) {
      if (esInteresEnIngreso(texto)) {
        // Interés en ingreso — avanzar normal
        u.paso = 2;
        await enviarTexto(from, mensajes[u.metodo][2](u.nombre));
        // Enviar testimonios uno por uno
        for (const img of testimonios[u.metodo]) {
          await enviarImagen(from, img);
        }
      } else {
        // Mensaje diferente — notificarme y no responder
        u.bloqueado = true;
        await notificarme(`⚠️ ATENCIÓN ESPECIAL\nNombre: ${u.nombre}\nNúmero: +${from}\nPaís: ${pais}\nMétodo: ${u.metodo}\nDijo: "${texto}"\n\nEsta prospeta tiene un perfil diferente. Toma el control.`);
      }
      return;
    }

    // --------------------------------------------------------
    // PASO 2: Respuesta después de testimonios → micro-pregunta
    // --------------------------------------------------------
    if (u.paso === 2) {
      if (esMensajeCorto(texto)) {
        u.paso = 3;
        await enviarTexto(from, `¿Qué es lo que más te detiene hoy para empezar algo así?`);
      } else {
        // Mensaje largo — notificarme y no responder
        u.bloqueado = true;
        await notificarme(`⚠️ PROSPETA PREGUNTANDO\nNombre: ${u.nombre}\nNúmero: +${from}\nPaís: ${pais}\nMétodo: ${u.metodo}\nPreguntó: "${texto}"`);
      }
      return;
    }

    // --------------------------------------------------------
    // PASO 3: Respuesta a la micro-pregunta → notificarme con
    // todo el contexto para que tú cierres manualmente
    // --------------------------------------------------------
    if (u.paso === 3) {
      u.bloqueado = true;
      await notificarme(`🔥 LISTA PARA CERRAR\nNombre: ${u.nombre}\nNúmero: +${from}\nPaís: ${pais}\nMétodo: ${u.metodo}\n\nLe detiene: "${texto}"\n\nEntra y cierra manualmente con el link correcto 💰`);
      return;
    }

    // --------------------------------------------------------
    // CAMBIO DE MÉTODO: si en cualquier punto menciona otro método
    // diferente al actual, reiniciar la secuencia con ese método
    // --------------------------------------------------------
    if (u.paso >= 1) {
      const metodoMencionado = detectarMetodo(texto);
      if (metodoMencionado && metodoMencionado !== u.metodo) {
        u.metodo = metodoMencionado;
        u.paso = 1;
        u.bloqueado = false;
        await enviarTexto(from, mensajes[u.metodo][1](u.nombre));
        return;
      }
    }

    // --------------------------------------------------------
    // PASO 4 en adelante: cualquier mensaje — notificarme
    // --------------------------------------------------------
    if (u.paso >= 4) {
      if (!esMensajeCorto(texto)) {
        u.bloqueado = true;
        await notificarme(`⚠️ SEGUIMIENTO NECESARIO\nNombre: ${u.nombre}\nNúmero: +${from}\nPaís: ${pais}\nMétodo: ${u.metodo}\nDijo: "${texto}"`);
      }
    }

  } catch (error) {
    console.error('Error en webhook:', error.message);
    if (error.response) {
      console.error('Detalle del error:', JSON.stringify(error.response.data));
    }
  }
});

// ============================================================
// INICIAR SERVIDOR
// ============================================================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Bot Savialma corriendo en puerto ${PORT}`));
