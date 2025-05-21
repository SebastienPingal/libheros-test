declare global {
  interface IUser {
    id: string
    email: string
    name: string
    createdAt: Date
    updatedAt: Date
  }

  interface ITodoList {
    id: string
    title: string
    todos: ITodo[]
    createdAt: Date
    updatedAt: Date
  }

  interface ITodo {
    id: string
    title: string
    description: string
    completed: boolean
    expirationDate: Date
    createdAt: Date
    updatedAt: Date
  }
}
export {}
