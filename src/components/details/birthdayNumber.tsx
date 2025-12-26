import { useKeyNumber } from "@/contexts/useKeyNumber";
import { useUser } from "@/contexts/useUser";
import { BlockDetail } from "../blockDetail";
import { useTranslation } from "react-i18next";

export function BirthdayNumber() {
    const { t } = useTranslation();
    const { birthdayNumber, lifeAdtitudeNumber, isLoading } = useUser();
    const { birthday, additude } = useKeyNumber();
    return (
        <div className="grid grid-cols-2 gap-4">
            <div className="l">
                <div className="text-center my-4">
                    <h2 className="text-2xl font-bold uppercase">{t("birthday number")}</h2>
                    <div className="mt-2 text-6xl font-extrabold text-yellow-600">{birthdayNumber}</div>
                    <div className="mt-4 border-b border-dashed border-yellow-400 w-24 mx-auto"></div>
                </div>
                <BlockDetail
                    type="birthday"
                    description={birthday as string}
                    isLoading={isLoading}
                />
            </div>
            <div className="">
                <div className="text-center my-4">
                    <h2 className="text-2xl font-bold uppercase">{t("life additude")}</h2>
                    <div className="mt-2 text-6xl font-extrabold text-yellow-600">{lifeAdtitudeNumber}</div>
                    <div className="mt-4 border-b border-dashed border-yellow-400 w-24 mx-auto"></div>
                </div>
                <BlockDetail
                    type="birthday"
                    description={additude as string}
                    isLoading={isLoading}
                />
            </div>
        </div>
    )
}