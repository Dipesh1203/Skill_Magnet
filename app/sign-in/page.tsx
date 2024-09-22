"use client";
import { useSession, signIn, signOut } from "next-auth/react";

export default function AuthComponent() {
  const { data: session } = useSession();

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-bg to-customBack_primary">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-white w-full max-w-sm">
        {session ? (
          <>
            <h1 className="text-2xl font-bold mb-4">Welcome</h1>
            <p className="mb-4">
              Signed in as{" "}
              <span className="font-medium text-customBack_primary_1">
                {session.user.email}
              </span>
            </p>
            <button
              onClick={() => signOut()}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition-colors duration-300"
            >
              Sign out
            </button>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-4">Not signed in</h1>
            <button
              onClick={() => signIn()}
              className="w-full bg-[#576CBC] hover:bg-[#4a5d9b] text-white py-2 px-4 rounded-lg transition-colors duration-300"
            >
              Sign in
            </button>
          </>
        )}
      </div>
    </div>
  );
}
