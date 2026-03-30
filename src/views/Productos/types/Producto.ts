export interface Producto {
  id: number
  name: string
  category: string
  sub_categoria: string
  price?: number
  stock: boolean
  image: string
  quantity?: number
  descripcion: string
}