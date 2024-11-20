import { Button } from "@/components/ui/button";
import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
} from "@clerk/nextjs";
import { Loader } from "lucide-react"; 
import Image from "next/image";
import Link from "next/link"; 

export default function Home() {
  return (
    <div className="max-w-[988px] mx-auto flex-1 w-full flex flex-col lg:flex-row items-center justify-center p-4 gap-4">
      <div className="relative w-[240px] h-[240px] lg:w-[424px] mb-8 lg:mb-0">
        <Image src="/hero.jpg" fill alt="hero" className="object-cover" /> 
      </div>

      <div className="flex flex-col items-center gap-y-3 max-width-[330px] w-full ">
        <h1 className="text-xl lg:text-3xl font-bold text-neutral-600 max-w-[480px] text-center lg:text-left">
          Learn, Practice, and Master
        </h1>

        <ClerkLoading>
          <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
        </ClerkLoading>

        <ClerkLoaded>
          <SignedOut>
            {/* Sign Up Button */}
            <SignUpButton mode="modal">
              <Button size="lg" variant="secondary" className="w-full">
                Get Started
              </Button>
            </SignUpButton>

            {/* Sign In Button */}
            <SignInButton mode="modal">
              <Button size="lg" variant="primaryOutline" className="w-full">
                I already have an account
              </Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            {/* Continue Learning Button */}
            <Link href="/learn" passHref>
              <Button size="lg" variant="secondary" className="w-full">
                Continue Learning
              </Button>
            </Link>
          </SignedIn>
        </ClerkLoaded>
      </div>
    </div>
  );
}
