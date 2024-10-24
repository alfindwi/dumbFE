export interface IUser{
    id: number
    name: string
    email: string
    image: string
    phone: string
    address: string
    gender: 'MALE' | 'FEMALE'
    role: 'USER' | 'ADMIN'
}