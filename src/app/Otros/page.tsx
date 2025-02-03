
import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import React from "react";
import MyRenderComponent from "./ContentGrid"

export const metadata: Metadata = {
  title:
    "empleo oscar fung consulting",
  description: "Esta es una aplicacion de Contratacion y aplicacion para puestos",
};

export default function INMUEBLES() {
  return (
    <>
      <DefaultLayout>
        <MyRenderComponent />
      </DefaultLayout> 
    </>
  );
}
