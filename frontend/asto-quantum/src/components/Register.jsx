import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'

function Register() {
    const list = [
        {
            name: "Name",
            dummy: "Vivek Halder"
        },
        {
            name: "Faculty",
            dummy: "FET"
        },
        {
            name: "Year",
            dummy: "2"
        },
        {
            name: "Department",
            dummy: "Information Technology"
        },
        {
            name: "Phone",
            dummy: "123456890"
        },
        {
            name: "Email",
            dummy: "xyz@gmail.com"
        },
        {
            name: "Password",
            dummy: "Hello123"
        }
    ];

    const [userData, setUserData] = React.useState({
        name: '',
        faculty: '',
        year: '',
        department: '',
        phone: '',
        email: '',
        password: '',
    });

    const handleInputChange = (event) => {
        //console.log(event);
        const key = event.target.name;
        const value = event.target.value;
        //console.log(key, value);
        setUserData((prevData) => ({
            ...prevData,
            [key.toLowerCase()]: value,
        }));
    };

    const handleRegistration = async () => {
        try {
            //console.log(import.meta.env.VITE_APP_BACKEND_API_REGISTRATION_END_POINT);
            //console.log(userData);
    
            const response = await axios.post(import.meta.env.VITE_APP_BACKEND_API_REGISTRATION_END_POINT, userData);
    
            if (response) {
                // Check if response.data is not undefined
                if (response.data) {
                    setUserData({
                        name: '',
                        faculty: '',
                        year: '',
                        department: '',
                        phone: '',
                        email: '',
                        password: '',
                    });
                } else {
                    console.log('Error registering the user. response.data is undefined.');
                }
            } else {
                console.log('Error registering the user. response is undefined.');
            }
        } catch (error) {
            console.error('Error registering the user. Error ', error?.message);
        }
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
                                    autoComplete={element.name === 'Password' ? 'new-password' : 'on'}
                                />
                            </div>
                        ))}
                    </div>
                    <div className='flex flex-row w-3/4 mx-auto'>
                        <div className='w-2/3 flex justify-begin'>
                            <h1 className='font-semibold'>
                                Already a member?
                            </h1>
                        </div>

                        <div className='w-1/3 flex justify-end'>
                            <Link to='/login' className='hover:scale-110 hover:underline'>
                                <h1>Log In</h1>
                            </Link>
                        </div>
                    </div>
                    <button onClick={handleRegistration} className='m-4 bg-black text-2xl text-white p-2 px-3 rounded-md'>
                        Join
                    </button>
                </div>
            </div>
        </>
    );
}

export default Register;