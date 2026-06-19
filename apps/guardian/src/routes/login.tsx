import { createFileRoute, redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getAuth } from "@/lib/auth/server";
import { authClient } from "@/lib/auth/client";
import { useState } from "react";

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const signInFn = createServerFn({ method: "POST" })
  .validator(LoginSchema)
  .handler(async ({ data }) => {
    const auth = getAuth();
    const session = await auth.api.signInEmail({
      body: { email: data.email, password: data.password },
    });
    return session;
  });

export const Route = createFileRoute("/login")({
  beforeLoad: async () => {
    if (typeof window !== "undefined") {
      const { data: session } = await authClient.getSession();
      if (session) {
        throw redirect({ to: "/" });
      }
    }
  },
  component: LoginPage,
});

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const result = LoginSchema.safeParse({ email, password });
    if (!result.success) {
      setError("Ungültige Eingabe");
      return;
    }

    try {
      await signInFn({ data: result.data });
      window.location.href = "/";
    } catch {
      setError("Login fehlgeschlagen");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-6 rounded-lg bg-white p-8 shadow-md">
        <h1 className="text-center text-2xl font-bold">Atlas.Lab</h1>
        <p className="text-center text-gray-500">Melde dich an, um fortzufahren</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">E-Mail</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border px-3 py-2 shadow-sm"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">Passwort</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              className="mt-1 block w-full rounded-md border px-3 py-2 shadow-sm"
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Anmelden
          </button>
        </form>
      </div>
    </div>
  );
}
