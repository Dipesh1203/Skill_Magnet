import React, { useState } from "react";
import { TextField, Chip, Box } from "@mui/material";

function SkillsInput({ skills, setSkills }) {
  const [currentSkill, setCurrentSkill] = useState("");

  const handleAddSkill = (e) => {
    if (e.key === "Enter" && currentSkill.trim()) {
      e.preventDefault();
      setSkills([...skills, currentSkill.trim()]);
      setCurrentSkill("");
    }
  };

  const handleDeleteSkill = (skillToDelete) => {
    setSkills(skills.filter((skill) => skill !== skillToDelete));
  };

  return (
    <Box>
      <TextField
        fullWidth
        label="Skills"
        value={currentSkill}
        onChange={(e) => setCurrentSkill(e.target.value)}
        onKeyPress={handleAddSkill}
        placeholder="Type a skill and press Enter"
        margin="normal"
      />
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
        {skills.map((skill) => (
          <Chip
            key={skill}
            label={skill}
            onDelete={() => handleDeleteSkill(skill)}
          />
        ))}
      </Box>
    </Box>
  );
}
