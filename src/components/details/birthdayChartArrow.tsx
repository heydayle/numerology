import { useMemo } from "react"
import { getBirthdayArrowMeaning } from "@/assets/MapBirthdayArrowChartByLocales"
import { BlockDetail } from "../blockDetail"
import { useTranslation } from "react-i18next"
import type { Grid } from "./birthdayChart"

type BirthdayChartArrowProps = {
    grid: Grid
}
export function BirthdayChartArrow(props: BirthdayChartArrowProps) {
    const LOCALES = 'vi'
    const { t } = useTranslation();

    const meaningByChart = useMemo(() => {
        return getBirthdayArrowMeaning(LOCALES, props.grid)
    }, [props])

    return (
        <div>
            {meaningByChart && 
                <div className="mt-6">
                    <h2 className="my-4 text-center text-xl font-bold uppercase">
                        {t('This is an explanation for your birth chart')}
                    </h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {meaningByChart.arrowMeaningMapping.map((mean, index) => {
                            return (
                                <BlockDetail
                                    className={index === 8 ? 'lg:col-span-2' : ''}
                                    type={mean.title}
                                    style="text-blue-500"
                                    title={mean.title}
                                    description={mean.description}
                                />
                            )
                        })}
                    </div>
                </div>
            }
        </div>
    )

}