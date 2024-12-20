import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import HRServicesx from "./HRServicesx";

export const metadata: Metadata = {
  title:
    "OFC Consulting",
  description: "This is Next.js Profile page for NextAdmin Dashboard Kit",
};

const Profile = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto w-full max-w-[970px]">
        <Breadcrumb pageName="Servicios" />

        <HRServicesx />
      </div>
    </DefaultLayout>
  );
};

export default Profile;
