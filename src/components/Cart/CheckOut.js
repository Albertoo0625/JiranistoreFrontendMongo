import React,{useEffect,useRef,useState} from 'react';
import { ProductConsumer } from '../../context';
import '../../CheckoutPage.css';
import { axiosPrivate } from '../../api/axios';
import AuthContext from '../../context/AuthProvider';
import { useContext } from 'react';

const phoneRegex = /^(07)[0-9]{8}$/;
const STK_URL = '/stk';
export default function CheckoutPage() {
      const phoneRef=useRef();
      const errRef=useRef();
      
     const {auth}=useContext(AuthContext);

     console.log(JSON.stringify(auth?.accessToken));
     
      

      useEffect(() => {
        phoneRef.current.focus();
    }, []);


    const [amount, setAmount] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('Nairobi');
    const [phoneValid, setPhoneValid] = useState(false);


   

    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
        if (phoneRegex.test(e.target.value)) {
            setPhoneValid(true).then(console.log(`${phone}`));
        } else {
            setPhoneValid(false);
        }
    }

    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    }

    const handlePayment = async (e) => {
        e.preventDefault();
        console.log(amount);
        console.log(phoneValid);
        console.log(address);
        if (amount && phoneValid && address) {
            console.log(amount,phoneValid,address);
            // send the payment request to the server     
                // if button enabled with JS hack
                const v1 = phoneRegex.test(phone);
                const v2 = amount;
                if (!v1 || !v2) {
                    setErrMsg("Invalid Entry");
                    return;
                }
                try {
                    const token=auth?.accessToken;
                    const response = await axiosPrivate.post(STK_URL,  JSON.stringify({ phone, amount }),{
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json"
                        },
                        withCredentials: true
                    });
                    
                    
                    // (STK_URL,
                    //     JSON.stringify({ phone, amount }),
                    //     {
                    //         headers: { 'Content-Type': 'application/json' },
                    //         withCredentials: true
                    //     }
                    // );

                    
                    // TODO: remove console.logs before deployment
                    console.log(JSON.stringify(response?.data));
                    
                    
                } catch (err) {
                    if (!err?.response) {
                        setErrMsg('No Server Response');
                    } else if (err.response?.status === 401) {
                        setErrMsg('Unauthorized');
                    } else {
                        setErrMsg('Payment Failed');
                    }
                    errRef.current.focus();
                }
            

            console.log('Payment successful!')
        } else {
            console.log('Please fill in all the required fields')
        }
    }
  return (
    <ProductConsumer>
    {(value)=>{
           const {cartTotal}= value;
               setAmount(Math.floor(cartTotal));  
           return(
            
   <form onSubmit={handlePayment}>
    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>

     <label>
       Phone Number:
       <input type="tel" value={phone} onChange={handlePhoneChange} ref={phoneRef} placeholder='0712345678'/>
     </label>
     <br />
     <label>
       Amount:
       <input type="number" value={amount} readOnly={true}/>
     </label>
     <br />
     <label>
       Delivery Address:
       <select value={address} onChange={handleAddressChange}>
         <option defaultValue="nairobi">Nairobi</option>
         <option value="mombasa">Mombasa</option>
         <option value="kisumu">Kisumu</option>
         <option value="eldoret">Eldoret</option>         
       </select>
     </label>
     <br />
     <button type="submit">Pay with MPESA</button>
   </form>
   )}}
   </ProductConsumer>
  )
}
