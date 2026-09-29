import { motion } from "motion/react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Link } from "react-router";
import { 
  Sparkles, ArrowRight, Star, Shield, Calendar, 
  Award, ChevronRight, Play, TrendingUp
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const salesEmail = import.meta.env.VITE_SALES_EMAIL?.trim();
const salesEmailIsConfigured = Boolean(salesEmail && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(salesEmail));

const treatments = [
  { name: "Teeth Whitening", description: "Professional whitening for a brighter smile", icon: Sparkles },
  { name: "Smile Design", description: "Complete smile transformation", icon: Star },
  { name: "Orthodontics", description: "Invisible aligners & braces", icon: Shield },
  { name: "Veneers", description: "Porcelain perfection", icon: Award },
  { name: "Implants", description: "Permanent tooth replacement", icon: TrendingUp },
];

const dentists = [
  {
    id: 1,
    name: "Dr. Sarah Chen",
    specialty: "Cosmetic Dentistry",
    rating: 4.9,
    reviews: 342,
    experience: "15 years",
  },
  {
    id: 2,
    name: "Dr. Michael Rodriguez",
    specialty: "Orthodontics",
    rating: 4.8,
    reviews: 289,
    experience: "12 years",
  },
  {
    id: 3,
    name: "Dr. Emily Watson",
    specialty: "Smile Design",
    rating: 5.0,
    reviews: 421,
    experience: "18 years",
  },
];

const testimonials = [
  {
    name: "Jessica Morgan",
    treatment: "Smile Design",
    quote: "SmileOS transformed not just my smile, but my confidence. The entire journey was seamless and luxurious.",
    rating: 5,
  },
  {
    name: "David Park",
    treatment: "Teeth Whitening",
    quote: "Professional, premium, and results beyond expectations. My smile has never looked better.",
    rating: 5,
  },
  {
    name: "Amanda Foster",
    treatment: "Veneers",
    quote: "The before and after tracking feature is incredible. I loved seeing my transformation in real-time.",
    rating: 5,
  },
];

export function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--soft-beige)] via-[var(--ivory-white)] to-white">
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, var(--champagne-gold) 1px, transparent 0)`,
            backgroundSize: '48px 48px'
          }} />
        </div>

        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge className="mb-6 bg-white/80 backdrop-blur-sm border-[var(--champagne-gold)]/30 text-[var(--dark-text)]">
                Premium Dental Experience
              </Badge>
              
              <h1 className="text-6xl lg:text-7xl tracking-tight mb-6 leading-[1.1]">
                Your smile,
                <br />
                <span className="bg-gradient-to-r from-[var(--champagne-gold)] to-[var(--premium-blue)] bg-clip-text text-transparent">
                  reimagined
                </span>
              </h1>

              <p className="text-xl text-[var(--medium-gray)] mb-8 leading-relaxed max-w-xl">
                Preview the SmileOS dental-care experience: provider profiles, appointment scheduling, treatment journeys, and patient account screens.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button size="lg" asChild className="bg-gradient-to-r from-[var(--champagne-gold)] to-[var(--premium-blue)] text-white hover:opacity-90 h-14 px-8">
                  <Link to="/discover">
                    Discover Dentists
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="h-14 px-8 border-[var(--champagne-gold)]/30 hover:bg-[var(--soft-beige)]" asChild>
                  <Link to="/dashboard">
                    <Play className="mr-2 w-5 h-5" />
                    Watch Demo
                  </Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 mt-12 pt-12 border-t border-border">
                <div>
                  <div className="text-3xl mb-1">6</div>
                  <div className="text-sm text-[var(--medium-gray)]">Sample provider profiles</div>
                </div>
                <div>
                  <div className="text-3xl mb-1">10</div>
                  <div className="text-sm text-[var(--medium-gray)]">Example product screens</div>
                </div>
                <div>
                  <div className="text-3xl mb-1">0</div>
                  <div className="text-sm text-[var(--medium-gray)]">Live clinic integrations</div>
                </div>
              </div>
            </motion.div>

            {/* Right Content - Hero Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=800&q=80"
                  alt="Smiling patient"
                  className="w-full h-[600px] object-cover"
                />
                {/* Floating Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="absolute bottom-8 left-8 right-8"
                >
                  <Card className="p-6 bg-white/95 backdrop-blur-lg border-[var(--champagne-gold)]/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-[var(--medium-gray)] mb-1">Next Available</div>
                        <div className="font-medium">Dr. Sarah Chen</div>
                      </div>
                      <Button size="sm" className="bg-[var(--champagne-gold)] hover:bg-[var(--champagne-gold)]/90" asChild>
                        <Link to="/book/1">Book Now</Link>
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Treatment Categories */}
      <section className="py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-[var(--soft-beige)] text-[var(--dark-text)] border-0">
              Premium Treatments
            </Badge>
            <h2 className="text-5xl mb-4">Transform Your Smile</h2>
            <p className="text-xl text-[var(--medium-gray)] max-w-2xl mx-auto">
              Illustrative treatment descriptions created for the product preview
            </p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {treatments.map((treatment, index) => (
              <motion.div
                key={treatment.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link to="/treatments">
                  <Card className="p-6 hover:shadow-xl transition-all duration-300 hover:border-[var(--champagne-gold)]/50 group cursor-pointer h-full">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--champagne-gold)]/10 to-[var(--premium-blue)]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <treatment.icon className="w-6 h-6 text-[var(--champagne-gold)]" />
                    </div>
                    <h3 className="mb-2">{treatment.name}</h3>
                    <p className="text-sm text-[var(--medium-gray)] mb-4">{treatment.description}</p>
                    <div className="flex items-center text-sm text-[var(--champagne-gold)] group-hover:gap-2 transition-all">
                      Learn More
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Dentists */}
      <section className="py-24 bg-[var(--soft-beige)]/30">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between mb-16">
            <div>
              <Badge className="mb-4 bg-white border-0">
                Expert Professionals
              </Badge>
              <h2 className="text-5xl mb-4">Meet Our Dentists</h2>
              <p className="text-xl text-[var(--medium-gray)]">
                Certified experts with years of experience
              </p>
            </div>
            <Button variant="outline" asChild className="border-[var(--champagne-gold)]/30">
              <Link to="/discover">
                View All
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {dentists.map((dentist, index) => (
              <motion.div
                key={dentist.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link to={`/dentist/${dentist.id}`}>
                  <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer">
                    <div className="relative h-64 overflow-hidden">
                      <ImageWithFallback
                        src={`https://images.unsplash.com/photo-${index === 0 ? '1594824476967-48c8b964273f' : index === 1 ? '1612349317150-e413f6a5b16d' : '1559839734-2b71ea197ec2'}?w=400&q=80`}
                        alt={dentist.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-white/95 backdrop-blur-sm border-0">
                          <Star className="w-3 h-3 fill-[var(--champagne-gold)] text-[var(--champagne-gold)] mr-1" />
                          {dentist.rating}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="mb-1">{dentist.name}</h3>
                      <p className="text-sm text-[var(--medium-gray)] mb-4">{dentist.specialty}</p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[var(--medium-gray)]">{dentist.reviews} reviews</span>
                        <span className="text-[var(--champagne-gold)]">{dentist.experience}</span>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-[var(--soft-beige)] text-[var(--dark-text)] border-0">
              Example Testimonials
            </Badge>
            <h2 className="text-5xl mb-4">Smile Transformations</h2>
            <p className="text-xl text-[var(--medium-gray)] max-w-2xl mx-auto">
              Illustrative story cards for the product preview—not verified patient reviews or endorsements
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-8 h-full hover:shadow-lg transition-shadow">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[var(--champagne-gold)] text-[var(--champagne-gold)]" />
                    ))}
                  </div>
                  <p className="text-[var(--dark-text)] mb-6 leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                  <div className="mt-auto">
                    <div className="font-medium">{testimonial.name}</div>
                    <div className="text-sm text-[var(--medium-gray)]">{testimonial.treatment}</div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild className="border-[var(--champagne-gold)]/30">
              <Link to="/gallery">
                View Gallery
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="for-practices" className="scroll-mt-24 bg-[var(--soft-beige)]/40 py-20">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
          <Card className="grid gap-8 p-8 lg:grid-cols-2 lg:items-center lg:p-12">
            <div>
              <Badge className="mb-4 bg-white text-[var(--dark-text)]">For dental practices</Badge>
              <h2 className="mb-4 text-4xl">Explore the practice platform preview</h2>
              <p className="mb-6 text-[var(--medium-gray)]">
                Review sample provider discovery, appointment intake, treatment journey, and patient account interfaces before discussing a practice-specific deployment.
              </p>
              <p className="text-sm text-[var(--medium-gray)]">
                This preview is not a practice management system: it has no practice onboarding, patient accounts, connected schedule, clinical records, or payments.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Button asChild className="bg-gradient-to-r from-[var(--champagne-gold)] to-[var(--premium-blue)] text-white hover:opacity-90">
                <Link to="/discover">
                  Explore Product Preview
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              {salesEmailIsConfigured ? (
                <Button variant="outline" asChild>
                  <a href={`mailto:${salesEmail}?subject=${encodeURIComponent("SmileOS practice platform inquiry")}`}>
                    Contact Sales
                  </a>
                </Button>
              ) : (
                <Button
                  variant="outline"
                  disabled
                  title="Set VITE_SALES_EMAIL to enable the sales contact link."
                >
                  Sales contact not configured
                </Button>
              )}
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-[var(--dark-text)] via-[var(--premium-blue)] to-[var(--dark-text)] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '48px 48px'
        }} />
        
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-6 bg-white/10 backdrop-blur-sm border-white/20 text-white">
              Start Your Journey
            </Badge>
            <h2 className="text-5xl mb-6 text-white">Ready for Your Dream Smile?</h2>
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
              Explore sample provider profiles and the appointment preview flow
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" asChild className="bg-white text-[var(--dark-text)] hover:bg-white/90 h-14 px-8">
                <Link to="/discover">
                  Get Started Today
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 border-white/30 text-white hover:bg-white/10" asChild>
                <Link to="/discover">
                  <Calendar className="mr-2 w-5 h-5" />
                  Book Consultation
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
