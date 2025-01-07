import { useRouter } from "next/router";
import { ProgressSpinner } from "primereact/progressspinner";
import { ReactNode, useEffect, useState } from "react";
import Menu from "@/components/menu/menu";
import { validateToken } from "@/services/auth-service";

type Props = {
    children: ReactNode
}

export default function LayoutHome({ children }: Props) {
    const router = useRouter();
    const [isAuth, setAuth] = useState(false);

    const validateAuth = async () => {
        const isValid = await validateToken();
        if (isValid) {
            setAuth(true);
        }
        else {
            router.push("/auth/sign-in");
        }
    }

    useEffect(() => {
        validateAuth();
    }, []);

    return (
        <>
            {isAuth && <Menu />}
            <div
                className={`flex flex-col ${isAuth ? 'h-[calc(100vh-64px)]' : 'h-full'
                    } w-full justify-center items-center p-3`}
                style={{
                    marginTop: isAuth ? '64px' : '0', // ajuste conforme a altura do Menu
                }}
            >
                {isAuth ? children : <ProgressSpinner />}
            </div>
        </>
    );
}
