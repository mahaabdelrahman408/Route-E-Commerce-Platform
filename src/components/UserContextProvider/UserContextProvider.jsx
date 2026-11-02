import {  useEffect, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import axios from 'axios';
import { toast } from "sonner";



export default function UserContextProvider({ children }) {
      const [apiError, setApiError] = useState(null);

    const [userToken, setUserToken] = useState(() => localStorage.getItem('userToken'));
    const [username, setUsername] = useState(() => localStorage.getItem('username'));
    const [email, setEmail] = useState(() => localStorage.getItem('email'));
    const [updatelogged, setupDateLogged] = useState(null);
const [isTokenVerified, setIsTokenVerified] = useState(false);

const [userId, setUserId] = useState(null);
const [users, setUsers] = useState([]);

// ******************************* updateLoggedUserData *******************************
    async function updateLoggedUserData(values) {
 setApiError(null);
  setupDateLogged(null);
      
  try{
    let{data}=await axios.put("https://ecommerce.routemisr.com/api/v1/users/updateMe/",values,{ headers: {
      'token': localStorage.getItem("userToken")
    }})
  // console.log('updateLoggedUserData',data);
  setupDateLogged(data);
  setUsername(data.user.name);
setEmail(data.user.email);
toast.success(data.message, {
  duration: 2000,
  position: "top-right",
});

localStorage.setItem("username", data.user.name);
localStorage.setItem("email", data.user.email);
  setApiError(null);
  setTimeout(() => {
    setupDateLogged(null); 
  }, 3000);
  }
  catch(err){
    setupDateLogged(null);
// console.log(  'testerr' , err?.response?.data?.errors?.msg);
setApiError(err?.response?.data?.errors?.msg || "An error occurred");
  }
}
// ******************************* Verify Token *******************************
async function verifyToken() {  
  try{
 let{data}= await axios.get("https://ecommerce.routemisr.com/api/v1/auth/verifyToken", {
  headers: {
    'token': localStorage.getItem("userToken")
  }
});
// console.log(data);

setIsTokenVerified(true)

    setUserId(data.decoded.id);

  }
  catch(err){
    console.log('verifyToken error', err);
        setIsTokenVerified(false);

  }
  
}
// ******************************* useEffect *******************************
useEffect(() => {
  if (!userToken) {
    return;
  }

  const verifyInitialToken = async () => {
    try {
      const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/auth/verifyToken", {
        headers: {
          'token': userToken
        }
      });

      setIsTokenVerified(true);
      setUserId(data.decoded.id);
    } catch (err) {
      console.log('verifyToken error', err);
      setIsTokenVerified(false);
    }
  };

  void verifyInitialToken();
}, [userToken]);

// ******************************* Get All Users *******************************
async function getAllUsers() {
  try {
    const { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/users"
    );

    // console.log(data);
    setUsers(data.users);

  } catch (err) {
    console.log("getAllUsers error", err);
  }
}
    return (
        <UserContext value={{ userToken, setUserToken ,updateLoggedUserData, apiError ,username,setUsername,updatelogged,setupDateLogged ,email,setEmail,isTokenVerified, setIsTokenVerified,verifyToken,userId,setUserId ,getAllUsers,users,setUsers}}>
            {children}
        </UserContext>
    );
   
}
