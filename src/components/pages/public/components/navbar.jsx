import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-[#F2ECE1] p-4 shadow-md font-['Comic_Sans_MS',_'Chalkboard_SE',_'Comic_Neue',_sans-serif]">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Image src="../public/img/logoSinFondo.png" alt="PAM Logo" width={50} height={50} />
          <span className="text-[#222216] font-bold text-xl">Pet Adoption Management</span>
        </div>
        <div className="hidden md:flex space-x-4">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/profile">Profile</NavLink>
          <NavLink href="/auth">Login / Register</NavLink>
          <DropdownLink />
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-[#222216]">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden mt-2 space-y-2">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/profile">Profile</NavLink>
          <NavLink href="/auth">Login / Register</NavLink>
          <DropdownLink />
        </div>
      )}
    </nav>
  )
}

function NavLink({ href, children }) {
  return (
    <Link href={href} className="text-[#222216] hover:text-[#A66734] font-medium block py-2 px-4 rounded transition duration-300 ease-in-out hover:bg-[#E9B5BE]">
      {children}
    </Link>
  )
}

function DropdownLink() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-[#222216] hover:text-[#A66734] font-medium py-2 px-4 rounded transition duration-300 ease-in-out hover:bg-[#E9B5BE] focus:outline-none"
      >
        Organizations
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
          <Link href="/org1" className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#E9B5BE]">Organization 1</Link>
          <Link href="/org2" className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#E9B5BE]">Organization 2</Link>
          <Link href="/org3" className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#E9B5BE]">Organization 3</Link>
        </div>
      )}
    </div>
  )
}