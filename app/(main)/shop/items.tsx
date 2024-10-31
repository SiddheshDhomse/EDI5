"use client";

import { toast } from "sonner";
import Image from "next/image";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { refillHearts } from "@/actions/user-progress";

export const POINTS_TO_REFILL = 10; // Define the constant for points required to refill hearts

type Props = {
  hearts: number;
  points: number;
  hasActiveSubscription: boolean;
};

export const Items = ({
  hearts,
  points,
}: Props) => {
  const [pending, startTransition] = useTransition();

  // Function to handle refilling hearts
  const onRefillHearts = () => {
    if (hearts < 5 && points >= POINTS_TO_REFILL) {
      startTransition(() => {
        refillHearts()
          .then(() => toast.success("Hearts refilled!"))
          .catch(() => toast.error("Something went wrong"));
      });
    }
  };

  // Function to handle upgrading subscription


  return (
    <ul className="w-full">
      <div className="flex items-center w-full p-4 gap-x-4 border-t-2">
        <Image 
          src="/heart.svg"
          alt="Heart"
          height={60}
          width={60}
        />
        <div className="flex-1">
          <p className="text-neutral-700 text-base lg:text-xl font-bold">
            Refill hearts
          </p>
        </div>
        <Button
          onClick={onRefillHearts}
          disabled={
            pending || hearts === 5 || points < POINTS_TO_REFILL
          }
        >
          {hearts === 5
            ? "full"
            : (
              <div className="flex items-center">
                <Image
                  src="/points.svg"
                  alt="Points"
                  height={20}
                  width={20}
                />
                <p>{POINTS_TO_REFILL}</p>
              </div>
            )
          }
        </Button>
      </div>
    </ul>
  );
};
