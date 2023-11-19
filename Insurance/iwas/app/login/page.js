import {getServerSession} from 'next-auth';
import Form from './form.js';
import {redirect} from 'next/navigation';

export default async function Login(){
    const session = await getServerSession();
    if(session){
        redirect("/");
    }
    return(
        <Form/>
    )
}