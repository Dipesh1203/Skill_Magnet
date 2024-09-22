import React from "react";
import Image from "next/image";
import * as motion from "framer-motion/client";
import aboutImage from "./../../../public/assets/about/aboutImage.png";
import { LampContainer } from "@/components/ui/lamp";

interface SkillProps {
  data: {
    skills: string[];
  };
}

const Skill: React.FC<SkillProps> = ({ data }) => {
  const { skills } = data;

  return (
    <section className="relative flex flex-col items-center justify-between mt-12 bg-custom_dark1 backdrop-blur-lg bg-opacity-30 rounded-lg mx-4 sm:mx-8 md:mx-16 lg:mx-24 xl:mx-32 z-10 h-auto">
      <LampContainer>
        <motion.h1
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="mt-0 bg-gradient-to-br from-slate-300 to-slate-500 py-1 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
        >
          Expertise
        </motion.h1>
      </LampContainer>
      <div className="flex flex-col md:flex-row justify-between items-center w-auto rounded-lg py-[5rem] h-auto gap-8">
        <div className="w-full md:w-1/2 flex justify-center">
          <Image src={aboutImage} alt="About" className="w-3/4 animate-float" />
        </div>
        <div className="w-full md:w-1/2 flex flex-col items-start justify-center bg-gradient-to-r from-custom_dark2 to-custom_dark1 h-auto rounded-lg p-8 text-white">
          <ul className="space-y-4 text-xl">
            {skills && skills.length > 0 ? (
              skills.map((skill, index) => (
                <li key={index}>
                  <button className="p-[3px] relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-custom_light2 to-custom_light rounded-lg" />
                    <div className="px-8 py-2  bg-[#172554] rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
                      {skill}
                    </div>
                  </button>
                </li>
              ))
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
