"use client";

import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import SignInButton from "./SignInButton";

const AuthButton = () => {
  return (
    <>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        {/*
          This is Clerk's built-in UserButton. It's highly customizable
          to match your site's theme.
          Docs: https://clerk.com/docs/components/user-button
        */}
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              // This makes the avatar size similar to your other icons
              userButtonAvatarBox: {
                width: "2.25rem",
                height: "2.25rem",
              },
            },
          }}
        />
      </SignedIn>
    </>
  );
};

export default AuthButton;
