import React, { useState } from "react";
import { supabase } from "../client";
import { Link } from "react-router-dom";

const SignUpDoctor = () => {
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
      // Sign up the user in Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
        data: {
          full_name: formData.fullName,
          role: "doctor",
        }
      }
      });

      if (error) {
        alert(error.message);
        return;
      }

      const user = data.user;

      // Inserting into profiles table
      if (user) {
        const { error: profileError } = await supabase.from("profiles").insert([
          {
            id: user.id, // same id as in auth.users
            full_name: formData.fullName,
            role: "doctor", // ✅ matches the SQL CHECK constraint
          },
        ]);

        if (profileError) {
          console.error(profileError);
          alert("Error saving profile");
          return;
        }
      }

      // alert("Check your email for a verification link");
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-semibold text-center text-blue-600 mb-6">
        SignUp as a Doctor
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          placeholder="Full Name"
          name="fullName"
          onChange={handleChange}
          value={formData.fullName}
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />

        <input
          placeholder="Email"
          name="email"
          type="email"
          onChange={handleChange}
          value={formData.email}
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />

        <input
          placeholder="Password"
          type="password"
          name="password"
          onChange={handleChange}
          value={formData.password}
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Submit
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">
          Login
        </Link>
      </p>
    </div>
</div>

  );
};

export default SignUpDoctor;
