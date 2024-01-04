import React from 'react';
import validator from 'validator';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Login() {
    const list = [
        {
            name: "Phone or Email",
        },
        {
            name: "Password",
        }
    ];

    const handleLogin = async () => {
        try {
            const response = await axios.post(import.meta.env.VITE_APP_BACKEND_API_LOGIN_END_POINT, { email: userData.email, phone: userData.phone, password: userData.password });

            if(response && response?.data){
                setUserData({
                    email: "",
                    phone: "",
                    password: ""
                });
            }

            if(!response){
                console.error("There was an error logging in the user.");
            }
        } catch (error) {
            console.log("Error occured whiling logging the user in. Error ", error?.message);
        }
    };

    const [userData, setUserData] = React.useState({
        phone: '',
        email: '',
        password: '',
    });

    const handleInputChange = (event) => {
        //console.log(event);
        const key = event.target.name;
        const value = event.target.value;
        //console.log(key, value);

        if(key==="phone or email"){
            if(!value?.trim().length){
                setUserData((prevData)=> ({
                    ...prevData,
                    phone: "",
                    email: ""
                }))  
            }
            if(validator.isNumeric(value)){
                setUserData((prevData)=> ({
                    ...prevData,
                    phone: value,
                    email: ""
                }))
            }
            else {
                if(validator.isEmail(value)){
                    setUserData((prevData) => ({
                        ...prevData,
                        email: value,
                        phone: ""
                    }))
                }
                // else{
                //     console.log("inavlid email format");
                // }
            }
        }

        else{
            setUserData((prevData) => ({
                ...prevData,
                [key.toLowerCase()]: value,
            }));
        }

        //console.log(userData);
    };

    return (
        <>
            <div className='flex justify-center items-center h-full'>
                <div className='w-3/4 flex flex-col justify-center items-center m-4 bg-green-200'>
                    <h1 className='text-5xl text-gray-600 mt-20 m-5'>
                        Join Astro-Quantum Club JU
                    </h1>
                    <div className='w-3/4 p-5 flex flex-col bg-blue-200 m-5 items-center rounded-md'>
                        {list.map((element, index) => (
                            <div key={index} className='w-full flex flex-col items-begin'>
                                <label
                                    key={index}
                                    className='block text-gray-600 text-sm font-semibold mt-4 mb-1 w-3/4 mx-auto'
                                    htmlFor={element.name.toLowerCase()}>
                                    {element.name}
                                </label>
                                <input
                                    type="text"
                                    id={element.name.toLowerCase()}
                                    name={element.name.toLowerCase()}
                                    value={userData[element.name.toLowerCase()]}
                                    placeholder={element.dummy}
                                    onChange={handleInputChange} // Handle input changes
                                    className='border rounded-md px-3 py-2 w-3/4 mx-auto'
                                    autoComplete='on'
                                />
                            </div>
                        ))}
                    </div>
                    <div className='flex flex-row w-3/4 mx-auto'>
                        <div className='w-2/3 flex justify-begin'>
                            <h1 className='font-semibold'>
                                New to Astro-Quantum JU?
                            </h1>
                        </div>

                        <div className='w-1/3 flex justify-end'>
                            <Link to="/register" className='hover:scale-110 hover:underline'>
                                Join
                            </Link>
                        </div>
                    </div>
                    <button onClick={handleLogin} className='m-4 bg-black text-2xl text-white p-2 px-3 rounded-md'>
                        Join
                    </button>
                </div>
            </div>
        </>
    );
}

export default Login