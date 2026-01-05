import { useUser } from "@/contexts/useUser"
import { useTranslation } from "react-i18next"
import { BirthdayChartAnalysis } from "./birthdayChartAnalysis"
import { BirthdayChartArrow } from "./birthdayChartArrow"
import { useMemo } from "react"
import { getBirthdayArrowMeaning } from "@/assets/MapBirthdayArrowChartByLocales"

export type NumerologyChart = Record<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9, string>

function pad2(n: number) {
  return String(n).padStart(2, "0")
}

function pad4(n: number) {
  return String(n).padStart(4, "0")
}

/**
 * Gom các chữ số (ddMMyyyy) vào chart 1..9, bỏ số 0
 * Ví dụ 01-01-1999 => digits: 0,1,0,1,1,9,9,9 => chart[1] = "111", chart[9] = "999"
 */
export function buildNumerologyChart(date: Date): NumerologyChart {
  const dd = pad2(date.getDate())
  const mm = pad2(date.getMonth() + 1)
  const yyyy = pad4(date.getFullYear())

  const digits = (dd + mm + yyyy)
    .split("")
    .map((ch) => Number(ch))
    .filter((d) => d >= 1 && d <= 9)

  const counts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 }
  for (const d of digits) counts[d]++

  const chart = {
    1: "1".repeat(counts[1]),
    2: "2".repeat(counts[2]),
    3: "3".repeat(counts[3]),
    4: "4".repeat(counts[4]),
    5: "5".repeat(counts[5]),
    6: "6".repeat(counts[6]),
    7: "7".repeat(counts[7]),
    8: "8".repeat(counts[8]),
    9: "9".repeat(counts[9]),
  } as NumerologyChart

  return chart
}

/**
 * (Tuỳ chọn) Lo Shu grid: 
 * 3 6 9
 * 2 5 8
 * 1 4 7
 */
export type Grid = string[][] & [][]

export function buildLoShuGrid(date: Date): Grid {
  const c = buildNumerologyChart(date)
  return [
    [c[3] || "", c[6] || "", c[9] || ""],
    [c[2] || "", c[5] || "", c[8] || ""],
    [c[1] || "", c[4] || "", c[7] || ""],
  ] as any
}

export function BirthdayChart() {
    const LOCALES = 'vi'
    const { t } = useTranslation();
    const { user } = useUser();
    if (!user.birthday) {
        return null;
    }

    const date = new Date(user.birthday.year, user.birthday.month, user.birthday.day);

    const chart = buildNumerologyChart(date) // {1:"111",2:"",...,9:"999"}
    const loShuGrid = buildLoShuGrid(date) as Grid
    const itemClass = "w-28 h-28 border p-4 flex items-center justify-center bg-neutral-800/20 filter backdrop-blur-sm"

    const renderItem = (value: string) => {
        return (
            <div className={itemClass}>
                <div className="text-4xl">{value || ""}</div>
            </div>
        )
    }

    const arrowMeaningWithPositions = useMemo(() => {
      return getBirthdayArrowMeaning(LOCALES, loShuGrid)
    }, [loShuGrid])

    const renderArrows = () => {
      const positions = arrowMeaningWithPositions?.positions || []

      return positions.map((items) => (<div className={`absolute h-[0.5px] w-full border-b border-b-yellow-400 animated-line ${items}`} />))
    }

    return (
        <div id="birthday-chart" className="flex flex-col">
            {<div className="mt-4 text-center">
                <h2 className="text-lg font-bold mb-6 uppercase">{t('birthday chart')}</h2>
                <div className="relative max-w-xs mx-auto">
                  <div className="grid grid-cols-3 gap-4 max-w-xs mx-auto text-center">
                      {renderItem(loShuGrid[0][0])}
                      {renderItem(loShuGrid[0][1])}
                      {renderItem(loShuGrid[0][2])}
                  </div>
                  <div className="grid grid-cols-3 gap-4 max-w-xs mx-auto text-center">
                      {renderItem(loShuGrid[1][0])}
                      {renderItem(loShuGrid[1][1])}
                      {renderItem(loShuGrid[1][2])}
                  </div>
                  <div className="grid grid-cols-3 gap-4 max-w-xs mx-auto text-center">
                      {renderItem(loShuGrid[2][0])}
                      {renderItem(loShuGrid[2][1])}
                      {renderItem(loShuGrid[2][2])}
                  </div>
                  <div className="w-full">
                    {renderArrows()}
                  </div>
                </div>
            </div>}
            <div>
                <BirthdayChartAnalysis chartValue={chart} />
            </div>
            <div>
                <BirthdayChartArrow meaningByChart={arrowMeaningWithPositions?.arrowMeaningMapping || []} />
            </div>
        </div>
    )
}
