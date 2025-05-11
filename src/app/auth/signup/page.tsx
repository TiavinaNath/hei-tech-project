import UserTypeCard from "@/components/ui/UserTypeCard";
import { FaUser, FaTools } from "react-icons/fa";


export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-4xl space-y-8 md:space-y-0 md:flex md:space-x-8">
        <UserTypeCard
          title="Client"
          description="Trouvez les meilleurs prestataires pour vos besoins"
          buttonText="Devenir Client"
          icon={<FaUser className="text-3xl text-[#457bed]" />}
          href="signup/client"
        />

        <UserTypeCard
          title="Prestataire"
          description="Proposez vos services à une large clientèle"
          buttonText="Devenir Prestataire"
          icon={<FaTools className="text-3xl text-[#457bed]" />}
          href="signup/provider"
        />
      </div>
    </div>
  );
}