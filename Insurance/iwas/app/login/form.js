'use client'
import {signIn} from 'next-auth/react'
import {useRouter} from 'next/navigation'
import { useRef ,useState,useEffect} from 'react';
import Link from 'next/link'
import { useSession } from 'next-auth/react'

export default function Form(){
    const router = useRouter();
    const { data: session, status } = useSession()
  const usernameRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState("");

  useEffect(() => {
    // If the session exists, redirect to the dashboard
    if (session) {
      router.replace('/');
    }
  }, [session]);

   const handleSubmit = async (e) =>
    {
        e.preventDefault();

    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    if (!username || !password) {
      setError("Both fields are necessary.");
      return;
    }

    const result = await signIn('credentials', {username, password , callbackUrl:'/dashboard'})
    console.log("In login form")
    console.log("In login form",result)
    //clear password reference
    passwordRef.current.value = "";

    if (!result.error) {
      console.log('Valid credentials.')
    } else {
      setError(result.error);
    }
    }
    return(
    <form onSubmit = {handleSubmit}className = "flex flex-col gap-2 mx-auto max-w-md mt-10">
            <input name = "username" ref = {usernameRef} className = "border border-black text-black" type="text" placeholder="Username" />
            <input name = "password" ref = {passwordRef} className = "border border-black text-black" type="password" placeholder="Password" />
            <button type = "submit">Login</button>
            {error && (
          <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
            {error}
          </div>
        )}
         <p className="text-center mt-4">
          Don't have an account? 
          <Link href="/register">
            <span className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">Register</span>
          </Link>
        </p>
        </form>
        )
}