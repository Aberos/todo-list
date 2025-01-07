import UpdateAuthUserForm from "@/components/forms/update-auth-user/updateAuthUserForm";
import LayoutHome from "@/layouts/home/layoutHome";
import { Card } from "primereact/card";
import { ReactNode } from "react";

export default function Profile() {
    const header = (
        <div className="w-full flex items-center justify-center"><h1>Perfil</h1></div>
    );

    return (
        <div className="h-full w-full flex justify-center items-center">
            <div className="w-full md:w-1/2 p-8 md:p-0">
                <Card header={header}>
                    <UpdateAuthUserForm />
                </Card>
            </div>
        </div>
    );
}

Profile.getLayout = function getLayout(page: ReactNode) {
    return <LayoutHome>{page}</LayoutHome>;
};