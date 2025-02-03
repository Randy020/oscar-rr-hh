import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import React from "react";
import FileUploader from "./FileUploader"

export const metadata: Metadata = {
  title:
    "empleo oscar fung consulting",
  description: "Esta es una aplicacion de Contratacion y aplicacion para puestos",
};

export default function Home() {
  return (
    <>
      <DefaultLayout>
        <FileUploader />
      </DefaultLayout> 
    </>
  );
}
