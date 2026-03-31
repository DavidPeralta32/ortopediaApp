
export const getCategorias = async () => {
  try {
    const response = await fetch('./data/MisCategorias.json');
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener las categorias:", error);
    throw error; 
  }
};