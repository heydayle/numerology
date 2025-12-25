import { useKeyNumber } from "@/contexts/useKeyNumber";
import { useUser } from "@/contexts/useUser";

export function BirthdayNumber() {
    const { birthdayNumber, lifeAdtitudeNumber } = useUser();
    const { birthday, additude } = useKeyNumber();
    return (
        <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
                <div className="text-center my-4">
                    <h2 className="text-2xl font-bold uppercase">Birthday number</h2>
                    <div className="mt-2 text-6xl font-extrabold text-yellow-600">{birthdayNumber}</div>
                    <div className="mt-4 border-b border-dashed border-yellow-400 w-24 mx-auto"></div>
                </div>
                <p className="flex-1 px-4 py-6 bg-neutral-900 rounded-lg shadow-md my-4 text-neutral-300">{birthday}</p>
            </div>
            <div className="flex flex-col">
                <div className="text-center my-4">
                    <h2 className="text-2xl font-bold uppercase">Life attitude</h2>
                    <div className="mt-2 text-6xl font-extrabold text-yellow-600">{lifeAdtitudeNumber}</div>
                    <div className="mt-4 border-b border-dashed border-yellow-400 w-24 mx-auto"></div>
                </div>
                <p className="flex-1 px-4 py-6 bg-neutral-900 rounded-lg shadow-md my-4 text-neutral-300">{additude}</p>
            </div>
        </div>
    )
}