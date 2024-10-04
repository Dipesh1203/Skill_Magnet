import React from "react";
import * as motion from "framer-motion/client";

interface SkillProps {
  data: {
    skills: string[];
  };
}

const Skill: React.FC<SkillProps> = ({ data }) => {
  const { skills } = data;

  return (
    <section className="relative flex flex-col items-center justify-between mt-12 bg-slate-400 backdrop-blur-lg bg-opacity-30 rounded-lg px-6 py-12 sm:px-12 lg:px-24 z-10">
      <h1 className="text-4xl md:text-5xl font-extrabold text-customBack_primary mb-8 text-center">
        My Skills
      </h1>

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl">
        {skills && skills.length > 0 ? (
          skills.map((skill, index) => (
            <li key={index} className="text-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-[3px] block"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-custom_light2 to-custom_light rounded-lg" />
                <div className="px-6 py-3 bg-custom_dark1 border border-transparent rounded-lg relative group transition duration-300 hover:border-custom_light hover:bg-transparent">
                  <span className="text-xl text-white font-semibold group-hover:text-white">
                    {skill}
                  </span>
                </div>
              </motion.button>
            </li>
          ))
        ) : (
          <li className="text-white text-lg">No skills added yet.</li>
        )}
      </ul>
    </section>
  );
};

export default Skill;
