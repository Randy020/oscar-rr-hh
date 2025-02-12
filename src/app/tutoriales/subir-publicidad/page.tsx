import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import ContactUs from "./ContactUs"

export const metadata: Metadata = {
  title:
    "vende lo que quieras",
  description: "Esta es una aplicacion de Contratacion y aplicacion para puestos",
};

const Profile = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto w-full max-w-[970px]">
        <Breadcrumb pageName="Contactanos " />

        <ContactUs/>
      </div>
    </DefaultLayout>
  );
};

export default Profile;
