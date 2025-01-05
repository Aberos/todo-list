import { useRouter } from "next/router";
import { ProgressSpinner } from "primereact/progressspinner";
import { ReactNode, useEffect, useState } from "react";
import styles from './LayoutHome.module.css'
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

    return (<>
        {isAuth ? <Menu /> : <></>}
        <div className={`w-full flex justify-center items-center p-3 ${isAuth ? styles.content : 'h-full'}`}>
            {isAuth
                ? children
                : <ProgressSpinner />
            }
        </div>
    </>
    )
}
