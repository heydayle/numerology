import { useUser } from "@/contexts/useUser";

export function KeyNumber() {
    const { mainNumber } = useUser();
    return (
        <div className="text-center my-4">
            <h2 className="text-2xl font-bold uppercase">Life path number</h2>
            <div className="mt-2 text-6xl font-extrabold text-yellow-600">{mainNumber}</div>
            <div className="mt-4 border-b border-dashed border-yellow-400 w-24 mx-auto"></div>
        </div>
    )
}