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
import axios from "@/lib/axios";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";

export default function ResetPassword() {
  /* const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session]); */
  const reset_token = "abcdefghijklmnopqrstuvwxyz";

  const formSchema = z.object({
    new_password: z.string(),
    confirm_password: z.string(),
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
      const res = await axios.post(`/reset-password/${reset_token}/`, values);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex h-screen flex-col items-center">
      <div className="z-10 w-full flex justify-center items-center bg-black font-roboto text-xl text-white font-bold py-2 pb-10">
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            "absolute left-4 top-4 cursor-pointer bg-transparent hover:bg-black/80"
          )}
        >
          <ArrowLeft className="size-6 text-white" />
        </Link>
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
        <div className="items-center w-1/3 bg-white h-fit py-5 rounded-2xl">
          <div className="flex justify-center w-full">
            <Image
              src={FormHeaderImage}
              className="rounded-full w-40 h-40 my-5"
              alt=""
              priority
            />
          </div>
          <div className="w-full font-semibold text-2xl text-center my-2">
            Blast Off Again!
            <br />
            Create Your New Password!
          </div>
          <div className="w-full px-10 mt-10">
            <Form {...form}>
              <form id="resetPassForm" onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="new_password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <input
                          {...form}
                          type="password"
                          className="flex border border-black-400 rounded-lg w-full min-h-10 py-2 px-5 my-2"
                          name="reset-password"
                          id="resetPassword"
                          placeholder="Create New Password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirm_password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <input
                          {...form}
                          type="password"
                          className="flex border border-black-400 rounded-lg w-full min-h-10 py-2 px-5 my-2"
                          name="confirm-reset-password"
                          id="confirmResetPassword"
                          placeholder="Confirm Password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="w-full flex justify-center mt-5 mb-3">
                  <Button
                    type="submit"
                    id="resetPassButton"
                    loading={form.formState.isSubmitting}
                    className="w-full text-white rounded-lg py-2"
                  >
                    Reset Password
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
