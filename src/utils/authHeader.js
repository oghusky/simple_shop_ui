const authHeader = (token) => {
    if (token) return { headers: { authorization: token } }
    else return ''
}
export default authHeader