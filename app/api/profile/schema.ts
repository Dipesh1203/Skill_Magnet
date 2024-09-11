import { z } from "zod";

const ProfileSchema = z.object({
  name: z.string(),
  userName: z.string(),
  email: z.string().email(),
  image: z.string().optional(),
  headline: z.string().min(5).max(50),
  intro: z.string().min(5).max(100),
  skills: z.array(z.string()).optional(),
  projects: z.array(z.string()).optional(), // Assuming ObjectId is represented as a string
  owner: z.string().optional(), // Assuming ObjectId is represented as a string
});

// You can also create a type from this schema
type Profile = z.infer<typeof ProfileSchema>;

// If you want to include the _id field that MongoDB adds:
const ProfileWithIdSchema = ProfileSchema.extend({
  _id: z.string(),
});

type ProfileWithId = z.infer<typeof ProfileWithIdSchema>;

export default ProfileSchema;
