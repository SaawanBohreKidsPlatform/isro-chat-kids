"use client";

import Image from "next/image";
import Link from "next/link";
import { ButtonComponent } from "@/components/ButtonComponent";
import IsroLogo from "@/public/isro-logo.png";
import LandingHeaderImg from "@/public/landing-header.png";
import SendIcon from "@/public/send-icon.png";

export default function LandingPage() {
  return (
    <main className="flex min-h-screen flex-col items-center pb-10">
      <div className="z-10 w-full flex justify-between items-center font-roboto text-sm py-2 px-32">
        <Link href={"/"}>
          <Image
            src={IsroLogo}
            alt="ISRO Logo"
            className="flex"
            width={80}
            height={24}
            priority
          />
        </Link>
        {/* <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          ISRO Space Agent
        </p> */}
        <ul className="flex">
          <li className="flex h-auto w-max mr-5">
            <Link
              className="justify-center text-blue-500 border-blue-500 p-6 backdrop-blur-2x lg:static lg:w-auto lg:rounded-3xl lg:border lg:px-4 lg:py-2"
              href="/sign-up"
              rel="noopener noreferrer"
            >
              Sign Up
            </Link>
          </li>
          <li className="flex h-auto w-max">
            <Link
              className="justify-center text-white border-blue-500 bg-blue-500 p-6 backdrop-blur-2x lg:static lg:w-auto lg:rounded-3xl lg:border lg:bg-blue-500 lg:px-4 lg:py-2"
              href="/log-in"
              rel="noopener noreferrer"
            >
              Log In
            </Link>
          </li>
        </ul>
      </div>
      <div className="relative w-full px-48">
        <div className="relative px-16 flex justify-center">
          <Image
            className="relative w-5/6 rounded-xl"
            src={LandingHeaderImg}
            alt=""
            priority
          />
        </div>
        <div className="relative w-full text-center text-[#6C6C6C] text-sm py-5 border-b">
          <h4>“Explore the wonders of space!”</h4>
          <h4>“Learn about planets, stars, and beyond.”</h4>
        </div>
        <div className="mt-10 m-5 grid grid-cols-3 text-left">
          <ButtonComponent
            name="template-query-1"
            className="justify-center px-5 py-3 bg-[#EDEBFF] backdrop-blur-2x lg:static lg:w-auto lg:rounded-lg lg:m-2"
            buttonText="🚀 Planets in our Solar System"
            onClick={() => {}}
          />
          <ButtonComponent
            name="template-query-2"
            className="justify-center px-5 py-3 bg-[#E0FFEB] backdrop-blur-2x lg:static lg:w-auto lg:rounded-lg lg:m-2"
            buttonText="✨ Stars and Constellations"
            onClick={() => {}}
          />
          <ButtonComponent
            name="template-query-3"
            className="justify-center px-5 py-3 bg-[#FEE7E7] backdrop-blur-2x lg:static lg:w-auto lg:rounded-lg lg:m-2"
            buttonText="👩‍🚀 Astronauts and Space Missions"
            onClick={() => {}}
          />
          <ButtonComponent
            name="template-query-4"
            className="justify-center px-5 py-3 bg-[#E9FFFA] backdrop-blur-2x lg:static lg:w-auto lg:rounded-lg lg:m-2"
            buttonText="🌕 The Moon and its Phases"
            onClick={() => {}}
          />
          <ButtonComponent
            name="template-query-5"
            className="justify-center px-5 py-3 bg-[#E6F7FE] backdrop-blur-2x lg:static lg:w-auto lg:rounded-lg lg:m-2"
            buttonText="🔭 Fun Space Facts"
            onClick={() => {}}
          />
          <ButtonComponent
            name="template-query-6"
            className="justify-center px-5 py-3 bg-[#E3ECFF] backdrop-blur-2x lg:static lg:w-auto lg:rounded-lg lg:m-2"
            buttonText="📜 Space Exploration History"
            onClick={() => {}}
          />
        </div>
        <div className="relative w-full justify-center px-52">
          <form id="userInput" onSubmit={() => {}}>
            <textarea
              className="flex border border-gray-400 rounded-2xl w-full min-h-12 py-3 px-7 resize-none"
              rows={1}
              name="input-query"
              id="inputQuery"
              placeholder="Ask me about space...!"
            />
            <ButtonComponent
              id="sendInput"
              className="bg-blue-400 rounded-2xl pl-5 p-3.5 absolute top-[0.15rem] right-[13.2rem]"
              icon={
                <Image
                  className="relative w-5"
                  src={SendIcon}
                  alt="Next.js Logo"
                  priority
                />
              }
              onClick={() => {}}
            />
          </form>
        </div>
      </div>
      <div className="absolute bottom-0 w-full text-center text-gray-400 text-xs py-1.5 shadow-lg shadow-black">
          Developed by Team GYAAN at URSC
        </div>
    </main>
  );
}
