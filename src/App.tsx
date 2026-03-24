import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { WhyPartner } from './components/WhyPartner'
import { HowItWorks } from './components/HowItWorks'
import { PartnerTiers } from './components/PartnerTiers'
import { EarningsCalculator } from './components/EarningsCalculator'
import { CompetitiveAdvantage } from './components/CompetitiveAdvantage'
import { PartnerPortal } from './components/PartnerPortal'
import { SocialProof } from './components/SocialProof'
import { FAQ } from './components/FAQ'
import { CTAFooter } from './components/CTAFooter'
import { Footer } from './components/Footer'

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <WhyPartner />
        <HowItWorks />
        <PartnerTiers />
        <EarningsCalculator />
        <CompetitiveAdvantage />
        <PartnerPortal />
        <SocialProof />
        <FAQ />
        <CTAFooter />
      </main>
      <Footer />
    </>
  )
}

export default App
