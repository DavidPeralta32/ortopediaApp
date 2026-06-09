class u{constructor(t=0,r="Network Error"){this.status=t,this.text=r}}const T=()=>{if(!(typeof localStorage>"u"))return{get:e=>Promise.resolve(localStorage.getItem(e)),set:(e,t)=>Promise.resolve(localStorage.setItem(e,t)),remove:e=>Promise.resolve(localStorage.removeItem(e))}},s={origin:"https://api.emailjs.com",blockHeadless:!1,storageProvider:T()},b=e=>e?typeof e=="string"?{publicKey:e}:e.toString()==="[object Object]"?e:{}:{},E=(e,t="https://api.emailjs.com")=>{if(!e)return;const r=b(e);s.publicKey=r.publicKey,s.blockHeadless=r.blockHeadless,s.storageProvider=r.storageProvider,s.blockList=r.blockList,s.limitRate=r.limitRate,s.origin=r.origin||t},h=async(e,t,r={})=>{const l=await fetch(s.origin+e,{method:"POST",headers:r,body:t}),n=await l.text(),c=new u(l.status,n);if(l.ok)return c;throw c},g=(e,t,r)=>{if(!e||typeof e!="string")throw"The public key is required. Visit https://dashboard.emailjs.com/admin/account";if(!t||typeof t!="string")throw"The service ID is required. Visit https://dashboard.emailjs.com/admin";if(!r||typeof r!="string")throw"The template ID is required. Visit https://dashboard.emailjs.com/admin/templates"},$=e=>{if(e&&e.toString()!=="[object Object]")throw"The template params have to be the object. Visit https://www.emailjs.com/docs/sdk/send/"},y=e=>e.webdriver||!e.languages||e.languages.length===0,w=()=>new u(451,"Unavailable For Headless Browser"),L=(e,t)=>{if(!Array.isArray(e))throw"The BlockList list has to be an array";if(typeof t!="string")throw"The BlockList watchVariable has to be a string"},_=e=>!e.list?.length||!e.watchVariable,R=(e,t)=>e instanceof FormData?e.get(t):e[t],x=(e,t)=>{if(_(e))return!1;L(e.list,e.watchVariable);const r=R(t,e.watchVariable);return typeof r!="string"?!1:e.list.includes(r)},v=()=>new u(403,"Forbidden"),S=(e,t)=>{if(typeof e!="number"||e<0)throw"The LimitRate throttle has to be a positive number";if(t&&typeof t!="string")throw"The LimitRate ID has to be a non-empty string"},C=async(e,t,r)=>{const l=Number(await r.get(e)||0);return t-Date.now()+l},j=async(e,t,r)=>{if(!t.throttle||!r)return!1;S(t.throttle,t.id);const l=t.id||e;return await C(l,t.throttle,r)>0?!0:(await r.set(l,Date.now().toString()),!1)},k=()=>new u(429,"Too Many Requests"),H=async(e,t,r,l)=>{const n=b(l),c=n.publicKey||s.publicKey,m=n.blockHeadless||s.blockHeadless,p=n.storageProvider||s.storageProvider,f={...s.blockList,...n.blockList},o={...s.limitRate,...n.limitRate};return m&&y(navigator)?Promise.reject(w()):(g(c,e,t),$(r),r&&x(f,r)?Promise.reject(v()):await j(location.pathname,o,p)?Promise.reject(k()):h("/api/v1.0/email/send",JSON.stringify({lib_version:"4.4.1",user_id:c,service_id:e,template_id:t,template_params:r}),{"Content-type":"application/json"}))},q=e=>{if(!e||e.nodeName!=="FORM")throw"The 3rd parameter is expected to be the HTML form element or the style selector of the form"},I=e=>typeof e=="string"?document.querySelector(e):e,M=async(e,t,r,l)=>{const n=b(l),c=n.publicKey||s.publicKey,m=n.blockHeadless||s.blockHeadless,p=s.storageProvider||n.storageProvider,f={...s.blockList,...n.blockList},o={...s.limitRate,...n.limitRate};if(m&&y(navigator))return Promise.reject(w());const i=I(r);g(c,e,t),q(i);const a=new FormData(i);return x(f,a)?Promise.reject(v()):await j(location.pathname,o,p)?Promise.reject(k()):(a.append("lib_version","4.4.1"),a.append("service_id",e),a.append("template_id",t),a.append("user_id",c),h("/api/v1.0/email/send-form",a))},z={init:E,send:H,sendForm:M,EmailJSResponseStatus:u};async function A(){const e="service_a1h2e2m",t="template_isu9qpa",r="vmKAG2V3Wjt-6Gt7L",l="ventasinquimed@gmail.com",n="522293686761",c=o=>{let i=`*¡Nueva solicitud de cotización - Inquimed!*

`;return i+=`👤 *Nombre:* ${o.nombre||"No especificado"}
`,i+=`✉️ *Email:* ${o.email}
`,o.mensaje&&o.mensaje.trim()!==""&&(i+=`💬 *Mensaje:* ${o.mensaje}
`),o.productos&&o.productos.length>0&&(i+=`
📦 *Productos solicitados:*
`,o.productos.forEach(a=>{const d=a.tallaSeleccionada||"Universal";i+=`- ${a.name} [Talla: ${d}] (Cant: ${a.quantity})
`})),`https://wa.me/${n}?text=${encodeURIComponent(i)}`},m=o=>{if(!o||o.length===0)return"";let i="";return o.forEach(a=>{const d=a.tallaSeleccionada||"Universal";i+=`
                <tr style="border-bottom: 1px solid #eeeeee;">
                    <td style="padding: 12px 8px; width: 80px; text-align: center;">
                        <img src="${a.image}" alt="${a.name}" width="60" height="60" style="object-fit: contain; border-radius: 4px; border: 1px solid #f0f0f0;" />
                    </td>
                    <td style="padding: 12px 8px; font-size: 14px; color: #333333; vertical-align: middle;">
                        <div style="font-weight: 600; color: #111111;">${a.name}</div>
                        <!-- Etiqueta de Talla añadida debajo del nombre -->
                        <div style="font-size: 12px; color: #666666; margin-top: 4px;">Talla: <span style="font-weight: bold; color: #1C90A1;">${d}</span></div>
                    </td>
                    <td style="padding: 12px 8px; font-size: 15px; color: #111111; text-align: center; font-weight: bold; width: 90px; vertical-align: middle;">
                        <span style="background-color: #e0f2f1; color: #1C90A1; padding: 4px 10px; border-radius: 12px; font-size: 13px;">
                            ${a.quantity} pza${a.quantity&&a.quantity>1?"s":""}
                        </span>
                    </td>
                </tr>
            `}),`
            <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                <thead>
                    <tr style="background-color: #f8f9fa; border-bottom: 2px solid #e0e0e0;">
                        <th style="padding: 10px 8px; font-size: 12px; color: #666666; text-transform: uppercase;">Imagen</th>
                        <th style="padding: 10px 8px; text-align: left; font-size: 12px; color: #666666; text-transform: uppercase;">Producto</th>
                        <th style="padding: 10px 8px; font-size: 12px; color: #666666; text-transform: uppercase;">Cantidad</th>
                    </tr>
                </thead>
                <tbody>
                    ${i}
                </tbody>
            </table>
        `},p=o=>{const i=encodeURIComponent(`Contacto Inquimed - ${o.email}`);let a=`Datos de contacto:
Email: ${o.email}
`;o.nombre&&(a+=`Nombre: ${o.nombre}
`),o.mensaje&&(a+=`
Mensaje:
${o.mensaje}
`),o.productos&&o.productos.length>0&&(a+=`
Productos solicitados:
`+o.productos.map(d=>{const P=d.tallaSeleccionada||"Universal";return`- ${d.name} (Talla: ${P}) (Cant: ${d.quantity})`}).join(`
`)),window.location.href=`mailto:${l}?subject=${i}&body=${encodeURIComponent(a)}`};return{ejecutar:async o=>{try{let i="";o.mensaje&&o.mensaje.trim()!==""&&(i=`
                <h3 style="color: #1C90A1; font-size: 15px; margin-bottom: 6px;">Mensaje / Comentarios:</h3>
                <p style="background-color: #f5f5f5; padding: 12px; border-radius: 4px; font-style: italic; margin-top: 0; font-size: 14px; color: #444444;">
                  "${o.mensaje}"
                </p>
            `);const a={reply_to:o.email,cliente_nombre:o.nombre||"No especificado",cliente_mensaje_html:i,lista_productos_html:m(o.productos)};if((await z.send(e,t,a,r)).status===200)return{enviadoAutomatico:!0};throw new Error("Error al conectar con EmailJS")}catch(i){return console.warn("[UseCase] Error detectado, ejecutando Fallback manual...",i),p(o),{enviadoAutomatico:!1}}},generarEnlaceWhatsApp:c}}export{A as u};
