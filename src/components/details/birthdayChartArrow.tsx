import { BlockDetail } from "../blockDetail"
import { useTranslation } from "react-i18next"
import type { Arrow } from "@/assets/locales/vietnamese"

type BirthdayChartArrowProps = {
    meaningByChart: Arrow[] | null
}
export function BirthdayChartArrow(props: BirthdayChartArrowProps) {
    const { t } = useTranslation();

    return (
        <div id="birthday-arrow">
            {props.meaningByChart && 
                <div className="mt-6">
                    <h2 className="my-4 text-yellow-600 text-center text-xl font-bold uppercase">
                        {t('This is an explanation for your arrow of birth chart')}
                    </h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {props.meaningByChart.map((mean, index) => {
                            return (
                                <BlockDetail
                                    className={index === 8 ? 'lg:col-span-2' : ''}
                                    type={mean?.title}
                                    style="text-blue-500"
                                    title={mean?.title}
                                    description={mean?.description}
                                />
                            )
                        })}
                    </div>
                </div>
            }
        </div>
    )

}