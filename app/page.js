import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Home = () => {
  const {data:session} = useSession();

  if(!session) {
    return(
      <>
        <h1>Hello</h1>
      </>
    )
  }
  

export default Home