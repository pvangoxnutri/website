import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import PhilosophySection from '@/components/PhilosophySection'
import WaitlistSection from '@/components/WaitlistSection'
import FeedbackSection from '@/components/FeedbackSection'
import AppStoreSection from '@/components/AppStoreSection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-cream">
      <Navbar />
      <HeroSection />
      <PhilosophySection />
      <WaitlistSection />
      <FeedbackSection />
      <AppStoreSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
