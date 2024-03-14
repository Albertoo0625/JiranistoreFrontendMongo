import axios from '../api/axios';
import useAuth from './useAuth';
const useRefreshToken = () => {
    const { auth,setAuth } = useAuth();
    console.log(`Auth from refresh ${JSON.stringify(auth)}`)
   
    const refresh = async () => {
        const response = await axios.get('/refresh', {
            withCredentials: true
        });
        setAuth(prev => {
            console.log(`FROM REFRESH`+JSON.stringify(prev));
            console.log(response.data.accessToken);
            console.log(`roles after refresh ${JSON.stringify(response.data.roles)}`);
            return {
                ...prev,
                roles: response.data.roles,
                accessToken: response.data.accessToken
            }
        });
        return response.data.accessToken;
    }
    return refresh;    
};

export default useRefreshToken;
