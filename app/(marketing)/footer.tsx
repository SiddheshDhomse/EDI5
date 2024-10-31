import { Button } from "@/components/ui/button";
import Image from "next/image";

export const Footer = () => {
    return(
        <footer className=" lg:block h-20 w-full border-t-2 border-slate-200 p-2">
            <div className="max-w-screen-lg mc-auto flex items-center justify-evenly h-full">
            <Button size ="lg" variant="ghost" className="w-full">
                <Image src="/hr.svg" alt="flag" height={32} width={40} mr-4 rounded-md/>
                Club 1 Logo
            </Button>

            <Button size ="lg" variant="ghost" className="w-full">
                <Image src="/hr.svg" alt="flag" height={32} width={40} mr-4 rounded-md/>
                Club 2 Logo
            </Button>

            <Button size ="lg" variant="ghost" className="w-full">
                <Image src="/hr.svg" alt="flag" height={32} width={40} mr-4 rounded-md/>
                Club 3 Logo
            </Button>

            <Button size ="lg" variant="ghost" className="w-full">
                <Image src="/hr.svg" alt="flag" height={32} width={40} mr-4 rounded-md/>
                Club 4 Logo
            </Button>

            <Button size ="lg" variant="ghost" className="w-full">
                <Image src="/hr.svg" alt="flag" height={32} width={40} mr-4 rounded-md/>
                Club 5 Logo
            </Button>
            </div>
        </footer>
    )
}