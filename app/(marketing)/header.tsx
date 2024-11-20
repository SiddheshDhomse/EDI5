import { Loader } from "lucide-react";
import Image from "next/image";
import {
    ClerkLoaded,
    ClerkLoading,
    SignedIn,
    SignedOut,
    SignInButton,
    UserButton,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export const Header = () => {
    return (
        <header className="h-20 w-full border-b-2 border-slate-200 px-4px">
            <div className="lg:max-w-screen-lg mx-auto flex item-center justify-between h-full">
                <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
                    <Image
                        src="/1725474365901-removebg-preview.png"
                        height={40}
                        width={40}
                        alt="Mascot"
                    />
                    <h1 className="text-2xl font-bold text-green-600 tracking-wide">
EduQuest                    </h1>
                </div>
                <ClerkLoading>
                    <Loader className="h-5 w-5 text-muted-foreground animated-spin" />
                </ClerkLoading>
                <ClerkLoaded>
                    <SignedIn>
                        <UserButton afterSignOutUrl="/" />
                    </SignedIn>
                    <SignedOut>
                        <SignInButton
                            mode="modal"
                             // Corrected property
                        >
                            <Button size="lg" variant="ghost">
                                Login
                            </Button>
                        </SignInButton>
                    </SignedOut>
                </ClerkLoaded>
            </div>
        </header>
    );
};
