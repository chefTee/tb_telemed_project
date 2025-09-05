import React, { useState } from "react";
import { supabase } from "../client";
import { Link } from "react-router-dom";

const SignUpPatient = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

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
      // Step 1: Sign up the user in Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        alert(error.message);
        return;
      }

      const user = data.user;

      // Step 2: Insert into profiles table
      if (user) {
        const { error: profileError } = await supabase.from("profiles").insert([
          {
            id: user.id, // same id as in auth.users
            full_name: formData.fullName,
            role: "patient", // ✅ matches the SQL CHECK constraint
          },
        ]);

        if (profileError) {
          console.error(profileError);
          alert("Error saving profile");
          return;
        }
      }

      alert("Check your email for a verification link");
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Full Name"
          name="fullName"
          onChange={handleChange}
          value={formData.fullName}
          required
        />

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

        <button type="submit" className="bg-green-500">Submit</button>
      </form>

      Already have an account? <Link to="/login">Login</Link>
    </div>
  );
};

export default SignUpPatient;
