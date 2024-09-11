import { z } from "zod";

const schema = z.object({
  email: z.string(),
  name: z.string().min(3),
});

export default schema;
