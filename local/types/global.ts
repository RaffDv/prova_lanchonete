export type AccountType = {
    UserData: UserDataType
    AddresData: AddressType

}
export type UserDataType = {
    user: string
    email: string
    pass: string[]
    passIsEqual: boolean,
}
export type AddressType = {
    country: string,
    state: string,
    city: string,
    neighborhood: string
    street: string
    complement: string
}