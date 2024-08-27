"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signup } from "../../utils/auth";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await signup(username, password);
    if (success) {
      router.push("/login");
    } else {
      alert("Signup failed");
    }
  };

  const gotoLogin = () => {
    router.push("/login");
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Sign Up</button>
      </form>
      <br />
      <button onClick={gotoLogin}>Login</button>
    </div>
  );
}
