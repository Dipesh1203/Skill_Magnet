import React from "react";
import Image from "next/image";
import aboutImage from "./../../../public/assets/about/aboutImage.png";

interface SkillProps {
  data: {
    skills: string[];
  };
}

const Skill: React.FC<SkillProps> = ({ data }) => {
  const { skills } = data;

  return (
    <section className="relative flex flex-col items-center justify-between mt-12 bg-gray-900 backdrop-blur-lg bg-opacity-30 rounded-lg mx-4 sm:mx-8 md:mx-16 lg:mx-24 xl:mx-32 z-10">
      <h1 className="text-4xl font-semibold mt-8 mb-12 text-center text-white">
        Expertise
      </h1>
      <div className="flex flex-col md:flex-row justify-between items-center w-full px-4 py-8 gap-8">
        <div className="w-full md:w-1/2 flex justify-center">
          <Image src={aboutImage} alt="About" className="w-3/4 animate-float" />
        </div>
        <div className="w-full md:w-1/2 flex flex-col items-start justify-center bg-gradient-to-r from-blue-600/60 to-bg_primary rounded-lg p-8 text-white">
          <ul className="space-y-4 text-xl">
            {skills && skills.length > 0 ? (
              skills.map((skill, index) => <li key={index}>{skill}</li>)
            ) : (
              <li>No skills added yet.</li>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Skill;
