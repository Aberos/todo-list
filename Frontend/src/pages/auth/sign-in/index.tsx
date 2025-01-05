import { Card } from "primereact/card";
import { ReactNode } from "react";
import Layout from "@/components/layouts/default/layout";
import SignInForm from "@/components/forms/sign-in/signInForm";

export default function Auth() {

    return (
        <div className="h-full w-full flex justify-center items-center">
            <div className="w-full md:w-1/3 p-8 md:p-0">
                <Card>
                    <SignInForm />
                </Card>
            </div>
        </div>
    );
}

Auth.getLayout = function getLayout(page: ReactNode) {
    return <Layout>{page}</Layout>;
};