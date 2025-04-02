import { useState } from "react";

type Props = {
  mode: "login" | "signup";
};

const AuthForm = ({ mode }: Props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const endpoint =
      mode === "signup"
        ? "http://localhost/CineScope/backend/signup.php"
        : "http://localhost/CineScope/backend/login.php";

    const payload =
      mode === "signup"
        ? { name, email, password }
        : { email, password };

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.error) {
        setMessage(`❌ ${data.error}`);
      } else {
        setMessage(`✅ ${data.message || "Login successful"}`);
        // You could store user info here
        // localStorage.setItem("user", JSON.stringify(data.user));
      }
    } catch (err) {
      setMessage("❌ Server error");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 capitalize">{mode}</h2>
      <form onSubmit={handleSubmit}>
        {mode === "signup" && (
          <input
            type="text"
            placeholder="Full Name"
            className="w-full mb-3 p-2 border rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        )}
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-3 p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          {mode === "signup" ? "Sign Up" : "Log In"}
        </button>
      </form>
      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
};

export default AuthForm;