"use server";

import { redirect } from "next/navigation";
import api from "../api/apiClient";

/**
 * backendに送るもの
 *
 * [login]
 *  email
 *  password
 *
 * [register]
 *  email
 *  password
 *  password-confirmation
 *  username
 *  profile
 *  affiliation
 *  position
 *
 * backendから返ってくるもの
 *
 * [login]
 *  email
 *
 * [register]
 *  email
 *  username
 *  profile
 *  affiliation
 *  position
 */

export async function loginAction(prevState: null, formData: FormData) {
  //  emailとpasswordを取得
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const response = await api.post("/auth/login", { email, password });
    // await createSession
  } catch (error) {}
}
