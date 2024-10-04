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
    console.log("Attempting to fetch all user profiles");
    profiles = await getAllUserProfiles();
  } catch (error) {
    console.error("Error in AllUserProfiles component:", error);
    return (
      <div className="bg-gradient-to-r from-gray-900 to-black min-h-screen p-8 text-white">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Welcome to Skill Magnet</h1>
          <p className="text-lg mb-6">
            Discover and showcase your skills like never before. Create your
            dynamic portfolio and connect with industry professionals.
          </p>
          <Link href="/api/auth/signin">
            <Button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg">
              Sign In to Get Started
            </Button>
          </Link>
        </div>

        <section className="my-12">
          <h2 className="text-4xl font-semibold mb-8 text-center">
            What Our Users Say
          </h2>
          <div className="flex flex-wrap justify-center gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-800 text-gray-200 rounded-lg shadow-lg p-6 max-w-sm w-full"
              >
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 bg-gray-600 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={64}
                      height={64}
                      className="object-cover"
                    />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-bold">{testimonial.name}</h3>
                    <p className="text-gray-400">{testimonial.headline}</p>
                  </div>
                </div>
                <p className="text-gray-300">{testimonial.intro}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="text-center mt-12">
          <h2 className="text-4xl font-semibold mb-6">
            Ready to Showcase Your Skills?
          </h2>
          <p className="text-lg mb-6">
            After signing in, create your profile to start sharing your
            achievements and projects. Let the world see what you can do!
          </p>
          <Link href="/profile/new">
            <Button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg">
              Create Your Profile
            </Button>
          </Link>
        </section>
      </div>
    );
  }
  if (!profiles || profiles.length === 0) {
    return (
      <div className="bg-gradient-to-r from-gray-900 to-black min-h-screen p-8 text-white">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Welcome to Skill Magnet</h1>
          <p className="text-lg mb-6">
            Discover and showcase your skills like never before. Create your
            dynamic portfolio and connect with industry professionals.
          </p>
          <Link href="/api/auth/signin">
            <Button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg">
              Sign In to Get Started
            </Button>
          </Link>
        </div>

        <section className="my-12">
          <h2 className="text-4xl font-semibold mb-8 text-center">
            What Our Users Say
          </h2>
          <div className="flex flex-wrap justify-center gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-800 text-gray-200 rounded-lg shadow-lg p-6 max-w-sm w-full"
              >
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 bg-gray-600 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={64}
                      height={64}
                      className="object-cover"
                    />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-bold">{testimonial.name}</h3>
                    <p className="text-gray-400">{testimonial.headline}</p>
                  </div>
                </div>
                <p className="text-gray-300">{testimonial.intro}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="text-center mt-12">
          <h2 className="text-4xl font-semibold mb-6">
            Ready to Showcase Your Skills?
          </h2>
          <p className="text-lg mb-6">
            After signing in, create your profile to start sharing your
            achievements and projects. Let the world see what you can do!
          </p>
          <Link href="/profile/new">
            <Button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg">
              Create Your Profile
            </Button>
          </Link>
        </section>
      </div>
    );
  }
  return (
    <div className="bg-gradient-to-r from-gray-900 to-black min-h-screen p-8 text-white">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4">Welcome to Skill Magnet</h1>
        <p className="text-lg mb-6">
          Discover and showcase your skills like never before. Create your
          dynamic portfolio and connect with industry professionals.
        </p>
        <Link href="/api/auth/signin">
          <Button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg">
            Sign In to Get Started
          </Button>
        </Link>
      </div>

      <section className="my-12">
        <h2 className="text-4xl font-semibold mb-8 text-center">
          What Our Users Say
        </h2>
        <div className="flex flex-wrap justify-center gap-8">
          {profiles.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-800 text-gray-200 rounded-lg shadow-lg p-6 max-w-sm w-full"
            >
              <div className="flex items-center mb-4">
                <div className="w-25 h-25 bg-gray-600 rounded-full overflow-hidden">
                  {testimonial.image ? (
                    <img src={testimonial.image} alt="" />
                  ) : (
                    <img src="/public/assets/profileicon.jpg" alt="" />
                  )}
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-bold">{testimonial.name}</h3>
                  <p className="text-gray-400">{testimonial.headline}</p>
                </div>
              </div>
              <p className="text-gray-300">{testimonial.intro}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="text-center mt-12">
        <h2 className="text-4xl font-semibold mb-6">
          Ready to Showcase Your Skills?
        </h2>
        <p className="text-lg mb-6">
          After signing in, create your profile to start sharing your
          achievements and projects. Let the world see what you can do!
        </p>
        <Link href="/profile/new">
          <Button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg">
            Create Your Profile
          </Button>
        </Link>
      </section>
    </div>
  );
};

export default Home;
