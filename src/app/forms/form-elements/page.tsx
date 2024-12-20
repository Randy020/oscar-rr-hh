import React from "react";
import FormElements from "@/components/FormElements";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import JobOfferUpload from './HeaderSection';

export const metadata: Metadata = {
  title: "OFC Consulting",
  description: "This is Next.js Form Elements page for NextAdmin Dashboard Kit",
};

const FormElementsPage = () => {
  return (
    <DefaultLayout>
      <FormElements />
      <JobOfferUpload/>
    </DefaultLayout>
  );
};

export default FormElementsPage;
