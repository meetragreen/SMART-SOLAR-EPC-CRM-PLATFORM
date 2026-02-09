import { useState } from "react";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";

export default function AuthPage() {
  const [page, setPage] = useState("login"); // "login" or "signup"

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
        {page === "login" ? (
          <LoginPage onSignup={() => setPage("signup")} />
        ) : (
          <SignupPage onLogin={() => setPage("login")} />
        )}
      </div>
    </div>
  );
}
