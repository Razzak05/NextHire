import React from "react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Users, Globe, Target, Heart } from "lucide-react";

const coreValues = [
  {
    icon: <Users className="w-6 h-6 text-blue-600" />,
    title: "Collaboration",
    description:
      "We foster teamwork and shared success between recruiters and candidates.",
  },
  {
    icon: <Globe className="w-6 h-6 text-green-600" />,
    title: "Global Reach",
    description: "Our platform connects talent and companies across the globe.",
  },
  {
    icon: <Target className="w-6 h-6 text-purple-600" />,
    title: "Precision Hiring",
    description:
      "We aim to match the right talent to the right job—every time.",
  },
  {
    icon: <Heart className="w-6 h-6 text-rose-600" />,
    title: "Integrity",
    description:
      "Transparency and fairness are at the core of everything we do.",
  },
];

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="text-center space-y-4">
        <Badge className="text-sm px-4 py-1 bg-blue-100 text-blue-600 rounded-full">
          About Us
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight">
          Empowering Careers. Enabling Companies.
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          At <span className="font-semibold text-blue-600">NextHire</span>,
          we’re reshaping the future of recruitment. Whether you're a job seeker
          or a hiring manager, we provide a seamless experience that saves time
          and delivers results.
        </p>
      </div>

      <Separator className="my-10" />

      <section className="grid md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">Our Mission</h2>
          <p className="text-muted-foreground">
            Our mission is to bridge the gap between passionate individuals and
            innovative companies. We believe in a hiring process that’s
            intelligent, inclusive, and impactful.
          </p>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            What Sets Us Apart
          </h2>
          <p className="text-muted-foreground">
            NextHire combines smart filtering, employer transparency, and
            candidate-first design to create a recruitment platform like no
            other.
          </p>
        </div>
      </section>

      <Separator className="my-10" />

      <section className="text-center space-y-6">
        <h2 className="text-3xl font-bold">Our Core Values</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          The principles guiding our journey to revolutionize recruitment.
        </p>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 mt-8">
          {coreValues.map((value, index) => (
            <div
              key={index}
              className="border rounded-xl p-5 bg-white shadow-sm hover:shadow-md transition"
            >
              <div className="mb-3">{value.icon}</div>
              <h3 className="font-semibold text-lg">{value.title}</h3>
              <p className="text-sm text-muted-foreground">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Separator className="my-12" />

      <section className="text-center">
        <h2 className="text-3xl font-bold">Join the Journey</h2>
        <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
          Whether you're looking to hire, be hired, or simply curious, we're
          thrilled to have you explore the future of hiring with us.
        </p>
      </section>
    </div>
  );
};

export default About;
