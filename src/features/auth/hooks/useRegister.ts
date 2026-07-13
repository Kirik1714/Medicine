// src/features/auth/hooks/useRegister.ts
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { registerUserApi } from "../auth.api";

export function useRegister() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { mutate, isPending, error } = useMutation({
    mutationFn: registerUserApi,
    onSuccess: () => {
      alert("Registration finished successfully! Now sign in system.");
      navigate({ to: "/login" });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (!username || !email || !password || !confirmPassword) return;

    if (password !== confirmPassword) {
      setValidationError("Password doesn't match!");
      return;
    }

    mutate({ username, email, password });
  };

  return {
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    validationError,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    isPending,
    error,
    handleSubmit,
  };
}
