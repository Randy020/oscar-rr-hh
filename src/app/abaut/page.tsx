import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import AboutUsSection from "./AboutUsSection"

export const metadata: Metadata = {
  title:
    "empleo oscar fung consulting",
  description: "Esta es una aplicacion de Contratacion y aplicacion para puestos",
};

const Profile = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto w-full max-w-[970px]">
        <Breadcrumb pageName="sobre nosotros" />

        <AboutUsSection />
      </div>
    </DefaultLayout>
  );
};

export default Profile;
