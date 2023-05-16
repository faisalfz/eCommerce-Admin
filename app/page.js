'use client'

import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useState, useEffect } from "react";
import Image from "next/image";
import Nav from "@/components/Nav";

const Home = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };

    setUpProviders();
  }, []);

  console.log(session, "Hello")


  if (!session) {
    return (
      <>
        <div className="w-full h-screen flex justify-center items-center bg-blue-900">
          <div className="text-center w-full">
          {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="p-4 bg-white text-black text-2xl rounded-2xl font-medium"
                >
                  SignIn with Google
                </button>
              ))}
              
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="whole-page flex flex-grow-1 bg-blue-700" >
        <Nav />
        <div className="bg-slate-100 w-full h-screen content-part mt-2 px-8 py-4 rounded-xl">
        <h2>Welcome to {session.user.name}</h2>
        <p>Signed In as {session.user.email}</p>
        <Image src={session.user.image} width={60} height={60} alt="Hello" className="rounded-full" />
        </div>
        </div>
      </>
    );
  }
};

export default Home;
