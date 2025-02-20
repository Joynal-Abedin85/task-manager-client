import React from "react";
import { FaFacebook, FaGoogle, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <div>
      <footer className="footer bg-teal-200 text-base-content  p-10">
        <nav>
          <h6 className="footer-title">Services</h6>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </nav>
        
        <nav>
          <h6 className="footer-title">Social</h6>
          <a className="link link-hover flex items-center gap-2"> <FaGoogle className=" text-pink-500 text-2xl"></FaGoogle> Google</a>
          <a className="link link-hover flex items-center gap-2"> <FaYoutube className="text-red-500 text-2xl"></FaYoutube> Youtube</a>
          <a className="link link-hover flex items-center gap-2"> <FaFacebook className="text-blue-500 text-2xl"></FaFacebook> Facebook</a>
        </nav>
        <form>
          <h6 className="footer-title">Newsletter</h6>
          <fieldset className="form-control w-80">
            <label className="label">
              <span className="label-text">Enter your email address</span>
            </label>
            <div className="join">
              <input
                type="text"
                placeholder="username@site.com"
                className="input input-bordered join-item"
              />
              <button className="btn bg-gradient-to-r from-teal-300 via-violet-300 to-cyan-300 join-item font-bold hover:border-transparent border-transparent  text-xl">Subscribe</button>
            </div>
          </fieldset>
        </form>
        
      </footer>
        <div>
            <h2 className="bg-teal-300 text-center py-3  ">@all right reserved by MD Tareq</h2>
        </div>
    </div>
  );
};

export default Footer;
