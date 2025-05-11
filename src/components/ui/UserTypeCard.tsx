import Link from "next/link";

interface UserTypeCardProps {
  title: string;
  description: string;
  buttonText: string;
  icon: React.ReactNode;
  href: string;
}

export default function UserTypeCard({
  title,
  description,
  buttonText,
  icon,
  href,
}: UserTypeCardProps) {
  return (
    <div className="relative flex-1">
      <div className="absolute -bottom-4 left-1/2 h-4 w-3/4 -translate-x-1/2 rounded-full bg-[#00c896]/20 blur-md"></div>

      <div className="relative flex h-full flex-col items-center justify-center rounded-2xl border border-[#00c896]/20 bg-white p-8 pt-12 shadow-[0_0_15px_rgba(0,200,150,0.15)] transition-all hover:shadow-[0_0_20px_rgba(0,200,150,0.25)]">
        <div className="mb-6 rounded-full bg-gray-100 p-4">{icon}</div>

        <h2 className="mb-4 text-2xl font-bold text-gray-800">{title}</h2>

        <p className="mb-8 text-center text-gray-600">{description}</p>

        <Link
          href={href}
          className="mt-auto w-full rounded-lg bg-gradient-to-r from-[#457bed] to-[#3a6bd6] px-6 py-3 text-center font-medium text-white transition-all hover:from-[#3a6bd6] hover:to-[#457bed]"
        >
          {buttonText}
        </Link>
      </div>
    </div>
  );
}
