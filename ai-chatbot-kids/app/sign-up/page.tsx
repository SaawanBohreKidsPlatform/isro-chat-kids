"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ButtonComponent } from "@/components/ButtonComponent";
import IsroLogo from "@/public/isro-logo.png";
import FormBackground from "@/public/form-bg.png";
import FormHeaderImage from "@/public/form-header-img.png";
import UrscLogo from "@/public/ursc-logo.png";

export default function Login() {
  /* const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session]); */

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const username = event.currentTarget.username.value;
    const password = event.currentTarget.password.value;
    await signIn("credentials", {
      redirect: false,
      username,
      password,
    });
  };

  return (
    <div className="flex h-screen flex-col items-center">
      <div className="z-10 w-full flex justify-center items-center bg-black font-roboto text-xl text-white font-bold py-2 pb-20">
        <Image
          src={IsroLogo}
          alt="ISRO Logo"
          className="flex mr-5"
          width={80}
          height={24}
          priority
        />
        ISRO SPACE AGENT
      </div>
      <div
        className="flex justify-center relative w-full h-full bg-cover bg-top"
        style={{ backgroundImage: `url(${FormBackground.src})` }}
      >
        <div className="items-center w-1/4 bg-white h-fit py-5 rounded-2xl">
          <div className="flex justify-center w-full">
            <Image
              src={FormHeaderImage}
              className="rounded-full w-40 h-40 my-5"
              alt=""
              priority
            />
          </div>
          <div className="w-full font-semibold text-2xl text-center my-2">
            Join the Space Crew!
          </div>
          <div className="w-full px-10 mt-10">
            <form id="signupForm" onSubmit={() => {}}>
              <input
                type="text"
                className="flex border border-black-400 rounded-lg w-full min-h-10 py-2 px-5 my-2"
                name="signup-username"
                id="signupUsername"
                placeholder="Username"
              />
              <input
                type="tel"
                className="flex border border-black-400 rounded-lg w-full min-h-10 py-2 px-5 my-2"
                name="signup-mobileno"
                id="signupMobileNo"
                pattern="[0-9]{3} [0-9]{3} [0-9]{4}"
                placeholder="Mobile number"
              />
              <input
                type="password"
                className="flex border border-black-400 rounded-lg w-full min-h-10 py-2 px-5 my-2"
                name="signup-password"
                id="signupPassword"
                placeholder="Password"
              />
              <input
                type="password"
                className="flex border border-black-400 rounded-lg w-full min-h-10 py-2 px-5 my-2"
                name="confirm-signup-password"
                id="confirmSignupPassword"
                placeholder="Confirm Password"
              />
              <div className="w-full flex justify-center mt-6 mb-3">
                <ButtonComponent
                  type="submit"
                  id="signupButton"
                  className="bg-[#1FA2FF] rounded-lg px-32 py-2"
                  buttonText="Sign Up"
                  onClick={() => {}}
                />
              </div>
              <div className="w-full text-center text-gray-400 text-sm mb-10">
                Already a space explorer?{" "}
                <Link className="text-[#1FA2FF]" href={"/"}>
                  Log in!
                </Link>
              </div>
              <div className="text-center text-gray-400 text-xs">
                Initiative of URSC
                <div className="w-full flex justify-center">
                  <Image src={UrscLogo} className="w-20" alt="URSC" priority />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
