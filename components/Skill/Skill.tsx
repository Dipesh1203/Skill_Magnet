import React from "react";
import * as motion from "framer-motion/client";

interface SkillProps {
  data: {
    skills: string[]; // Skill name only
  };
}

const Skill: React.FC<SkillProps> = ({ data }) => {
  const { skills } = data;

  return (
    <section className="relative flex flex-col items-center justify-between mt-12 bg-white dark:bg-slate-900 backdrop-blur-lg bg-opacity-30 rounded-lg px-6 py-12 sm:px-12 lg:px-24 z-10">
      <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-8 text-center">
        My Skills
      </h1>

      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 w-full max-w-4xl">
        {skills && skills.length > 0 ? (
          skills.map((skill, index) => (
            <li key={index} className="flex flex-col items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-[2px] block w-full"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 dark:from-blue-700 dark:to-blue-900 rounded-lg" />
                <div className="flex flex-col items-center justify-center px-4 py-4 bg-slate-100 dark:bg-slate-800 border border-transparent rounded-lg relative transition duration-300 hover:bg-transparent hover:border-blue-500 dark:hover:border-blue-300">
                  <span className="text-xl font-semibold text-slate-900 dark:text-white">
                    {skill}
                  </span>
                </div>
              </motion.button>
            </li>
          ))
        ) : (
          <li className="text-slate-900 dark:text-white text-lg">
            No skills added yet.
          </li>
        )}
      </ul>
    </section>
  );
};

export default Skill;
