import getCurrentUser from "@/actions/getCurrentUser";
import VpaaRegisterForm from "./VpaaRegisterForm";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "VPAA Registration - Thesis Archive Management System",
};

const VpaaRegisterPage = async () => {
  const currentUser = await getCurrentUser();

  // If user is logged in and is VPAA, redirect to VPAA dashboard
  if (currentUser && currentUser.role === "VPAA") {
    redirect("/vpaa");
  }
  
  // If user is logged in but not VPAA, redirect to home
  if (currentUser) {
    redirect("/");
  }

  return <VpaaRegisterForm />;
};

export default VpaaRegisterPage;