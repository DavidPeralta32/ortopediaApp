class u{constructor(t=0,r="Network Error"){this.status=t,this.text=r}}const k=()=>{if(!(typeof localStorage>"u"))return{get:e=>Promise.resolve(localStorage.getItem(e)),set:(e,t)=>Promise.resolve(localStorage.setItem(e,t)),remove:e=>Promise.resolve(localStorage.removeItem(e))}},i={origin:"https://api.emailjs.com",blockHeadless:!1,storageProvider:k()},f=e=>e?typeof e=="string"?{publicKey:e}:e.toString()==="[object Object]"?e:{}:{},P=(e,t="https://api.emailjs.com")=>{if(!e)return;const r=f(e);i.publicKey=r.publicKey,i.blockHeadless=r.blockHeadless,i.storageProvider=r.storageProvider,i.blockList=r.blockList,i.limitRate=r.limitRate,i.origin=r.origin||t},b=async(e,t,r={})=>{const n=await fetch(i.origin+e,{method:"POST",headers:r,body:t}),s=await n.text(),l=new u(n.status,s);if(n.ok)return l;throw l},h=(e,t,r)=>{if(!e||typeof e!="string")throw"The public key is required. Visit https://dashboard.emailjs.com/admin/account";if(!t||typeof t!="string")throw"The service ID is required. Visit https://dashboard.emailjs.com/admin";if(!r||typeof r!="string")throw"The template ID is required. Visit https://dashboard.emailjs.com/admin/templates"},L=e=>{if(e&&e.toString()!=="[object Object]")throw"The template params have to be the object. Visit https://www.emailjs.com/docs/sdk/send/"},g=e=>e.webdriver||!e.languages||e.languages.length===0,y=()=>new u(451,"Unavailable For Headless Browser"),T=(e,t)=>{if(!Array.isArray(e))throw"The BlockList list has to be an array";if(typeof t!="string")throw"The BlockList watchVariable has to be a string"},R=e=>!e.list?.length||!e.watchVariable,_=(e,t)=>e instanceof FormData?e.get(t):e[t],w=(e,t)=>{if(R(e))return!1;T(e.list,e.watchVariable);const r=_(t,e.watchVariable);return typeof r!="string"?!1:e.list.includes(r)},x=()=>new u(403,"Forbidden"),E=(e,t)=>{if(typeof e!="number"||e<0)throw"The LimitRate throttle has to be a positive number";if(t&&typeof t!="string")throw"The LimitRate ID has to be a non-empty string"},H=async(e,t,r)=>{const n=Number(await r.get(e)||0);return t-Date.now()+n},v=async(e,t,r)=>{if(!t.throttle||!r)return!1;E(t.throttle,t.id);const n=t.id||e;return await H(n,t.throttle,r)>0?!0:(await r.set(n,Date.now().toString()),!1)},j=()=>new u(429,"Too Many Requests"),S=async(e,t,r,n)=>{const s=f(n),l=s.publicKey||i.publicKey,p=s.blockHeadless||i.blockHeadless,o=s.storageProvider||i.storageProvider,c={...i.blockList,...s.blockList},a={...i.limitRate,...s.limitRate};return p&&g(navigator)?Promise.reject(y()):(h(l,e,t),L(r),r&&w(c,r)?Promise.reject(x()):await v(location.pathname,a,o)?Promise.reject(j()):b("/api/v1.0/email/send",JSON.stringify({lib_version:"4.4.1",user_id:l,service_id:e,template_id:t,template_params:r}),{"Content-type":"application/json"}))},$=e=>{if(!e||e.nodeName!=="FORM")throw"The 3rd parameter is expected to be the HTML form element or the style selector of the form"},C=e=>typeof e=="string"?document.querySelector(e):e,F=async(e,t,r,n)=>{const s=f(n),l=s.publicKey||i.publicKey,p=s.blockHeadless||i.blockHeadless,o=i.storageProvider||s.storageProvider,c={...i.blockList,...s.blockList},a={...i.limitRate,...s.limitRate};if(p&&g(navigator))return Promise.reject(y());const d=C(r);h(l,e,t),$(d);const m=new FormData(d);return w(c,m)?Promise.reject(x()):await v(location.pathname,a,o)?Promise.reject(j()):(m.append("lib_version","4.4.1"),m.append("service_id",e),m.append("template_id",t),m.append("user_id",l),b("/api/v1.0/email/send-form",m))},V={init:P,send:S,sendForm:F,EmailJSResponseStatus:u};async function q(){const e="service_lkr6hz4",t="template_h375lsl",r="hRfNYeyPVcY8WsDFN",n="tu-correo-de-negocio@inquimed.com",s=o=>{if(!o||o.length===0)return"";let c="";return o.forEach(a=>{c+=`
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
                    ${c}
                </tbody>
            </table>
        `},l=o=>{const c=encodeURIComponent(`Contacto Inquimed - ${o.email}`);let a=`Datos de contacto:
Email: ${o.email}
`;o.nombre&&(a+=`Nombre: ${o.nombre}
`),o.mensaje&&(a+=`
Mensaje:
${o.mensaje}
`),o.productos&&o.productos.length>0&&(a+=`
Productos solicitados:
`+o.productos.map(d=>`- ${d.name} (Cant: ${d.quantity})`).join(`
`)),window.location.href=`mailto:${n}?subject=${c}&body=${encodeURIComponent(a)}`};return{ejecutar:async o=>{try{let c="";o.mensaje&&o.mensaje.trim()!==""&&(c=`
                <h3 style="color: #1C90A1; font-size: 15px; margin-bottom: 6px;">Mensaje / Comentarios:</h3>
                <p style="background-color: #f5f5f5; padding: 12px; border-radius: 4px; font-style: italic; margin-top: 0; font-size: 14px; color: #444444;">
                  "${o.mensaje}"
                </p>
            `);const a={reply_to:o.email,cliente_nombre:o.nombre||"No especificado",cliente_mensaje_html:c,lista_productos_html:s(o.productos)};if((await V.send(e,t,a,r)).status===200)return{enviadoAutomatico:!0};throw new Error("Error al conectar con EmailJS")}catch(c){return console.warn("[UseCase] Error detectado, ejecutando Fallback manual...",c),l(o),{enviadoAutomatico:!1}}}}}export{q as u};
