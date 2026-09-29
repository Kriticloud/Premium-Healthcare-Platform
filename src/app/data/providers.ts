export type Provider = {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  experience: string;
  location: string;
  price: string;
  available: string;
  image: string;
  certifications: string[];
};

export type ProviderQuickFilters = {
  topRated: boolean;
  availableToday: boolean;
  certified: boolean;
  premium: boolean;
};

export type ProviderFilters = {
  query: string;
  specialty: string;
  location: string;
  quickFilters: ProviderQuickFilters;
};

export const providers: Provider[] = [
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

export function getProviderById(id: string | undefined): Provider | undefined {
  if (!id || !/^\d+$/.test(id)) return undefined;
  return providers.find((provider) => provider.id === Number(id));
}

export function filterProviders(items: Provider[], filters: ProviderFilters): Provider[] {
  const query = filters.query.trim().toLowerCase();

  return items.filter((provider) => {
    const matchesQuery = !query || [
      provider.name,
      provider.specialty,
      provider.location,
      ...provider.certifications,
    ].some((value) => value.toLowerCase().includes(query));
    const matchesSpecialty = filters.specialty === "all"
      || provider.specialty.toLowerCase().includes(filters.specialty.replace("-", " "));
    const locationCode = provider.location.split(", ").at(-1)?.toLowerCase();
    const matchesLocation = filters.location === "all" || locationCode === filters.location;

    return matchesQuery
      && matchesSpecialty
      && matchesLocation
      && (!filters.quickFilters.topRated || provider.rating >= 4.9)
      && (!filters.quickFilters.availableToday || provider.available.includes("Today"))
      && (!filters.quickFilters.certified || provider.certifications.some((value) => value.toLowerCase().includes("certified")))
      && (!filters.quickFilters.premium || provider.price === "$$$$");
  });
}
