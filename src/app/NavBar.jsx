import Image from 'next/image';
import Link from 'next/link';
const NavBar = () => {
  return (
    <nav className="w-full h-[100px] bg-opacity-50 flex content-between justify-between align-middle px-2 ">
      <Link href="/jams">
        <Image
          src="/images/JamSync3.png" // Path to the logo in the public folder
          alt="JamSync Logo"
          width={120} // Adjust the width as per your needs
          height={60} // Adjust the height as per your needs
        />
      </Link>

      <div className="flex items-center gap-6 ">
        <button className="text-white font-semibold text-lg hover:text-gray-300 transition-colors">
          Login
        </button>
        <button className="text-white font-semibold text-lg hover:text-gray-300 transition-colors">
          Sign up
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
