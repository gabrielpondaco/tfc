export interface ILoginBody {
  email: string,
  password: string,
}

export interface TokenInterface {
  data: {
    email: string,
    password: string,
  }
}