import { useMemo } from "react"
import type { NumerologyChart } from "./birthdayChart"
import { getBirthdayChartMeaning } from "@/assets/MapBirthdayChartMeaningByLocales"
import { BlockDetail } from "../blockDetail"
import { useTranslation } from "react-i18next"

type BirthdayChartAnalysisProps = {
    chartValue: NumerologyChart
}
export function BirthdayChartAnalysis(props: BirthdayChartAnalysisProps) {
    const LOCALES = 'vi'
    const { t } = useTranslation();

    const convertEmptyToNumber = useMemo(() => {
        console.log(props.chartValue);
        const temp = {
            ...props.chartValue
        } as Record<string, string>

        for(const [key, value] of Object.entries(props.chartValue)) {
            temp[key] = value || `-${key}`
        }
        return temp
    }, [props])

    const meaningByChart = useMemo(() => {
        const data = getBirthdayChartMeaning(LOCALES, convertEmptyToNumber)
        console.log(data);
        
        return data
    }, [convertEmptyToNumber])

    const renderMeanings = useMemo(() => {
        if (!meaningByChart) return null

        const convertToArray: { key: string, title: string, description: string }[] = []
        for (const [key, value] of Object.entries(meaningByChart)) {
            const countNumber = Number(value.value) < 0 ? 0 : value.value.split('').length
            const title = countNumber < 1
                ? t('not have number in birthday chart', { number: key })
                : t('have number in birthday chart', { count: countNumber, number: key })
            convertToArray.push({ key, description: value.description, title })
        }
        return convertToArray
    }, [meaningByChart])

    return (
        <div>
            {renderMeanings && 
                <div className="mt-4">
                    <h2 className="my-4 text-center text-xl font-bold uppercase">
                        {t('This is an explanation for your birth chart')}
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                        {renderMeanings.map((mean, index) => {
                            return (
                                <BlockDetail
                                    className={index === 8 ? 'col-span-2' : ''}
                                    type={mean.key}
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