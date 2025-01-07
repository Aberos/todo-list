import RecoveryPasswordForm from "@/components/forms/recovery-password/recoveryPasswordForm";
import { Card } from "primereact/card";

export default function RecoveryPassword() {
    const header = (
        <div className="w-full flex items-center justify-center"><h1>Recuperar senha</h1></div>
    );

    return (
        <div className="h-full w-full flex justify-center items-center">
            <div className="w-full md:w-1/3 p-8 md:p-0">
                <Card header={header}>
                    <RecoveryPasswordForm />
                </Card>
            </div>
        </div>
    );
}