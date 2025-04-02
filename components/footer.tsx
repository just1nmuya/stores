import Link from "next/link"

const Footer = () => {
  return (
    <footer className="bg-black py-6 text-white">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link href="/" className="text-xs uppercase tracking-wider font-normal">
              Stores
            </Link>
          </div>
          
          <div className="flex space-x-8">
            <Link href="/info" className="text-xs uppercase tracking-wider hover:opacity-70 transition-opacity">
              Info
            </Link>
            <Link href="https://instagram.com" className="text-xs uppercase tracking-wider hover:opacity-70 transition-opacity">
              Instagram
            </Link>
            <Link href="mailto:info@stores.com" className="text-xs uppercase tracking-wider hover:opacity-70 transition-opacity">
              Contact
            </Link>
          </div>
          
          <div className="mt-4 md:mt-0">
            <p className="text-xs text-gray-400">
              © {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
