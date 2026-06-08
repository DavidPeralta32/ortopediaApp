class u{constructor(t=0,o="Network Error"){this.status=t,this.text=o}}const P=()=>{if(!(typeof localStorage>"u"))return{get:e=>Promise.resolve(localStorage.getItem(e)),set:(e,t)=>Promise.resolve(localStorage.setItem(e,t)),remove:e=>Promise.resolve(localStorage.removeItem(e))}},s={origin:"https://api.emailjs.com",blockHeadless:!1,storageProvider:P()},b=e=>e?typeof e=="string"?{publicKey:e}:e.toString()==="[object Object]"?e:{}:{},E=(e,t="https://api.emailjs.com")=>{if(!e)return;const o=b(e);s.publicKey=o.publicKey,s.blockHeadless=o.blockHeadless,s.storageProvider=o.storageProvider,s.blockList=o.blockList,s.limitRate=o.limitRate,s.origin=o.origin||t},h=async(e,t,o={})=>{const c=await fetch(s.origin+e,{method:"POST",headers:o,body:t}),n=await c.text(),l=new u(c.status,n);if(c.ok)return l;throw l},g=(e,t,o)=>{if(!e||typeof e!="string")throw"The public key is required. Visit https://dashboard.emailjs.com/admin/account";if(!t||typeof t!="string")throw"The service ID is required. Visit https://dashboard.emailjs.com/admin";if(!o||typeof o!="string")throw"The template ID is required. Visit https://dashboard.emailjs.com/admin/templates"},L=e=>{if(e&&e.toString()!=="[object Object]")throw"The template params have to be the object. Visit https://www.emailjs.com/docs/sdk/send/"},y=e=>e.webdriver||!e.languages||e.languages.length===0,w=()=>new u(451,"Unavailable For Headless Browser"),T=(e,t)=>{if(!Array.isArray(e))throw"The BlockList list has to be an array";if(typeof t!="string")throw"The BlockList watchVariable has to be a string"},_=e=>!e.list?.length||!e.watchVariable,$=(e,t)=>e instanceof FormData?e.get(t):e[t],x=(e,t)=>{if(_(e))return!1;T(e.list,e.watchVariable);const o=$(t,e.watchVariable);return typeof o!="string"?!1:e.list.includes(o)},j=()=>new u(403,"Forbidden"),R=(e,t)=>{if(typeof e!="number"||e<0)throw"The LimitRate throttle has to be a positive number";if(t&&typeof t!="string")throw"The LimitRate ID has to be a non-empty string"},C=async(e,t,o)=>{const c=Number(await o.get(e)||0);return t-Date.now()+c},v=async(e,t,o)=>{if(!t.throttle||!o)return!1;R(t.throttle,t.id);const c=t.id||e;return await C(c,t.throttle,o)>0?!0:(await o.set(c,Date.now().toString()),!1)},k=()=>new u(429,"Too Many Requests"),H=async(e,t,o,c)=>{const n=b(c),l=n.publicKey||s.publicKey,d=n.blockHeadless||s.blockHeadless,m=n.storageProvider||s.storageProvider,p={...s.blockList,...n.blockList},r={...s.limitRate,...n.limitRate};return d&&y(navigator)?Promise.reject(w()):(g(l,e,t),L(o),o&&x(p,o)?Promise.reject(j()):await v(location.pathname,r,m)?Promise.reject(k()):h("/api/v1.0/email/send",JSON.stringify({lib_version:"4.4.1",user_id:l,service_id:e,template_id:t,template_params:o}),{"Content-type":"application/json"}))},S=e=>{if(!e||e.nodeName!=="FORM")throw"The 3rd parameter is expected to be the HTML form element or the style selector of the form"},q=e=>typeof e=="string"?document.querySelector(e):e,I=async(e,t,o,c)=>{const n=b(c),l=n.publicKey||s.publicKey,d=n.blockHeadless||s.blockHeadless,m=s.storageProvider||n.storageProvider,p={...s.blockList,...n.blockList},r={...s.limitRate,...n.limitRate};if(d&&y(navigator))return Promise.reject(w());const i=q(o);g(l,e,t),S(i);const a=new FormData(i);return x(p,a)?Promise.reject(j()):await v(location.pathname,r,m)?Promise.reject(k()):(a.append("lib_version","4.4.1"),a.append("service_id",e),a.append("template_id",t),a.append("user_id",l),h("/api/v1.0/email/send-form",a))},M={init:E,send:H,sendForm:I,EmailJSResponseStatus:u};async function F(){const e="service_a1h2e2m",t="template_isu9qpa",o="vmKAG2V3Wjt-6Gt7L",c="ventasinquimed@gmail.com",n="522293686761",l=r=>{let i=`*¡Nueva solicitud de cotización - Inquimed!*

`;return i+=`👤 *Nombre:* ${r.nombre||"No especificado"}
`,i+=`✉️ *Email:* ${r.email}
`,r.mensaje&&r.mensaje.trim()!==""&&(i+=`💬 *Mensaje:* ${r.mensaje}
`),r.productos&&r.productos.length>0&&(i+=`
📦 *Productos solicitados:*
`,r.productos.forEach(a=>{i+=`- ${a.name} (Cant: ${a.quantity})
`})),`https://wa.me/${n}?text=${encodeURIComponent(i)}`},d=r=>{if(!r||r.length===0)return"";let i="";return r.forEach(a=>{i+=`
                <tr style="border-bottom: 1px solid #eeeeee;">
                    <td style="padding: 12px 8px; width: 80px; text-align: center;">
                        <img src="${a.image}" alt="${a.name}" width="60" height="60" style="object-fit: contain; border-radius: 4px; border: 1px solid #f0f0f0;" />
                    </td>
                    <td style="padding: 12px 8px; font-size: 14px; color: #333333; vertical-align: middle;">
                        <div style="font-weight: 600; color: #111111;">${a.name}</div>
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
        `},m=r=>{const i=encodeURIComponent(`Contacto Inquimed - ${r.email}`);let a=`Datos de contacto:
Email: ${r.email}
`;r.nombre&&(a+=`Nombre: ${r.nombre}
`),r.mensaje&&(a+=`
Mensaje:
${r.mensaje}
`),r.productos&&r.productos.length>0&&(a+=`
Productos solicitados:
`+r.productos.map(f=>`- ${f.name} (Cant: ${f.quantity})`).join(`
`)),window.location.href=`mailto:${c}?subject=${i}&body=${encodeURIComponent(a)}`};return{ejecutar:async r=>{try{let i="";r.mensaje&&r.mensaje.trim()!==""&&(i=`
                <h3 style="color: #1C90A1; font-size: 15px; margin-bottom: 6px;">Mensaje / Comentarios:</h3>
                <p style="background-color: #f5f5f5; padding: 12px; border-radius: 4px; font-style: italic; margin-top: 0; font-size: 14px; color: #444444;">
                  "${r.mensaje}"
                </p>
            `);const a={reply_to:r.email,cliente_nombre:r.nombre||"No especificado",cliente_mensaje_html:i,lista_productos_html:d(r.productos)};if((await M.send(e,t,a,o)).status===200)return{enviadoAutomatico:!0};throw new Error("Error al conectar con EmailJS")}catch(i){return console.warn("[UseCase] Error detectado, ejecutando Fallback manual...",i),m(r),{enviadoAutomatico:!1}}},generarEnlaceWhatsApp:l}}export{F as u};
