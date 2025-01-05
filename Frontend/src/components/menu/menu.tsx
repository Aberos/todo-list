import { useRouter } from "next/router";
import { Button } from "primereact/button";
import { Menubar } from "primereact/menubar";
import { MenuItem } from "primereact/menuitem";
import { useEffect, useState } from "react";

export default function Menu() {
    const router = useRouter();
    const [items] = useState<MenuItem[]>([]);
    const [profileName, setProfileName] = useState<string>("");

    useEffect(() => {
        const profileJson = localStorage.getItem('profile');
        if (profileJson) {
            const profile = JSON.parse(profileJson);
            if (profile) {
                setProfileName(profile.name);
            }
        }
    }, []);

    function handleProfile() {
        router.push("/profile");
    }

    function handleLogout() {
        localStorage.removeItem('token');
        localStorage.removeItem('profile');

        router.push("/auth/sign-in");
    }

    const end = (
        <div className="flex items-center justify-end">
            <label className="mb-0 mr-2 cursor-pointer" onClick={handleProfile}>{profileName}</label>
            <Button icon="pi pi-sign-out" text aria-label="logout" onClick={handleLogout} />
        </div>
    );

    return (
        <Menubar model={items} end={end} />
    )
}
