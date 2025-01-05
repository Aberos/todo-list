import { ReactNode } from "react"

type Props = {
    children: ReactNode
}

export default function Layout({ children }: Props) {
    return (<div className="h-full w-full flex items-center justify-center">
        {children}
    </div>
    )
}