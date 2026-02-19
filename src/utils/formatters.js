import { format, formatDistanceToNow, differenceInDays } from 'date-fns'

export const formatDate = (date) => {
  if (!date) return 'N/A'
  try {
    return format(new Date(date), 'MMM dd, yyyy')
  } catch {
    return date
  }
}

export const formatDateShort = (date) => {
  if (!date) return 'N/A'
  try {
    return format(new Date(date), 'MM/dd/yyyy')
  } catch {
    return date
  }
}

export const formatDeadline = (deadline) => {
  if (!deadline) return 'N/A'
  try {
    const deadlineDate = new Date(deadline)
    const today = new Date()
    const daysLeft = differenceInDays(deadlineDate, today)
    
    if (daysLeft < 0) {
      return 'Expired'
    } else if (daysLeft === 0) {
      return 'Due today'
    } else if (daysLeft === 1) {
      return '1 day left'
    } else if (daysLeft < 7) {
      return `${daysLeft} days left`
    } else if (daysLeft < 30) {
      const weeks = Math.floor(daysLeft / 7)
      return `${weeks} week${weeks > 1 ? 's' : ''} left`
    } else {
      return format(deadlineDate, 'MMM dd, yyyy')
    }
  } catch {
    return deadline
  }
}

export const formatCurrency = (amount) => {
  if (!amount) return 'N/A'
  return amount
}

export const formatGPA = (gpa) => {
  if (!gpa) return 'N/A'
  return gpa.toFixed(1)
}

export const formatRelativeTime = (date) => {
  if (!date) return 'N/A'
  try {
    return formatDistanceToNow(new Date(date), { addSuffix: true })
  } catch {
    return date
  }
}

export const formatArrayToString = (arr, separator = ', ') => {
  if (!arr || !Array.isArray(arr)) return ''
  return arr.join(separator)
}

export const truncateText = (text, maxLength = 100) => {
  if (!text) return ''
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

export const capitalizeFirst = (str) => {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const calculateMatchScore = (userProfile, scholarship) => {
  if (!userProfile || !scholarship) return 0
  
  // Check if profile has any real data
  const hasProfileData = (
    (userProfile.fieldOfStudy && userProfile.fieldOfStudy.length > 0) ||
    (userProfile.education && userProfile.education.length > 0) ||
    (userProfile.experience && userProfile.experience.length > 0) ||
    (userProfile.skills && userProfile.skills.length > 0) ||
    (userProfile.targetCountries && userProfile.targetCountries.length > 0) ||
    (userProfile.gpa && userProfile.gpa > 0)
  )
  
  if (!hasProfileData) return 0

  const weights = {
    field: 0.30,
    gpa: 0.20,
    experience: 0.15,
    country: 0.20,
    language: 0.15,
  }

  const userFields = userProfile.fieldOfStudy || []
  const scholarshipFields = scholarship.fieldOfStudy || []
  
  let fieldScore = userFields.some((uf) =>
    scholarshipFields.some((sf) => 
      uf.toLowerCase().includes(sf.toLowerCase()) || 
      sf.toLowerCase().includes(uf.toLowerCase())
    )
  ) ? 100 : 40

  const userGPA = userProfile.gpa || 0
  const minGPA = scholarship.minGPA || 0
  let gpaScore = userGPA >= minGPA ? 100 : Math.max(50, (userGPA / minGPA) * 80)

  const userExperience = userProfile.experience || []
  let experienceScore = userExperience.length > 0 ? 90 : 60

  const userCountries = userProfile.targetCountries || []
  let countryScore = userCountries.includes(scholarship.country) ? 100 : 
    userCountries.length > 0 ? 60 : 80

  let languageScore = 95
  if (scholarship.ieltsRequired && userProfile.englishLevel === 'beginner') {
    languageScore = 50
  } else if (scholarship.ieltsRequired) {
    languageScore = 85
  }

  const total =
    (fieldScore * weights.field) +
    (gpaScore * weights.gpa) +
    (experienceScore * weights.experience) +
    (countryScore * weights.country) +
    (languageScore * weights.language)

  return Math.round(Math.min(100, Math.max(0, total)))
}
