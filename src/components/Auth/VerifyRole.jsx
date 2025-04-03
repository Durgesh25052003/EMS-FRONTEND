import { verifyToken } from "../../service/apiService";

const authCheck = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        return { authorized: false, role: null }
    }
    try {
        const res = await verifyToken(token);
        if (!res || !res.data) {
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            sessionStorage.removeItem('userData');
            return { authorized: false, role: null }
        }
        return { authorized: true, role: res.data.role }
    } catch (error) {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        sessionStorage.removeItem('user');
        return { authorized: false, role: null }
    }
}

export default authCheck
