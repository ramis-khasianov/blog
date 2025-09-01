import { z } from "zod";

export const SignInSchema = z.object({
  email: z.email({ message: "Please provide a valid email address." }),

  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long. " })
    .max(100, { message: "Password cannot exceed 100 characters." }),
});

export const SignUpSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: "Name is required." })
      .max(50, { message: "Name cannot exceed 50 characters." })
      .regex(/^[a-zA-Z\s]+$/, {
        message: "Name can only contain letters and spaces.",
      }),

    email: z.email({ message: "Please provide a valid email address." }),

    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long." })
      .max(100, { message: "Password cannot exceed 100 characters." })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter.",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter.",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number." })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Password must contain at least one special character.",
      }),

    passwordConfirmation: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"], // Associates the error with the confirmPassword field
  });

export const AskQuestionSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Title is required." })
    .max(100, { message: "Title cannot exceed 100 characters." }),

  content: z.string().min(1, { message: "Body is required." }),
  tags: z
    .array(
      z
        .string()
        .min(1, { message: "Tag is required." })
        .max(30, { message: "Tag cannot exceed 30 characters." })
    )
    .min(1, { message: "At least one tag is required." })
    .max(3, { message: "Cannot add more than 3 tags." }),
});
