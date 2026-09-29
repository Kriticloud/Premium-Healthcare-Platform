import { motion } from "motion/react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Link } from "react-router";
import { 
  Sparkles, Star, Shield, Award, Clock, CheckCircle,
  ArrowRight, TrendingUp, Zap
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const treatments = [
  {
    id: 1,
    name: "Teeth Whitening",
    tagline: "Brighten Your Confidence",
    description: "Professional teeth whitening that delivers results up to 8 shades lighter in just one session. Our advanced whitening technology is safe, effective, and produces stunning results.",
    price: "$599",
    duration: "1 hour",
    results: "Immediate",
    icon: Sparkles,
    color: "from-yellow-400 to-amber-500",
    image: "photo-1606811971618-4486d14f3f99",
    benefits: [
      "Up to 8 shades whiter",
      "Immediate results",
      "Painless procedure",
      "Long-lasting effects",
      "Safe for sensitive teeth"
    ],
    process: [
      "Initial consultation & shade assessment",
      "Professional cleaning",
      "Whitening gel application",
      "LED light activation",
      "Results evaluation & aftercare"
    ]
  },
  {
    id: 2,
    name: "Smile Design",
    tagline: "Complete Transformation",
    description: "A comprehensive approach to creating your perfect smile. We combine multiple treatments and advanced digital planning to design a smile that's uniquely yours.",
    price: "$8,500+",
    duration: "3-4 visits",
    results: "4-6 weeks",
    icon: Star,
    color: "from-purple-400 to-pink-500",
    image: "photo-1629909613654-28e377c37b09",
    benefits: [
      "Complete smile makeover",
      "Digital smile preview",
      "Customized treatment plan",
      "Natural-looking results",
      "Permanent transformation"
    ],
    process: [
      "Digital smile analysis & 3D preview",
      "Custom treatment planning",
      "Preparation & temporaries",
      "Final placement",
      "Follow-up & refinement"
    ]
  },
  {
    id: 3,
    name: "Orthodontics",
    tagline: "Invisible Alignment",
    description: "Straighten your teeth discreetly with clear aligners or modern braces. Our orthodontic treatments are designed for comfort and efficiency.",
    price: "$5,500",
    duration: "12-18 months",
    results: "Progressive",
    icon: Shield,
    color: "from-blue-400 to-cyan-500",
    image: "photo-1588776813649-75f4bf2c4600",
    benefits: [
      "Nearly invisible treatment",
      "Comfortable & removable",
      "Predictable results",
      "Digital progress tracking",
      "Flexible payment plans"
    ],
    process: [
      "3D smile scan & treatment plan",
      "Custom aligner fabrication",
      "Progressive aligner sets",
      "Regular monitoring visits",
      "Retention phase"
    ]
  },
  {
    id: 4,
    name: "Porcelain Veneers",
    tagline: "Flawless Perfection",
    description: "Ultra-thin porcelain shells that cover the front surface of your teeth, creating a flawless, natural-looking smile that lasts for decades.",
    price: "$1,500/tooth",
    duration: "2 visits",
    results: "2-3 weeks",
    icon: Award,
    color: "from-rose-400 to-red-500",
    image: "photo-1609840114035-3c981960afbe",
    benefits: [
      "Natural appearance",
      "Stain-resistant material",
      "Minimally invasive",
      "Long-lasting (15-20 years)",
      "Instant transformation"
    ],
    process: [
      "Consultation & color matching",
      "Tooth preparation & impressions",
      "Temporary veneers",
      "Custom veneer fabrication",
      "Final bonding & polishing"
    ]
  },
  {
    id: 5,
    name: "Dental Implants",
    tagline: "Permanent Solution",
    description: "Replace missing teeth with natural-looking, permanent implants that function just like your natural teeth. The gold standard in tooth replacement.",
    price: "$3,500/tooth",
    duration: "3-6 months",
    results: "Permanent",
    icon: TrendingUp,
    color: "from-emerald-400 to-teal-500",
    image: "photo-1598256989800-fe5f95da9787",
    benefits: [
      "Permanent solution",
      "Natural look & function",
      "Prevents bone loss",
      "No impact on adjacent teeth",
      "High success rate (98%)"
    ],
    process: [
      "3D imaging & planning",
      "Implant placement surgery",
      "Healing period (3-6 months)",
      "Abutment placement",
      "Crown fabrication & placement"
    ]
  },
];

export function Treatments() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[var(--dark-text)] via-[var(--premium-blue)] to-[var(--dark-text)] text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '48px 48px'
        }} />
        
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <Badge className="mb-6 bg-white/10 backdrop-blur-sm border-white/20 text-white">
              Premium Treatments
            </Badge>
            <h1 className="text-6xl mb-6 text-white">Transform Your Smile</h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Explore sample treatment information in this product preview. Prices, availability, and outcomes are examples only; ask a licensed dental professional about your care.
            </p>
            <p className="mt-4 text-sm text-white/70">The treatment descriptions and clinical claims below are illustrative placeholders, not medical advice.</p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-16">
        {/* Treatment Cards */}
        <div className="space-y-16">
          {treatments.map((treatment, index) => (
            <motion.div
              key={treatment.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card id={`treatment-${treatment.id}`} className="overflow-hidden hover:shadow-2xl transition-all duration-500 group">
                <div className={`grid lg:grid-cols-2 gap-0 ${index % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}>
                  {/* Image */}
                  <div className={`relative h-96 lg:h-auto overflow-hidden ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                    <ImageWithFallback
                      src={`https://images.unsplash.com/${treatment.image}?w=800&q=80`}
                      alt={treatment.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${treatment.color} opacity-20 group-hover:opacity-30 transition-opacity`} />
                    
                    {/* Floating Badge */}
                    <div className="absolute top-6 right-6">
                      <Badge className="bg-white/95 backdrop-blur-sm border-0 text-[var(--dark-text)] px-4 py-2">
                        <treatment.icon className="w-4 h-4 mr-2" />
                        Popular
                      </Badge>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-10 lg:p-12 flex flex-col justify-center">
                    <Badge className="mb-4 w-fit bg-gradient-to-r from-[var(--champagne-gold)]/10 to-[var(--premium-blue)]/10 border-[var(--champagne-gold)]/30 text-[var(--dark-text)]">
                      {treatment.tagline}
                    </Badge>

                    <h2 className="text-4xl mb-4">{treatment.name}</h2>
                    
                    <p className="text-lg text-[var(--medium-gray)] mb-6 leading-relaxed">
                      {treatment.description}
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-8 pb-8 border-b border-border">
                      <div>
                        <div className="text-sm text-[var(--medium-gray)] mb-1">Price</div>
                        <div className="text-xl text-[var(--champagne-gold)]">{treatment.price}</div>
                      </div>
                      <div>
                        <div className="text-sm text-[var(--medium-gray)] mb-1">Duration</div>
                        <div className="font-medium">{treatment.duration}</div>
                      </div>
                      <div>
                        <div className="text-sm text-[var(--medium-gray)] mb-1">Results</div>
                        <div className="font-medium">{treatment.results}</div>
                      </div>
                    </div>

                    {/* Benefits */}
                    <div className="mb-8">
                      <h4 className="mb-4 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-[var(--champagne-gold)]" />
                        Key Benefits
                      </h4>
                      <div className="grid gap-3">
                        {treatment.benefits.map((benefit, i) => (
                          <div key={i} className="flex items-center gap-3 text-[var(--medium-gray)]">
                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                            <span>{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div id={`process-${treatment.id}`} className="mb-8 scroll-mt-24">
                      <h4 className="mb-4">Example care journey</h4>
                      <ol className="grid gap-3">
                        {treatment.process.map((step, stepIndex) => (
                          <li key={step} className="flex items-start gap-3 text-[var(--medium-gray)]">
                            <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[var(--champagne-gold)]/10 text-xs font-medium text-[var(--dark-text)]">
                              {stepIndex + 1}
                            </span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-3">
                      <Button size="lg" asChild className="bg-gradient-to-r from-[var(--champagne-gold)] to-[var(--premium-blue)] text-white hover:opacity-90">
                        <Link to="/discover">
                          Browse Sample Providers
                          <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                      </Button>
                      <Button size="lg" variant="outline" className="border-[var(--champagne-gold)]/30" asChild>
                        <a href={`#process-${treatment.id}`}>View Example Steps</a>
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <Card className="p-12 text-center bg-gradient-to-br from-[var(--soft-beige)] to-white">
            <h2 className="text-4xl mb-4">Not Sure Which Treatment is Right for You?</h2>
            <p className="text-xl text-[var(--medium-gray)] mb-8 max-w-2xl mx-auto">
              Browse the sample provider directory to preview the interactive scheduling flow.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" asChild className="bg-gradient-to-r from-[var(--champagne-gold)] to-[var(--premium-blue)] text-white hover:opacity-90">
                <Link to="/discover">
                  Find a Dentist
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-[var(--champagne-gold)]/30" asChild>
                <Link to="/discover">
                  <Clock className="mr-2 w-5 h-5" />
                  Preview Scheduling
                </Link>
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
