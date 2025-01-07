import SignUpForm from "@/components/forms/sign-up/signUpForm";
import Layout from "@/layouts/default/layout";
import { Card } from "primereact/card";
import { ReactNode } from "react";

export default function SingUp() {
    const header = (
        <div className="w-full flex items-center justify-center"><h1>Registrar-se</h1></div>
    );

    return (<div className="h-full w-full flex justify-center items-center">
        <div className="w-full md:w-1/3 p-8 md:p-0">
            <Card header={header}>
                <SignUpForm />
            </Card>
        </div>
    </div>);
}

SingUp.getLayout = function getLayout(page: ReactNode) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}
