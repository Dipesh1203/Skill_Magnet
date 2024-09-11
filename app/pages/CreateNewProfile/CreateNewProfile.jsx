import React, { useState } from "react";
import { TextField, Chip, Button, Box } from "@mui/material";
import styles from "./CreateNewProfile.module.css";
import axios from "axios";

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
const CreateNewProfile = () => {
  const [formData, setFormData] = useState({
    name: "",
    userName: "",
    email: "",
    headline: "",
    intro: "",
    skills: [],
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSkillsChange = (newSkills) => {
    setFormData({
      ...formData,
      skills: newSkills,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(data);
      let res = await axios.post("/api/profile/new", data);
      console.log(res);
      navigate(`/home`);
    } catch (error) {
      console.error("error", error);
    }
    console.log(formData);
  };
  return (
    <div className={styles.main}>
      <div className={styles.form}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ maxWidth: 900, margin: "auto", mt: 7 }}
        >
          <h2>Create Profile</h2>
          <TextField
            fullWidth
            margin="normal"
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="User Name"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Headline"
            name="headline"
            value={formData.headline}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />{" "}
          <SkillsInput
            skills={formData.skills}
            setSkills={handleSkillsChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Introduction"
            name="intro"
            multiline
            rows={4}
            value={formData.intro}
            onChange={handleChange}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Create Profile
          </Button>
        </Box>
      </div>
    </div>
  );
};

export default CreateNewProfile;
