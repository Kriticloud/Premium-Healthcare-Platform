import { motion } from "motion/react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Link, useParams } from "react-router";
import { 
  Star, MapPin, Award, Calendar, Clock, Shield, 
  BookOpen, Users, TrendingUp, CheckCircle, Play
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const dentistData = {
  name: "Dr. Sarah Chen",
  specialty: "Cosmetic Dentistry & Smile Design",
  rating: 4.9,
  reviewCount: 342,
  experience: "15 years",
  location: "Beverly Hills, CA",
  image: "photo-1594824476967-48c8b964273f",
  bio: "Dr. Sarah Chen is a board-certified cosmetic dentist with over 15 years of experience in smile transformations. She combines artistry with advanced dental techniques to create stunning, natural-looking results.",
  certifications: ["Board Certified", "Cosmetic Expert", "Invisalign Diamond Provider", "Master Ceramist"],
  education: [
    { degree: "DDS", school: "Harvard School of Dental Medicine", year: "2008" },
    { degree: "Cosmetic Fellowship", school: "UCLA School of Dentistry", year: "2010" },
  ],
  treatments: [
    { name: "Teeth Whitening", price: "$599", duration: "1 hour" },
    { name: "Porcelain Veneers", price: "$1,500/tooth", duration: "2 visits" },
    { name: "Smile Design", price: "$8,500+", duration: "3-4 visits" },
    { name: "Invisalign", price: "$5,500", duration: "12-18 months" },
  ],
  availability: [
    { day: "Monday", slots: ["9:00 AM", "11:00 AM", "2:00 PM", "4:00 PM"] },
    { day: "Tuesday", slots: ["9:00 AM", "1:00 PM", "3:00 PM"] },
    { day: "Wednesday", slots: ["10:00 AM", "2:00 PM", "4:00 PM"] },
    { day: "Thursday", slots: ["9:00 AM", "11:00 AM", "3:00 PM"] },
    { day: "Friday", slots: ["9:00 AM", "12:00 PM"] },
  ],
  reviews: [
    {
      author: "Jessica M.",
      rating: 5,
      date: "2 weeks ago",
      treatment: "Smile Design",
      comment: "Dr. Chen transformed my smile beyond my expectations. Her attention to detail and gentle approach made the entire process comfortable and enjoyable.",
      verified: true,
    },
    {
      author: "David P.",
      rating: 5,
      date: "1 month ago",
      treatment: "Teeth Whitening",
      comment: "Professional, efficient, and amazing results! My teeth are 4 shades whiter after just one session.",
      verified: true,
    },
    {
      author: "Amanda F.",
      rating: 5,
      date: "2 months ago",
      treatment: "Veneers",
      comment: "The veneers look so natural, no one can tell they're not my real teeth. Dr. Chen is a true artist!",
      verified: true,
    },
  ],
};

export function DentistProfile() {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-80 overflow-hidden">
        <ImageWithFallback
          src={`https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1600&q=80`}
          alt="Dental office"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </section>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="-mt-32 relative z-10"
        >
          <Card className="p-8">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Avatar */}
              <div className="relative">
                <Avatar className="w-40 h-40 border-4 border-white shadow-xl">
                  <AvatarImage src={`https://images.unsplash.com/${dentistData.image}?w=200&q=80`} />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-2 -right-2">
                  <Badge className="bg-green-500 text-white border-0 shadow-lg">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                </div>
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-4xl mb-2">{dentistData.name}</h1>
                    <p className="text-xl text-[var(--medium-gray)] mb-4">{dentistData.specialty}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {dentistData.certifications.map((cert) => (
                        <Badge key={cert} variant="outline" className="border-[var(--champagne-gold)]/30">
                          <Award className="w-3 h-3 mr-1" />
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${
                              i < Math.floor(dentistData.rating)
                                ? "fill-[var(--champagne-gold)] text-[var(--champagne-gold)]"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-2xl">{dentistData.rating}</span>
                    </div>
                    <div className="text-sm text-[var(--medium-gray)]">{dentistData.reviewCount} reviews</div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[var(--soft-beige)] flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-[var(--champagne-gold)]" />
                    </div>
                    <div>
                      <div className="text-sm text-[var(--medium-gray)]">Experience</div>
                      <div className="font-medium">{dentistData.experience}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[var(--soft-beige)] flex items-center justify-center">
                      <Users className="w-5 h-5 text-[var(--champagne-gold)]" />
                    </div>
                    <div>
                      <div className="text-sm text-[var(--medium-gray)]">Patients</div>
                      <div className="font-medium">5,200+</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[var(--soft-beige)] flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-[var(--champagne-gold)]" />
                    </div>
                    <div>
                      <div className="text-sm text-[var(--medium-gray)]">Location</div>
                      <div className="font-medium">{dentistData.location}</div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button size="lg" asChild className="bg-gradient-to-r from-[var(--champagne-gold)] to-[var(--premium-blue)] text-white hover:opacity-90">
                    <Link to={`/book/${id}`}>
                      <Calendar className="w-5 h-5 mr-2" />
                      Book Appointment
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="border-[var(--champagne-gold)]/30">
                    <Play className="w-5 h-5 mr-2" />
                    Virtual Tour
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Content Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 mb-16"
        >
          <Tabs defaultValue="about" className="w-full">
            <TabsList className="w-full justify-start bg-card border-b rounded-none h-auto p-0">
              <TabsTrigger value="about" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-[var(--champagne-gold)]">
                About
              </TabsTrigger>
              <TabsTrigger value="treatments" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-[var(--champagne-gold)]">
                Treatments & Pricing
              </TabsTrigger>
              <TabsTrigger value="reviews" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-[var(--champagne-gold)]">
                Reviews ({dentistData.reviews.length})
              </TabsTrigger>
              <TabsTrigger value="availability" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-[var(--champagne-gold)]">
                Availability
              </TabsTrigger>
            </TabsList>

            {/* About Tab */}
            <TabsContent value="about" className="mt-8">
              <div className="grid lg:grid-cols-2 gap-8">
                <Card className="p-8">
                  <h3 className="mb-4">Biography</h3>
                  <p className="text-[var(--medium-gray)] leading-relaxed mb-6">
                    {dentistData.bio}
                  </p>

                  <h3 className="mb-4">Education & Training</h3>
                  <div className="space-y-4">
                    {dentistData.education.map((edu, index) => (
                      <div key={index} className="flex items-start gap-4 p-4 bg-[var(--soft-beige)]/30 rounded-lg">
                        <div className="w-10 h-10 rounded-full bg-[var(--champagne-gold)]/10 flex items-center justify-center flex-shrink-0">
                          <Shield className="w-5 h-5 text-[var(--champagne-gold)]" />
                        </div>
                        <div>
                          <div className="font-medium mb-1">{edu.degree}</div>
                          <div className="text-sm text-[var(--medium-gray)]">{edu.school}</div>
                          <div className="text-sm text-[var(--champagne-gold)] mt-1">{edu.year}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                <div className="space-y-6">
                  <Card className="p-8">
                    <h3 className="mb-4">Office Gallery</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="relative h-32 rounded-lg overflow-hidden group cursor-pointer">
                          <ImageWithFallback
                            src={`https://images.unsplash.com/photo-1629909615957-be38d7ce891${i}?w=300&q=80`}
                            alt={`Office ${i}`}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                          />
                        </div>
                      ))}
                    </div>
                  </Card>

                  <Card className="p-8">
                    <h3 className="mb-4">Success Metrics</h3>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <div className="text-3xl text-[var(--champagne-gold)] mb-1">98%</div>
                        <div className="text-sm text-[var(--medium-gray)]">Patient Satisfaction</div>
                      </div>
                      <div>
                        <div className="text-3xl text-[var(--champagne-gold)] mb-1">5,200+</div>
                        <div className="text-sm text-[var(--medium-gray)]">Successful Cases</div>
                      </div>
                      <div>
                        <div className="text-3xl text-[var(--champagne-gold)] mb-1">24h</div>
                        <div className="text-sm text-[var(--medium-gray)]">Response Time</div>
                      </div>
                      <div>
                        <div className="text-3xl text-[var(--champagne-gold)] mb-1">15+</div>
                        <div className="text-sm text-[var(--medium-gray)]">Years Experience</div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Treatments Tab */}
            <TabsContent value="treatments" className="mt-8">
              <div className="grid md:grid-cols-2 gap-6">
                {dentistData.treatments.map((treatment, index) => (
                  <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="mb-2">{treatment.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-[var(--medium-gray)]">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {treatment.duration}
                          </div>
                        </div>
                      </div>
                      <div className="text-2xl text-[var(--champagne-gold)]">{treatment.price}</div>
                    </div>
                    <Button className="w-full" variant="outline" asChild>
                      <Link to={`/book/${id}`}>Book Consultation</Link>
                    </Button>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Reviews Tab */}
            <TabsContent value="reviews" className="mt-8">
              <div className="space-y-6">
                {dentistData.reviews.map((review, index) => (
                  <Card key={index} className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4">
                        <Avatar>
                          <AvatarFallback>{review.author[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <div className="font-medium">{review.author}</div>
                            {review.verified && (
                              <Badge variant="outline" className="border-green-500 text-green-600 text-xs">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Verified Patient
                              </Badge>
                            )}
                          </div>
                          <div className="text-sm text-[var(--medium-gray)]">{review.treatment} • {review.date}</div>
                        </div>
                      </div>
                      <div className="flex">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-[var(--champagne-gold)] text-[var(--champagne-gold)]" />
                        ))}
                      </div>
                    </div>
                    <p className="text-[var(--medium-gray)] leading-relaxed">{review.comment}</p>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Availability Tab */}
            <TabsContent value="availability" className="mt-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {dentistData.availability.map((day) => (
                  <Card key={day.day} className="p-6">
                    <h3 className="mb-4">{day.day}</h3>
                    <div className="space-y-2">
                      {day.slots.map((slot) => (
                        <Button
                          key={slot}
                          variant="outline"
                          className="w-full justify-start hover:bg-[var(--champagne-gold)]/10 hover:border-[var(--champagne-gold)]"
                          asChild
                        >
                          <Link to={`/book/${id}`}>
                            <Clock className="w-4 h-4 mr-2" />
                            {slot}
                          </Link>
                        </Button>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}
