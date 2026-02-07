import { Metadata } from "next";
import getCurrentUser from "@/actions/getCurrentUser";
import VpaaLoginForm from "./VpaaLoginForm";

export const metadata: Metadata = {
  title: "VPAA Login - Thesis Archive Management System",
};

const VpaaLogin = async () => {
  const currentUser = await getCurrentUser();
  
  return (
    <div className="min-h-screen">
      <VpaaLoginForm currentUser={currentUser} />
    </div>
  );
};

export default VpaaLogin;