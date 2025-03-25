import { createFileRoute } from '@tanstack/react-router'
import AnimatedHero from '@/components/AnimatedHero'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <AnimatedHero />
  )
}

