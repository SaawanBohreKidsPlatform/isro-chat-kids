"use client";

import { signIn, useSession } from "next-auth/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Image from "next/image";
import Link from "next/link";
import { ButtonComponent } from "@/components/ButtonComponent";
import IsroLogo from "@/public/isro-logo.png";
import FormBackground from "@/public/form-bg.png";
import FormHeaderImage from "@/public/form-header-img.png";
import UrscLogo from "@/public/ursc-logo.png";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import axios from "@/lib/axios";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

export default function Login() {

  const formSchema = z.object({
    username: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await fetch(
        "https://backend.isrospaceagent.com/isro-agent/forgot-password/",
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            "X-CSRFToken": process.env.NEXT_PUBLIC_CSRF_TOKEN ?? "",
          },
          body: JSON.stringify(values),
        }
      );
      const res = await response.json();
      console.log(response.status);
      if (response.status !== 404) {
        setTimeout(() => {
          window.location.href = `reset-password?token=${res?.token}`;
        }, 1000);
      } else {
        toast.error("User not found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex h-screen flex-col items-center">
      <div className="z-10 w-full flex justify-center items-center bg-black py-2">
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: "default", size: "sm" }),
            "hidden md:flex lg:flex absolute left-4 top-4 cursor-pointer bg-transparent hover:bg-black/80"
          )}
        >
          <ArrowLeft className="size-6 text-white" />
        </Link>
        <Image
          src={IsroLogo}
          alt="ISRO Logo"
          className="flex lg:mr-5 md:mr-5 lg:ml-0 md:ml-0 ml-2"
          width={80}
          height={24}
          priority
        />
        <h1 className="font-roboto ml-8 lg:ml-10 md:ml-10 text-2xl lg:text-4xl md:text-4xl font-black bg-gradient-to-r from-[#FF7300] to-[#078DF2] text-transparent bg-clip-text">
          ISRO SPACE AGENT
        </h1>
      </div>
      <div
        className="flex justify-center items-center relative w-full h-full bg-cover bg-top p-2"
        style={{ backgroundImage: `url(${FormBackground.src})` }}
      >
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: "default", size: "sm" }),
            "flex md:hidden lg:hidden items-center absolute left-2 top-2 cursor-pointer bg-transparent hover:bg-black/80"
          )}
        >
          <ArrowLeft className="size-6 text-white" />
        </Link>
        <div className="items-center w-full md:w-3/4 lg:w-1/3 bg-white h-fit py-5 rounded-2xl lg:mt-0 md:mt-0 mt-10">
          <div className="flex justify-center w-full">
            <Image
              src={FormHeaderImage}
              className="rounded-full w-40 h-40 my-5"
              alt=""
              priority
            />
          </div>
          <div className="w-full font-semibold text-2xl text-center my-2">
            Lost in Space? Reset Your Password!
          </div>
          <div className="w-full text-center text-gray-400 text-xs mb-10">
            {"Don't worry! Let's get you a new one. Enter your username below."}
          </div>
          <div className="w-full px-10 mt-10">
            <Form {...form}>
              <form id="forgotPassForm" onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <input
                          {...field}
                          type="text"
                          className="flex border border-black-400 rounded-lg w-full min-h-10 py-2 px-5 my-2"
                          name="forgot-pass-username"
                          id="forgotPassUsername"
                          placeholder="Enter your username"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="w-full flex justify-center mt-10 mb-3">
                  <Button
                    className="w-full rounded-lg"
                    loading={form.formState.isSubmitting}
                  >
                    Submit
                  </Button>
                </div>
                <div className="text-center text-gray-400 text-xs mt-12">
                  Initiative of URSC
                  <div className="w-full flex justify-center">
                    <Image
                      src={UrscLogo}
                      className="w-20"
                      alt="URSC"
                      priority
                    />
                  </div>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
