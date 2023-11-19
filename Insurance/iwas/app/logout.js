'use client';
import {signOut} from 'next-auth/react';
export default function Logout(){
    return(
        <span className = "px-10" onClick = {() =>{
            signOut();
        }}>
            Logout
        </span>
    )
}