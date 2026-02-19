import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export const registerSchema = z.object({
  name: z.string().min(1, 'Name is required').min(2, 'Name must be at least 2 characters'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
})

export const profileSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  phone: z.string().optional(),
  degree: z.string().min(1, 'Degree is required'),
  university: z.string().min(1, 'University is required'),
  field: z.string().min(1, 'Field of study is required'),
  gpa: z.number().min(0).max(4).optional(),
  graduationYear: z.number().min(2000).max(2030).optional(),
})

export const educationSchema = z.object({
  degree: z.string().min(1, 'Degree is required'),
  university: z.string().min(1, 'University is required'),
  field: z.string().min(1, 'Field is required'),
  gpa: z.number().min(0).max(4).optional(),
  graduationYear: z.number().min(2000).max(2030),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
})

export const experienceSchema = z.object({
  company: z.string().min(1, 'Company is required'),
  position: z.string().min(1, 'Position is required'),
  duration: z.string().min(1, 'Duration is required'),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  description: z.string().optional(),
})

export const skillsSchema = z.object({
  skills: z.array(z.string()).min(1, 'Add at least one skill'),
})
