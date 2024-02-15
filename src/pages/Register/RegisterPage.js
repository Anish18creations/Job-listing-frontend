import React from 'react';
import Register from '../../components/RegisterComponent/Register';
//import toast, { Toaster } from 'react-hot-toast';

//const notify = () => toast('Here is your toast.');

export default function RegisterPage() {
  return (
    <div>
        <Register />
        {/*<Toaster />
        <button onClick={notify}>Make me a toast</button>}
        {/*<Toaster />*/}
    </div>
  )
}
