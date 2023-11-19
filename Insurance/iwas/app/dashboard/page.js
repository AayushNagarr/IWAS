'use client'
import {useSession} from "next-auth/react"
import React, { useState, useEffect } from 'react';
export default function Dashboard(){
    
    const {data: session, status} = useSession();

    useEffect(() => {
        console.log(session);
      }, [session]);
    return (
       <div className="flex flex-wrap justify-center">
         Main Page
       </div>
     );
}