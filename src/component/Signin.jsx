import React, { useContext } from 'react';
import { Authcontext } from './Authprovider';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';

const Signin = () => {

  const {signinuser,setuser,signingoogle} = useContext(Authcontext)
  
  const location = useLocation()
  const navigate = useNavigate()

  const handlesignin= e => {
    e.preventDefault()
    const email = e.target.email.value;
    const password = e.target.Password.value;
    console.log(email,password);

    signinuser(email,password)
    .then(res => {
      console.log(res.user);
      setuser(res.user)
      navigate(location?.state ? location.state : "/")
      const lastSignInTime = res?.user?.metadata?.lastSignInTime;
      const loginfo = {email , lastSignInTime}

      fetch('http://localhost:5000/users', {
        method: 'PATCH',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(loginfo)
      })
      .then(res  => res.json())
      .then(data => {
        console.log(data);
      })
    })
    .catch(err => {
      console.log(err);
    })
  }

  const handlegooglelogin = ()=>{
    signingoogle()
    .then(result => {
        console.log(result.user)
        
        navigate(location?.state ? location.state : "/")
    })
    .catch((err)=> {
        console.log(err);
    })
}


    return (
        <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Login now!</h1>
      <p className="py-6">
        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
        quasi. In deleniti eaque aut repudiandae et a id nisi.
      </p>
    </div>
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <form className="card-body" onSubmit={handlesignin}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" name='email' placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" name='Password'  placeholder="password" className="input input-bordered" required />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="">
            <h2 className="font-bold">
                if you dont have account pls
                <NavLink to='/signup' className="text-teal-400">--Sign up</NavLink>
            </h2>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Login</button>
        </div>
        <div className="text-left mt-4">
                    <button onClick={handlegooglelogin} className="btn text-fuchsia-500 text-2xl hover:bg-fuchsia-100 border border-fuchsia-400 hover:border-transparent  bg-white rounded-full"> <FaGoogle></FaGoogle> log in with google </button> 
            </div>
      </form>
    </div>
  </div>
        </div>
    );
};

export default Signin;