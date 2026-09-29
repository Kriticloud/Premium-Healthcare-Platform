import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Link } from "react-router";
import { Search, MapPin, Star, Clock, Filter, Award, Sparkles, Calendar } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const dentists = [
  {
    id: 1,
    name: "Dr. Sarah Chen",
    specialty: "Cosmetic Dentistry",
    rating: 4.9,
    reviews: 342,
    experience: "15 years",
    location: "Beverly Hills, CA",
    price: "$$$",
    available: "Next: Today 3:00 PM",
    image: "photo-1594824476967-48c8b964273f",
    certifications: ["Board Certified", "Cosmetic Expert"],
  },
  {
    id: 2,
    name: "Dr. Michael Rodriguez",
    specialty: "Orthodontics",
    rating: 4.8,
    reviews: 289,
    experience: "12 years",
    location: "Manhattan, NY",
    price: "$$$$",
    available: "Next: Tomorrow 10:00 AM",
    image: "photo-1612349317150-e413f6a5b16d",
    certifications: ["Invisalign Expert", "Board Certified"],
  },
  {
    id: 3,
    name: "Dr. Emily Watson",
    specialty: "Smile Design",
    rating: 5.0,
    reviews: 421,
    experience: "18 years",
    location: "Miami, FL",
    price: "$$$$",
    available: "Next: Today 5:00 PM",
    image: "photo-1559839734-2b71ea197ec2",
    certifications: ["Veneer Specialist", "Master Ceramist"],
  },
  {
    id: 4,
    name: "Dr. James Thompson",
    specialty: "Implantology",
    rating: 4.9,
    reviews: 267,
    experience: "20 years",
    location: "San Francisco, CA",
    price: "$$$",
    available: "Next: Tomorrow 2:00 PM",
    image: "photo-1622253692010-333f2da6031d",
    certifications: ["Implant Expert", "Board Certified"],
  },
  {
    id: 5,
    name: "Dr. Lisa Anderson",
    specialty: "Teeth Whitening",
    rating: 4.7,
    reviews: 198,
    experience: "10 years",
    location: "Chicago, IL",
    price: "$$",
    available: "Next: Today 4:00 PM",
    image: "photo-1594824476967-48c8b964273f",
    certifications: ["Whitening Specialist"],
  },
  {
    id: 6,
    name: "Dr. Robert Kim",
    specialty: "Periodontics",
    rating: 4.8,
    reviews: 312,
    experience: "14 years",
    location: "Seattle, WA",
    price: "$$$",
    available: "Next: Tomorrow 9:00 AM",
    image: "photo-1612349317150-e413f6a5b16d",
    certifications: ["Gum Specialist", "Board Certified"],
  },
];

export function DentistDiscovery() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[var(--soft-beige)] via-[var(--ivory-white)] to-white py-16">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Badge className="mb-4 bg-white/80 backdrop-blur-sm border-[var(--champagne-gold)]/30">
              Discover Excellence
            </Badge>
            <h1 className="text-5xl mb-4">Find Your Perfect Dentist</h1>
            <p className="text-xl text-[var(--medium-gray)] max-w-2xl">
              Connect with world-class dental professionals who understand your unique needs
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-12">
        {/* Search & Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <Card className="p-6">
            <div className="grid md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="md:col-span-2 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--medium-gray)]" />
                <Input
                  placeholder="Search by name, specialty, or treatment..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 bg-input-background border-border/50"
                />
              </div>

              {/* Specialty Filter */}
              <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                <SelectTrigger className="h-12 bg-input-background border-border/50">
                  <SelectValue placeholder="Specialty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Specialties</SelectItem>
                  <SelectItem value="cosmetic">Cosmetic Dentistry</SelectItem>
                  <SelectItem value="orthodontics">Orthodontics</SelectItem>
                  <SelectItem value="smile-design">Smile Design</SelectItem>
                  <SelectItem value="implantology">Implantology</SelectItem>
                  <SelectItem value="whitening">Teeth Whitening</SelectItem>
                </SelectContent>
              </Select>

              {/* Location Filter */}
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger className="h-12 bg-input-background border-border/50">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="ca">California</SelectItem>
                  <SelectItem value="ny">New York</SelectItem>
                  <SelectItem value="fl">Florida</SelectItem>
                  <SelectItem value="il">Illinois</SelectItem>
                  <SelectItem value="wa">Washington</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
              <Button variant="outline" size="sm" className="rounded-full">
                <Star className="w-4 h-4 mr-2 text-[var(--champagne-gold)]" />
                Top Rated
              </Button>
              <Button variant="outline" size="sm" className="rounded-full">
                <Clock className="w-4 h-4 mr-2" />
                Available Today
              </Button>
              <Button variant="outline" size="sm" className="rounded-full">
                <Award className="w-4 h-4 mr-2" />
                Certified
              </Button>
              <Button variant="outline" size="sm" className="rounded-full">
                <Sparkles className="w-4 h-4 mr-2" />
                Premium
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Results */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-[var(--medium-gray)]">
            Showing {dentists.length} dentists
          </div>
          <Button variant="ghost" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            More Filters
          </Button>
        </div>

        {/* Dentist Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dentists.map((dentist, index) => (
            <motion.div
              key={dentist.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <Link to={`/dentist/${dentist.id}`}>
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <ImageWithFallback
                      src={`https://images.unsplash.com/${dentist.image}?w=400&q=80`}
                      alt={dentist.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Rating Badge */}
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-white/95 backdrop-blur-sm border-0 flex items-center gap-1">
                        <Star className="w-3 h-3 fill-[var(--champagne-gold)] text-[var(--champagne-gold)]" />
                        {dentist.rating}
                      </Badge>
                    </div>
                    {/* Available Badge */}
                    <div className="absolute bottom-4 left-4">
                      <Badge className="bg-green-500/90 backdrop-blur-sm border-0 text-white">
                        <Clock className="w-3 h-3 mr-1" />
                        Available
                      </Badge>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="mb-1">{dentist.name}</h3>
                        <p className="text-sm text-[var(--medium-gray)]">{dentist.specialty}</p>
                      </div>
                      <div className="text-sm text-[var(--champagne-gold)]">
                        {dentist.price}
                      </div>
                    </div>

                    {/* Certifications */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {dentist.certifications.map((cert) => (
                        <Badge key={cert} variant="outline" className="text-xs border-[var(--champagne-gold)]/30">
                          {cert}
                        </Badge>
                      ))}
                    </div>

                    {/* Info Row */}
                    <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-border">
                      <div className="text-sm">
                        <div className="text-[var(--medium-gray)] mb-1">Experience</div>
                        <div className="font-medium">{dentist.experience}</div>
                      </div>
                      <div className="text-sm">
                        <div className="text-[var(--medium-gray)] mb-1">Reviews</div>
                        <div className="font-medium">{dentist.reviews}</div>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-center text-sm text-[var(--medium-gray)] mb-4">
                      <MapPin className="w-4 h-4 mr-2" />
                      {dentist.location}
                    </div>

                    {/* Availability */}
                    <div className="bg-[var(--soft-beige)]/50 rounded-lg p-3 mb-4">
                      <div className="text-xs text-[var(--medium-gray)] mb-1">Next Available</div>
                      <div className="text-sm font-medium">{dentist.available}</div>
                    </div>

                    {/* Action */}
                    <Button className="w-full bg-gradient-to-r from-[var(--champagne-gold)] to-[var(--premium-blue)] text-white hover:opacity-90" asChild>
                      <Link to={`/book/${dentist.id}`}>
                        <Calendar className="w-4 h-4 mr-2" />
                        Book Appointment
                      </Link>
                    </Button>
                  </div>
                </Link>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
