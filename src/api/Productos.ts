

// src/api/productos.js

export const getProductosLineaBlancaZonaSuperior = async () => {
  try {
    const response = await fetch('./data/linea_blanca/MiembroSuperior.json');
    
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