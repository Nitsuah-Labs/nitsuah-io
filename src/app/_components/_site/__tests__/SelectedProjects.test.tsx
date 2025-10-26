import React from 'react'
import { render, screen } from '@testing-library/react'
import SelectedProjects from '../SelectedProjects'

// Mock the projects data
jest.mock('../../../lib/data/projects', () => ({
  featuredProjects: [
    {
      id: 'test-project',
      title: 'Test Project',
      short: 'A test project for unit testing',
      description: 'Full description of test project',
      github: 'https://github.com/test/project',
      demo: 'https://demo.example.com',
      highlight: 'Testing, Jest, React',
      tags: ['react', 'typescript', 'jest'],
      status: 'active',
      featured: true,
    },
  ],
  Project: {},
}))

describe('SelectedProjects Component', () => {
  it('renders the section heading', () => {
    render(<SelectedProjects />)
    const heading = screen.getByRole('heading', { name: /selected projects/i })
    expect(heading).toBeInTheDocument()
  })

  it('renders the section description', () => {
    render(<SelectedProjects />)
    const description = screen.getByText(/curated collection/i)
    expect(description).toBeInTheDocument()
  })

  it('renders project cards for featured projects', () => {
    render(<SelectedProjects />)
    const projectTitle = screen.getByText('Test Project')
    expect(projectTitle).toBeInTheDocument()
  })

  it('displays project short description', () => {
    render(<SelectedProjects />)
    const shortDesc = screen.getByText('A test project for unit testing')
    expect(shortDesc).toBeInTheDocument()
  })

  it('renders GitHub link with correct href', () => {
    render(<SelectedProjects />)
    const githubLink = screen.getByRole('link', { name: /view code/i })
    expect(githubLink).toHaveAttribute('href', 'https://github.com/test/project')
  })

  it('renders demo link when demo URL is provided', () => {
    render(<SelectedProjects />)
    const demoLink = screen.getByRole('link', { name: /live demo/i })
    expect(demoLink).toHaveAttribute('href', 'https://demo.example.com')
  })

  it('displays project tags', () => {
    render(<SelectedProjects />)
    const reactTag = screen.getByText('react')
    expect(reactTag).toBeInTheDocument()
  })

  it('renders footer with GitHub profile link', () => {
    render(<SelectedProjects />)
    const githubProfileLink = screen.getByRole('link', { name: /github/i })
    expect(githubProfileLink).toHaveAttribute('href', 'https://github.com/nitsuah')
  })

  it('applies correct CSS classes', () => {
    const { container } = render(<SelectedProjects />)
    const section = container.querySelector('.selected-projects')
    expect(section).toBeInTheDocument()
  })

  it('has proper semantic HTML structure', () => {
    const { container } = render(<SelectedProjects />)
    const section = container.querySelector('section')
    expect(section).toBeInTheDocument()
    expect(section).toHaveClass('selected-projects')
  })
})