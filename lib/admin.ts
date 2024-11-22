import { auth,  } from "@clerk/nextjs/server";

const adminIds = [
  "user_2nHp6VzO5KUg27XnCfEQo3kXpKm",
  "user_2oChApcWnpLqgPU2cHaN2r9cUaf"
];

export const isAdmin = () => {
  const { userId } = auth();

  if (!userId) {
    return false;
  }

  return adminIds.indexOf(userId) !== -1;
};
