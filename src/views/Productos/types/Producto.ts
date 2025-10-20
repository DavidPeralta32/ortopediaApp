export interface Producto {
  id: number
  name: string
  category: string
  price: number
  stock: boolean
  image: string
  quantity?: number
}