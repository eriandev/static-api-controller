export type CategorizableJobAtrrs = keyof Pick<Job, 'category' | 'job_type'>
export interface Job {
  id: number
  url: string
  title: string
  company_name: string
  company_logo: string
  category: string
  tags: string[]
  job_type: string
  publication_date: string
  candidate_required_location: string
  salary: string
  description: string
  company_logo_url: string
}
export interface JobsListResponse {
  '00-warning': string
  '0-legal-notice': string
  'job-count': number
  'total-job-count': number
  jobs: Job[]
}
