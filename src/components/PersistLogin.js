// import { Outlet } from "react-router-dom";
// import { useState, useEffect } from "react";
// import useRefreshToken from '../hooks/useRefreshToken';
// import useAuth from '../hooks/useAuth';
// import useLocalStorage from "../hooks/useLocalStorage";
// import { useNavigate } from "react-router-dom";
// const PersistLogin = () => {
//     const [isLoading, setIsLoading] = useState(true);
//     const refresh = useRefreshToken();
//     const { auth } = useAuth();
//     console.log(`PERSIST LOGIN ${auth?.roles}`);
//     const [persist] = useLocalStorage('persist', false);

//     useEffect(() => {
//         let isMounted = true;

//         const verifyRefreshToken = async () => {
//             try {
//                 await refresh();
//             }
//             catch (err) {
//                 console.error(` error from refresh ${JSON.stringify(err.message)}`);
//             }
//             finally {
//                 isMounted && setIsLoading(false);
//             }
//         }
     
//         // persist added here AFTER tutorial video
//         // Avoids unwanted call to verifyRefreshToken
//         !auth?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false) && useNavigate('/login');
        
//         return () => isMounted = false;
//     }, [auth?.accessToken,persist,refresh])

//     useEffect(() => {
//         console.log(`isLoading: ${isLoading}`)
//         console.log(`aT: ${JSON.stringify(auth?.accessToken)}`)
//     }, [isLoading,auth?.accessToken])

//     return (
//         <>
//             {!persist
//                 ? <Outlet />
//                 : isLoading
//                     ? <p>Loading...</p>
//                     : <Outlet />
//             }
//         </>
//     )
// }

// export default PersistLogin

import { Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from '../hooks/useRefreshToken';
import useAuth from '../hooks/useAuth';
import useLocalStorage from "../hooks/useLocalStorage";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth } = useAuth();
    const navigate = useNavigate(); // Move useNavigate hook here
    console.log(`PERSIST LOGIN ${auth?.roles}`);
    const [persist] = useLocalStorage('persist', false);

    useEffect(() => {
        let isMounted = true;

        const verifyRefreshToken = async () => {
            try {
                await refresh();
            }
            catch (err) {
                console.error(` error from refresh ${JSON.stringify(err.message)}`);
            }
            finally {
                isMounted && setIsLoading(false);
            }
        }
     
        // Call useNavigate directly within the functional component body
        if (!auth?.accessToken && persist) {
            verifyRefreshToken();
        } else if(!auth?.accessToken && !persist){          
            setIsLoading(false);
            navigate('/login'); // Navigate to '/login' route
        }else{
            setIsLoading(false);
        }
        
        return () => isMounted = false;
    }, [auth?.accessToken, persist, refresh, navigate])

    useEffect(() => {
        console.log(`isLoading: ${isLoading}`)
        console.log(`aT: ${JSON.stringify(auth?.accessToken)}`)
    }, [isLoading, auth?.accessToken])

    return (
        <>
            {!persist
                ? <Outlet />
                : isLoading
                    ? <p>Loading...</p>
                    : <Outlet />
            }
        </>
    )
}

export default PersistLogin;


