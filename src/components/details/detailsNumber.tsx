import { useKeyNumber } from "@/contexts/useKeyNumber";
import { typeLifePathNumbersStrings, type GeneralItemType } from "@/assets/MapKeyNumberByLocales";
import { useUser } from "@/contexts/useUser";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import CountUp from "../bits/CountUp";
import { BlockDetail } from "../blockDetail";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Button } from "../ui/button";

export function DetailsNumber() {
    const { t } = useTranslation();
    const { general } = useKeyNumber();
    const { mainNumber, isLoading, setIsLoading } = useUser();

    let timeoutId: ReturnType<typeof setTimeout>;
    const createTimeout = () => {
        timeoutId = setTimeout(() => setIsLoading(false), 1000); 
    };

    useEffect(() => {
        clearTimeout(timeoutId);
        setIsLoading(true);
        createTimeout();
    }, [mainNumber]);

    return (
        <>
            <div id="life-path-number" className="mt-4 text-center my-4">
                <div className="flex gap-2 justify-center items-center">
                    <h2 className="text-2xl font-bold uppercase">{t("life path number")}</h2>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="outline" size="icon" className="rounded-full">?</Button>
                        </TooltipTrigger>
                        <TooltipContent color="neutral" className="w-120 p-4 text-md text-primary bg-neutral-800 border border-neutral-700">
                            {t("life path number subtitle")}
                        </TooltipContent>
                    </Tooltip>
                </div>
                
                <div className="mt-2 text-8xl font-extrabold text-yellow-400">
                    <CountUp from={100} to={mainNumber} direction="up"/>
                </div>
                <div className="mt-4 border-b border-dashed border-yellow-400 w-24 mx-auto"></div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
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