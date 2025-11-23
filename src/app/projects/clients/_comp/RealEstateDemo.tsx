// Real Estate Property Listings Demo
"use client";
import React, { useState } from "react";
import { PropertyListings, PropertyDetails, MapView } from "./realestate";

export const RealEstateDemo: React.FC = () => {
  const [currentView, setCurrentView] = useState<
    "listings" | "details" | "map"
  >("listings");
  const [selectedProperty, setSelectedProperty] = useState<number | null>(null);

  if (currentView === "details" && selectedProperty) {
    return (
      <PropertyDetails
        propertyId={selectedProperty}
        onBack={() => setCurrentView("listings")}
      />
    );
  }

  if (currentView === "map") {
    return <MapView onBack={() => setCurrentView("listings")} />;
  }

  return (
    <PropertyListings
      onViewProperty={(id) => {
        setSelectedProperty(id);
        setCurrentView("details");
      }}
      onViewMap={() => setCurrentView("map")}
    />
  );
};
