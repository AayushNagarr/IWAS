'use client'
import { useState } from 'react';
import {useRouter} from 'next/navigation';

export default function Form(){
    const [isAdmin, setIsAdmin] = useState(false);

    const router = useRouter();
    const handleSubmit = async (e) =>
    {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const response = await fetch("/api/auth/register/", {
            method: "POST",
            body: JSON.stringify({
                username: formData.get("username"),
                password: formData.get("password"),
                isAdmin: isAdmin,
            }),
        });
        if(response.ok){
            router.push("/login");
        }

        console.log({response});

    }
    const handleCheckboxChange = () => {
        setIsAdmin(!isAdmin); // Toggle the isAdmin value
    }

    return(
    <form onSubmit = {handleSubmit}className = "flex flex-col gap-2 mx-auto max-w-md mt-10">
            <input name = "username" className = "border border-black text-black" type="text" placeholder="Username" />
            <input name = "password" className = "border border-black text-black" type="password" placeholder="Password" />
            <label>
                <input name="isAdmin" type="checkbox" checked={isAdmin} onChange={handleCheckboxChange} />
                Is Admin
            </label>
            <button type = "submit">Register</button>
        </form>
        )
}