import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";


export default function NavBar(){
    return (
        <nav className="fixed top-0 w-full flex items-center py-2 px-8 justify-between z-50 bg-slate-800 text-gray-300">
          <Link href="/"className="uppercase font-bold text-md h-12 flex items-center">
            next store
          </Link>
          <div className="flex items-center gap-8 relative">
            <div className="flex items-center cursor-pointer"> 
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="h-5 w-5" viewBox="0 0 16 16">
              <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
            </svg>
            <span className="bg-teal-600 text-sm 
            font-bold rounded-full h-5 w-5 flex items-center justify-center
            absolute left-3 bottom-5"
            >
              2
            </span>
            </div>
            <div>
            <SignedIn><UserButton/></SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="border rounded-md border-gray-400 px-3 py-2">Fazer Login</button>
              </SignInButton>
            </SignedOut>
            </div>
          </div>
        </nav>
    )
}