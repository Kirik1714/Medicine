import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { loginUserApi } from "../auth.api";

export function useLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { mutate, isPending, error } = useMutation({
    mutationFn: loginUserApi,
    onSuccess: (data) => {
      localStorage.setItem("auth_token", data.token);

      const userProfile = {
        name: `${data.firstName} ${data.lastName}`,
        avatar: data.image,
      };
      localStorage.setItem("user_profile", JSON.stringify(userProfile));

      navigate({ to: "/" });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) return;

    mutate({ username, password });
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    isPending,
    error,
    handleSubmit,
  };
}
