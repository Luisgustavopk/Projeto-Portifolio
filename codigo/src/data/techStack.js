
const LOGO_BASE = 'https://raw.githubusercontent.com/ln-dev7/logos-apps/master/logos'

export const techStack = [
  { name: 'Spring Boot', slug: 'spring' },
  { name: 'React', slug: 'react' },
  { name: 'Node.js', slug: 'nodejs' },
  { name: 'Python', slug: 'python' },
  { name: 'Java', slug: 'java' },
]

export function logoUrl(slug) {
  return `${LOGO_BASE}/${slug}.svg`
}
