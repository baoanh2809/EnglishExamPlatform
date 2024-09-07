
export const getAccessTokenFromLS = () => {
  return localStorage.getItem('token') || ''
}