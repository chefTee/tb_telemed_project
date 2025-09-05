import React, { useState } from "react";
import { supabase } from "../client";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  let navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  console.log(formData)

  function handleChange(event){
    setFormData((prevFormData) => {
        return{
          ...prevFormData,
          [event.target.name]:event.target.value
        }
    })
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        alert(error.message);
        return;
      }

      console.log("User:", data.user);
      console.log("Session:", data.session);

      navigate("/homepage"); // redirect after login
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Email"
          name="email"
          onChange={handleChange}
          value={formData.email}
          required
        />

        <input
          placeholder="Password"
          type="password"
          name="password"
          onChange={handleChange}
          value={formData.password}
          required
        />

        <button type="submit">Submit</button>
      </form>

      Don't have an account? <Link to="/signup">Sign Up</Link>
    </div>
  );
};

export default Login;
