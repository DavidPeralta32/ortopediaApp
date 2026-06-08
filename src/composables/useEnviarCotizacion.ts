import type { Producto } from '@/views/Productos/types/Producto'
import emailjs from '@emailjs/browser'

// 🎛️ Definimos la interfaz con campos opcionales para que sirva para cualquier formulario
interface EnviarCotizacionInput {
    email: string;              // El correo del cliente (Obligatorio siempre)
    nombre?: string;            // Opcional (Para tu nuevo componente)
    mensaje?: string;           // Opcional (Para comentarios de texto largo)
    productos?: Producto[];     // Opcional (Para el carrito)
}

export async function useEnviarCotizacion() {
    
    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    const MI_CORREO_NEGOCIO = 'ventasinquimed@gmail.com';
    const MI_TELEFONO_WHATSAPP = '522293686761';

    /**
     * BUENA PRÁCTICA: Genera una URL de WhatsApp estructurada con los datos de la cotización
     */
    const generarEnlaceWhatsApp = (datos: EnviarCotizacionInput): string => {
        let texto = `*¡Nueva solicitud de cotización - Inquimed!*\n\n`;
        texto += `👤 *Nombre:* ${datos.nombre || 'No especificado'}\n`;
        texto += `✉️ *Email:* ${datos.email}\n`;
        
        if (datos.mensaje && datos.mensaje.trim() !== '') {
            texto += `💬 *Mensaje:* ${datos.mensaje}\n`;
        }

        if (datos.productos && datos.productos.length > 0) {
            texto += `\n📦 *Productos solicitados:*\n`;
            datos.productos.forEach(item => {
                texto += `- ${item.name} (Cant: ${item.quantity})\n`;
            });
        }

        // Retorna la URL formateada correctamente
        return `https://wa.me/${MI_TELEFONO_WHATSAPP}?text=${encodeURIComponent(texto)}`;
    };

    /**
     * Construye la tabla HTML solo si hay productos seleccionados
     */
    const generarTablaProductosHTML = (productos?: Producto[]): string => {
        if (!productos || productos.length === 0) return '';

        let filas = '';
        productos.forEach(item => {
            filas += `
                <tr style="border-bottom: 1px solid #eeeeee;">
                    <td style="padding: 12px 8px; width: 80px; text-align: center;">
                        <img src="${item.image}" alt="${item.name}" width="60" height="60" style="object-fit: contain; border-radius: 4px; border: 1px solid #f0f0f0;" />
                    </td>
                    <td style="padding: 12px 8px; font-size: 14px; color: #333333; vertical-align: middle;">
                        <div style="font-weight: 600; color: #111111;">${item.name}</div>
                    </td>
                    <td style="padding: 12px 8px; font-size: 15px; color: #111111; text-align: center; font-weight: bold; width: 90px; vertical-align: middle;">
                        <span style="background-color: #e0f2f1; color: #1C90A1; padding: 4px 10px; border-radius: 12px; font-size: 13px;">
                            ${item.quantity} pza${item.quantity && item.quantity > 1 ? 's' : ''}
                        </span>
                    </td>
                </tr>
            `;
        });

        return `
            <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                <thead>
                    <tr style="background-color: #f8f9fa; border-bottom: 2px solid #e0e0e0;">
                        <th style="padding: 10px 8px; font-size: 12px; color: #666666; text-transform: uppercase;">Imagen</th>
                        <th style="padding: 10px 8px; text-align: left; font-size: 12px; color: #666666; text-transform: uppercase;">Producto</th>
                        <th style="padding: 10px 8px; font-size: 12px; color: #666666; text-transform: uppercase;">Cantidad</th>
                    </tr>
                </thead>
                <tbody>
                    ${filas}
                </tbody>
            </table>
        `;
    };

    /**
     * Fallback manual usando mailto nativo
     */
    const ejecutarFallbackManual = (datos: EnviarCotizacionInput) => {
        const asunto = encodeURIComponent(`Contacto Inquimed - ${datos.email}`);
        
        let cuerpo = `Datos de contacto:\nEmail: ${datos.email}\n`;
        if (datos.nombre) cuerpo += `Nombre: ${datos.nombre}\n`;
        if (datos.mensaje) cuerpo += `\nMensaje:\n${datos.mensaje}\n`;
        
        if (datos.productos && datos.productos.length > 0) {
            cuerpo += `\nProductos solicitados:\n` + datos.productos.map(p => `- ${p.name} (Cant: ${p.quantity})`).join('\n');
        }

        window.location.href = `mailto:${MI_CORREO_NEGOCIO}?subject=${asunto}&body=${encodeURIComponent(cuerpo)}`;
    };

    const ejecutar = async (datos: EnviarCotizacionInput): Promise<{ enviadoAutomatico: boolean }> => {
    try {
        // 📝 Construimos el HTML del mensaje solo si el usuario escribió algo
        let mensajeHTML = '';
        if (datos.mensaje && datos.mensaje.trim() !== '') {
            mensajeHTML = `
                <h3 style="color: #1C90A1; font-size: 15px; margin-bottom: 6px;">Mensaje / Comentarios:</h3>
                <p style="background-color: #f5f5f5; padding: 12px; border-radius: 4px; font-style: italic; margin-top: 0; font-size: 14px; color: #444444;">
                  "${datos.mensaje}"
                </p>
            `;
        }

        // Mapeamos las variables exactas hacia EmailJS
        const templateParams = {
            reply_to: datos.email,
            cliente_nombre: datos.nombre || 'No especificado',
            cliente_mensaje_html: mensajeHTML, // Inyecta el bloque HTML formateado o un string vacío ""
            lista_productos_html: generarTablaProductosHTML(datos.productos), 
        };

        const resultado = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);

        if (resultado.status === 200) return { enviadoAutomatico: true };
        throw new Error('Error al conectar con EmailJS');

    } catch (error) {
        console.warn('[UseCase] Error detectado, ejecutando Fallback manual...', error);
        ejecutarFallbackManual(datos);
        return { enviadoAutomatico: false };
    }
};

    return { ejecutar,generarEnlaceWhatsApp };
}