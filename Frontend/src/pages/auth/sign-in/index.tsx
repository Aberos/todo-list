import { Card } from "primereact/card";
import { ReactNode } from "react";
import Layout from "@/layouts/default/layout";
import SignInForm from "@/components/forms/sign-in/signInForm";

export default function Auth() {
    const header = (
        <div className="w-full flex items-center justify-center"><h1>Entrar</h1></div>
    );

    return (
        <div className="h-full w-full flex justify-center items-center">
            <div className="w-full md:w-1/3 p-8 md:p-0">
                <Card header={header}>
                    <SignInForm />
                </Card>
            </div>
        </div>
    );
}

Auth.getLayout = function getLayout(page: ReactNode) {
    return <Layout>{page}</Layout>;
};