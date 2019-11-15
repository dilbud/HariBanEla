
// user type
// admin 0
// general 1
// Professional 2

export interface TokenData {
  userId: number ;
  userType: number ;
  jwtExist: boolean ;
  initial: Date ;
  expire: number ;
  jwt: string ;
}
