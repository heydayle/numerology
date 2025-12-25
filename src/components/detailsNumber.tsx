import { useKeyNumber } from "@/contexts/useKeyNumber";
import { KeyNumber } from "./keyNumber";
import { typeKeyNumbersStrings } from "@/assets/MapKeyNumberByLocales";

export function DetailsNumber() {
    const { general } = useKeyNumber();
    return (
        <>
            <KeyNumber />
            <div className="flex flex-col gap-2">
                {typeKeyNumbersStrings.map((type) => {
                    const info = (general as any)[type];
                    return info?.description ? (
                        <div key={type} className="px-4 py-6 bg-neutral-800 rounded-lg shadow-md my-4">
                            <h3 className={`text-xl font-semibold mb-2 ${info.style}`}>{info.title}</h3>
                            <p className="text-neutral-400">{info.description}</p>
                        </div>
                    ) : null;
                })}
            </div>
            
        </>
    )
}