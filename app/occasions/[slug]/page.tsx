import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getOccasionBySlug, OCCASIONS } from "@/data/occasions";
import { OccasionDetailClient } from "@/components/OccasionDetailClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return OCCASIONS.map((occ) => ({
    slug: occ.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const occasion = getOccasionBySlug(slug);

  if (!occasion) {
    return {
      title: "Occasion Not Found | Sri Bhagavathi Silvers",
    };
  }

  return {
    title: occasion.metaTitle,
    description: occasion.metaDescription,
    openGraph: {
      title: occasion.metaTitle,
      description: occasion.metaDescription,
      images: [occasion.heroImage || occasion.image],
    },
  };
}

export default async function OccasionSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const occasion = getOccasionBySlug(slug);

  if (!occasion) {
    notFound();
  }

  return <OccasionDetailClient occasion={occasion} />;
}
