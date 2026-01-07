import { useKeyNumber } from "@/contexts/useKeyNumber";
import { useUser } from "@/contexts/useUser";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import CountUp from "../bits/CountUp";
import { BlockDetail } from "../blockDetail";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Button } from "../ui/button";

export function DetailsNameNumber() {
    const { t } = useTranslation();
    const { name } = useKeyNumber();
    const { vowelNumber, lifeAdtitudeNumber, numberOfName, isLoading, setIsLoading } = useUser();

    let timeoutId: ReturnType<typeof setTimeout>;
    const createTimeout = () => {
        timeoutId = setTimeout(() => setIsLoading(false), 1000); 
    };

    useEffect(() => {
        clearTimeout(timeoutId);
        setIsLoading(true);
        createTimeout();
    }, [numberOfName]);

    return (
        <>
            <div id="power-of-name" className="mt-6 text-center my-4">
                <div className="flex gap-2 justify-center items-center">
                    <h2 className="text-2xl font-bold uppercase">{t("power of your name")}</h2>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="outline" size="icon" className="rounded-full">?</Button>
                        </TooltipTrigger>
                        <TooltipContent color="neutral" className="w-120 p-4 text-md text-primary bg-neutral-800 border border-neutral-700">
                            {t("name number subtitle")}
                        </TooltipContent>
                    </Tooltip>
                </div>
                
                <div className="mt-2 text-8xl font-extrabold text-yellow-600">
                    {numberOfName && <CountUp from={100} to={numberOfName} direction="up"/>}
                </div>
                <div className="mt-4 border-b border-dashed border-yellow-400 w-24 mx-auto"></div>
            </div>
            <div>
                {name.character && <p className="py-4 text-lg">{t('character style')}<span className="font-bold text-red-400">{name.character}</span></p>}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {name.destiny && 
                    <BlockDetail
                        key="name-destiny"
                        type="name-destiny"
                        style={'text-yellow-400 text-lg'}
                        title={t('your soul number', { numberOfName: numberOfName})}
                        description={name.destiny}
                        isLoading={isLoading}
                        />}

                    {name.vowel && 
                        <BlockDetail
                            key="name-vowel"
                            type="name-vowel"
                            style={'text-yellow-400 text-lg'}
                            title={t('your deepest purpose in life', { vowelNumber })}
                            description={name.vowel}
                            isLoading={isLoading}
                         />}

                    {name.additude && 
                        <BlockDetail
                            key="name-additude"
                            type="name-additude"
                            style={'text-yellow-400 text-lg'}
                            title={t('the personality you interact', { lifeAdtitudeNumber })}
                            description={name.additude}
                            isLoading={isLoading}
                         />}
            </div>
            
        </>
    )
}