import { auth,  } from "@clerk/nextjs/server";

const adminIds = [
  "user_2nHp6VzO5KUg27XnCfEQo3kXpKm",
];

export const isAdmin = () => {
  const { userId } = auth();

  if (!userId) {
    return false;
  }

  return adminIds.indexOf(userId) !== -1;
};
