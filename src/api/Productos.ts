

// src/api/productos.js

export const getProductosLineaBlancaZonaSuperior = async () => {
  try {
    const response = await fetch('./data/ortopedia-blanda/MiembroSuperior.json');
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener productos:", error);
    throw error; 
  }
};


export const getProductosPorArchivo = async (categoria: string, zona: string) => {
  try {
    const zonaFormateada = zona
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');

    const ruta = `./data/${categoria}/${zonaFormateada}.json`;
    
    const response = await fetch(ruta);
    
    // VALIDACIÓN CRUCIAL:
    // Si la respuesta no es OK o el contenido no es JSON, lanzamos error controlado
    const contentType = response.headers.get("content-type");
    if (!response.ok || !contentType || !contentType.includes("application/json")) {
      console.warn(`Archivo no encontrado o formato inválido en: ${ruta}`);
      return []; // Devolvemos un array vacío para que la app no rompa
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error silencioso (posible archivo faltante):", error);
    return []; 
  }
};