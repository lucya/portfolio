export type UserType = {
  uid?: number;
  email?: string;
  password?: string;
  username?: string;
  photoURL?: string;
  auth: string | '1' | '2'
}

export const User: UserType = {
  uid: 0,
  email: '',
  password: '',
  username: '',
  photoURL: '',
  auth: '2',
}
