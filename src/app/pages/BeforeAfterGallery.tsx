import { useState } from "react";
import { motion } from "motion/react";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Star, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

const transformations = [
  {
    id: 1,
    patient: "Jessica M.",
    treatment: "Smile Design",
    duration: "6 months",
    rating: 5,
    story: "I never thought I could love my smile this much. The entire journey was incredible, and the results exceeded all my expectations.",
    before: "photo-1534528741775-53994a69daeb",
    after: "photo-1524504388940-b1c1722653e1",
  },
  {
    id: 2,
    patient: "Michael R.",
    treatment: "Teeth Whitening",
    duration: "1 session",
    rating: 5,
    story: "Quick, painless, and amazing results. My teeth are 6 shades whiter, and I can't stop smiling!",
    before: "photo-1507003211169-0a1dd7228f2d",
    after: "photo-1500648767791-00dcc994a43e",
  },
  {
    id: 3,
    patient: "Sarah L.",
    treatment: "Porcelain Veneers",
    duration: "3 weeks",
    rating: 5,
    story: "The veneers look so natural. Dr. Chen is truly an artist. This was the best decision I've ever made.",
    before: "photo-1438761681033-6461ffad8d80",
    after: "photo-1489424731084-a5d8b219a5bb",
  },
  {
    id: 4,
    patient: "David K.",
    treatment: "Invisalign",
    duration: "14 months",
    rating: 5,
    story: "Straightened my teeth without anyone noticing I was in treatment. The app made tracking progress so easy!",
    before: "photo-1506794778202-cad84cf45f1d",
    after: "photo-1472099645785-5658abf4ff4e",
  },
  {
    id: 5,
    patient: "Emily T.",
    treatment: "Dental Implants",
    duration: "5 months",
    rating: 5,
    story: "After years of feeling self-conscious, I finally have my confidence back. The implants feel just like real teeth.",
    before: "photo-1494790108377-be9c29b29330",
    after: "photo-1487412720507-e7ab37603c6f",
  },
  {
    id: 6,
    patient: "James W.",
    treatment: "Complete Smile Makeover",
    duration: "8 months",
    rating: 5,
    story: "A life-changing transformation. The comprehensive approach gave me a smile I'm proud to show off.",
    before: "photo-1519085360753-af0119f7cbe7",
    after: "photo-1520409364224-63400afe26e5",
  },
];

export function BeforeAfterGallery() {
  const [selectedTransformation, setSelectedTransformation] = useState<number | null>(null);
  const [sliderPosition, setSliderPosition] = useState(50);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Badge className="mb-4 bg-[var(--soft-beige)] text-[var(--dark-text)] border-0">
            Success Stories
          </Badge>
          <h1 className="text-5xl mb-4">Before & After Gallery</h1>
          <p className="text-xl text-[var(--medium-gray)] mb-8">
            Real transformations from real patients who trusted SmileOS
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <Tabs defaultValue="all" className="mb-12">
          <TabsList className="bg-card border">
            <TabsTrigger value="all">All Treatments</TabsTrigger>
            <TabsTrigger value="whitening">Whitening</TabsTrigger>
            <TabsTrigger value="veneers">Veneers</TabsTrigger>
            <TabsTrigger value="orthodontics">Orthodontics</TabsTrigger>
            <TabsTrigger value="smile-design">Smile Design</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {transformations.map((transformation, index) => (
            <motion.div
              key={transformation.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card 
                className="overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300 group"
                onClick={() => setSelectedTransformation(transformation.id)}
              >
                {/* Before/After Images */}
                <div className="relative h-80 overflow-hidden">
                  <div className="absolute inset-0 grid grid-cols-2">
                    {/* Before */}
                    <div className="relative overflow-hidden">
                      <ImageWithFallback
                        src={`https://images.unsplash.com/${transformation.before}?w=400&q=80`}
                        alt={`${transformation.patient} before`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-black/70 text-white border-0 backdrop-blur-sm">
                          Before
                        </Badge>
                      </div>
                    </div>
                    
                    {/* After */}
                    <div className="relative overflow-hidden">
                      <ImageWithFallback
                        src={`https://images.unsplash.com/${transformation.after}?w=400&q=80`}
                        alt={`${transformation.patient} after`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-[var(--champagne-gold)] text-white border-0">
                          After
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Divider Line */}
                  <div className="absolute inset-y-0 left-1/2 w-1 bg-white shadow-lg -translate-x-1/2" />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                    <Button className="bg-white text-[var(--dark-text)] hover:bg-white/90 w-full">
                      View Full Story
                    </Button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3>{transformation.patient}</h3>
                    <div className="flex">
                      {[...Array(transformation.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[var(--champagne-gold)] text-[var(--champagne-gold)]" />
                      ))}
                    </div>
                  </div>

                  <Badge variant="outline" className="mb-3 border-[var(--champagne-gold)]/30">
                    <Sparkles className="w-3 h-3 mr-1" />
                    {transformation.treatment}
                  </Badge>

                  <p className="text-sm text-[var(--medium-gray)] mb-4 line-clamp-2">
                    {transformation.story}
                  </p>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[var(--medium-gray)]">Duration: {transformation.duration}</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Featured Comparison Slider */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card className="p-8">
            <div className="text-center mb-8">
              <Badge className="mb-4 bg-[var(--soft-beige)] text-[var(--dark-text)] border-0">
                Featured Transformation
              </Badge>
              <h2 className="text-4xl mb-2">Interactive Comparison</h2>
              <p className="text-[var(--medium-gray)]">Drag the slider to see the amazing transformation</p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="relative h-[500px] rounded-2xl overflow-hidden">
                {/* After Image (Full) */}
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1000&q=90"
                  alt="After"
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Before Image (Clipped) */}
                <div 
                  className="absolute inset-0 overflow-hidden"
                  style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                >
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1000&q=90"
                    alt="Before"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>

                {/* Slider Control */}
                <div 
                  className="absolute inset-y-0 w-1 bg-white shadow-2xl cursor-ew-resize"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center">
                    <ChevronLeft className="w-4 h-4 text-[var(--dark-text)]" />
                    <ChevronRight className="w-4 h-4 text-[var(--dark-text)]" />
                  </div>
                </div>

                {/* Labels */}
                <div className="absolute top-6 left-6">
                  <Badge className="bg-black/70 text-white border-0 backdrop-blur-sm">
                    Before
                  </Badge>
                </div>
                <div className="absolute top-6 right-6">
                  <Badge className="bg-[var(--champagne-gold)] text-white border-0">
                    After
                  </Badge>
                </div>

                {/* Interactive Overlay */}
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderPosition}
                  onChange={(e) => setSliderPosition(Number(e.target.value))}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-10"
                />
              </div>

              <div className="mt-6 text-center">
                <p className="text-lg text-[var(--medium-gray)]">
                  Complete Smile Makeover • 6 Months • Porcelain Veneers + Whitening
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Card className="p-12 bg-gradient-to-br from-[var(--soft-beige)] to-white">
            <h2 className="text-4xl mb-4">Ready for Your Transformation?</h2>
            <p className="text-xl text-[var(--medium-gray)] mb-8 max-w-2xl mx-auto">
              Start your smile journey today with a free consultation
            </p>
            <Button size="lg" className="bg-gradient-to-r from-[var(--champagne-gold)] to-[var(--premium-blue)] text-white hover:opacity-90">
              Book Free Consultation
            </Button>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
