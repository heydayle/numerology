import { useKeyNumber } from "@/contexts/useKeyNumber";
import { typeLifePathNumbersStrings, type GeneralItemType } from "@/assets/MapKeyNumberByLocales";
import { useUser } from "@/contexts/useUser";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import CountUp from "./bits/CountUp";
import { BlockDetail } from "./blockDetail";

export function DetailsNumber() {
    const { t } = useTranslation();
    const { general } = useKeyNumber();
    const { mainNumber, isLoading, setIsLoading } = useUser();

    const createTimeout = () => {
        setTimeout(() => setIsLoading(false), 1000); 
    };

    useEffect(() => {
        clearTimeout(createTimeout as unknown as number);
        setIsLoading(true);
        createTimeout();
    }, [mainNumber, isLoading, setIsLoading]);

    return (
        <>
            <div className="mt-4 text-center my-4">
                <h2 className="text-2xl font-bold uppercase">Life path number</h2>
                <div className="mt-2 text-8xl font-extrabold text-yellow-600">
                    <CountUp from={100} to={mainNumber} direction="up"/>
                </div>
                <div className="mt-4 border-b border-dashed border-yellow-400 w-24 mx-auto"></div>
            </div>
            <div className="grid grid-cols-3 gap-4">
                {typeLifePathNumbersStrings.map((type) => {
                    const info = (general as any)[type] as GeneralItemType;
                    return info?.description ? (
                        <BlockDetail
                            key={type}
                            type={type}
                            style={info.style}
                            title={t(info.title)}
                            description={info.description}
                            isLoading={isLoading}
                        />
                    ) : null;
                })}
            </div>
            
        </>
    )
}