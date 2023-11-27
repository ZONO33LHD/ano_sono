import Link from "next/link";
import Image from "next/image";
import ano_sono_icon from "../../../public/ano_sono_icon.svg";

export function NavBar() {
  return (
    <nav className="navbar-container bg-gray-800 text-white p-4">
      <div className="text-2xl font-bold flex items-center">
        <Link href="/">
          <div style={{ position: "relative", width: "80px", height: "80px" }}>
<Image
  src={ano_sono_icon}
  alt="ano_sono"
  layout="responsive"
  objectFit="contain"
/>          </div>
        </Link>
        <Link href="/" className="ml-8 mr-4 hover:text-gray-300">
          Home
        </Link>
        <Link href="/about" className="mr-4 hover:text-gray-300">
          About
        </Link>
        <Link href="/preference" className="hover:text-gray-300">
          Preference
        </Link>
      </div>
    </nav>
  );
}