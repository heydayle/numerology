import { useKeyNumber } from "@/contexts/useKeyNumber";
import { typeLifePathNumbersStrings } from "@/assets/MapKeyNumberByLocales";
import { useUser } from "@/contexts/useUser";
import { useTranslation } from "react-i18next";

export function DetailsNumber() {
    const { t } = useTranslation();
    const { general } = useKeyNumber();
    const { mainNumber } = useUser();
    return (
        <>
            <div className="mt-4 text-center my-4">
                <h2 className="text-2xl font-bold uppercase">Life path number</h2>
                <div className="mt-2 text-6xl font-extrabold text-yellow-600">{mainNumber}</div>
                <div className="mt-4 border-b border-dashed border-yellow-400 w-24 mx-auto"></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                {typeLifePathNumbersStrings.map((type) => {
                    const info = (general as any)[type];
                    return info?.description ? (
                        <div key={type} className="px-4 py-6 bg-neutral-900 rounded-lg shadow-md">
                            <h3 className={`text-xl font-semibold mb-2 ${info.style}`}>{ t(info.title) }</h3>
                            <p className="text-neutral-300 whitespace-pre-line">{info.description}</p>
                        </div>
                    ) : null;
                })}
            </div>
            
        </>
    )
}