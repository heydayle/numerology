import { useKeyNumber } from "@/contexts/useKeyNumber";
import { BlockDetail } from "../blockDetail";
import { useTranslation } from "react-i18next";

export function CycleNineYears() {
    const { t } = useTranslation();
    const { cycleMeanings } = useKeyNumber();
    return (
        <div id="cycle-nice-years" className="mt-6">
            <div className="py-4 text-center">
                <h2 className="text-center text-2xl font-bold uppercase">{t("cycle nine years change")}</h2>
                <p>({t('the last three years')})</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-1 gap-4">
                {
                    cycleMeanings.map((item) => {
                        return <div className="">
                            <div>
                                <BlockDetail
                                    highlight={true}
                                    type={item.year.toString()}
                                    title={`<div className="px-2 text-lg">${item.year} - ${t('cycle nine years', {
                                        cycle: item.cycle,
                                        from: item.from + item.year,
                                        to: item.to + item.year
                                    })}</div>`}
                                    description={item.description}
                                    style="text-yellow-400"
                                />
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    )
}