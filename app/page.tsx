import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface TestimonialProfile {
  name: string;
  headline: string;
  intro: string;
  image: string;
}

interface UserProfile {
  _id: string;
  name: string;
  userName: string;
  email: string;
  image: string;
  headline: string;
  intro: string;
  skills: string[];
  projects: any[]; // You might want to define a more specific type for projects
}

async function getAllUserProfiles(): Promise<UserProfile[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  const url = new URL("/api/profile/all", apiUrl);

  console.log(`Fetching all profiles from: ${url.toString()}`);

  try {
    const res = await fetch(url.toString(), {
      next: { revalidate: 60 },
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorBody = await res.text();
      console.error(`HTTP error! status: ${res.status}, body: ${errorBody}`);
      throw new Error(`Failed to fetch user profiles: ${res.statusText}`);
    }

    const data = await res.json();
    console.log("Fetched profiles data:", data);
    return data;
  } catch (error) {
    console.error("Error in getAllUserProfiles:", error);
    throw error;
  }
}

const testimonials: TestimonialProfile[] = [
  {
    name: "Jane Doe",
    headline: "Creative Designer",
    intro:
      "Jane is a passionate designer who loves creating visually stunning designs and user experiences.",
    image: "/images/jane.jpg",
  },
  {
    name: "John Smith",
    headline: "Full Stack Developer",
    intro:
      "John is a versatile developer with expertise in both frontend and backend technologies.",
    image: "/images/john.jpg",
  },
  {
    name: "Emily Johnson",
    headline: "Product Manager",
    intro:
      "Emily excels in managing product lifecycles and ensuring top-notch user satisfaction.",
    image: "/images/emily.jpg",
  },
];

const Home = async () => {
  let profiles: UserProfile[];

  try {
    profiles = await getAllUserProfiles();
  } catch (error) {
    console.error("Error in AllUserProfiles component:", error);
    profiles = [];
  }

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            Welcome to Skill Magnet
          </h1>
          <p className="text-xl mb-8 text-gray-600 dark:text-gray-300">
            Discover and showcase your skills like never before. Create your
            dynamic portfolio and connect with industry professionals.
          </p>
          <Link href="/api/auth/signin">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md transition duration-300 text-lg">
              Sign In to Get Started
            </Button>
          </Link>
        </div>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-10 text-center">
            What Our Users Say
          </h2>
          <div className="flex flex-wrap justify-center gap-8">
            {(profiles.length > 0 ? profiles : testimonials).map(
              (testimonial, index) => (
                <div
                  key={index}
                  className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-300"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <Image
                        src={
                          testimonial.image || "/public/assets/profileicon.jpg"
                        }
                        alt={testimonial.name}
                        width={64}
                        height={64}
                        className="object-cover"
                      />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-semibold">
                        {testimonial.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {testimonial.headline}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    {testimonial.intro}
                  </p>
                </div>
              )
            )}
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-3xl font-semibold mb-6">
            Ready to Showcase Your Skills?
          </h2>
          <p className="text-xl mb-8 text-gray-600 dark:text-gray-300">
            After signing in, create your profile to start sharing your
            achievements and projects. Let the world see what you can do!
          </p>
          <Link href="/profile/new">
            <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-md transition duration-300 text-lg">
              Create Your Profile
            </Button>
          </Link>
        </section>
      </div>
    </div>
  );
};

export default Home;
