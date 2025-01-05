import RecoveryPasswordForm from "@/components/forms/recovery-password/recoveryPasswordForm";
import { Card } from "primereact/card";

export default function RecoveryPassword() {
    return (
        <div className="h-full w-full flex justify-center items-center">
            <div className="w-full md:w-1/3 p-8 md:p-0">
                <Card>
                    <RecoveryPasswordForm />
                </Card>
            </div>
        </div>
    );
}