import { useUser } from "@/contexts/useUser";
import { useKeyNumber } from "@/contexts/useKeyNumber";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { Star, MountainSnow, Flag } from "lucide-react"

export function Peaks() {
    const romanNumber = ['I', 'II', 'III', 'IV']
    const { t } = useTranslation();
    const { peaks, setIsLoading } = useUser();
    const { peakMeanings, challengeMeanings } = useKeyNumber();

    let timeoutId: ReturnType<typeof setTimeout>;
    const createTimeout = () => {
        timeoutId = setTimeout(() => setIsLoading(false), 1000); 
    };

    useEffect(() => {
        clearTimeout(timeoutId);
        setIsLoading(true);
        createTimeout();
    }, [peaks]);

    const MeaningBlock = (item: { title: number, description: string | number | undefined }, isPeak: boolean = true) => {
        return (
            <div id={`${isPeak ? "peak" : "challenge"}-${item.title}`} className="flex flex-col gap-4 p-4 border rounded-lg bg-b;ack/20 filter backdrop-blur-sm gap-4">
                <div className="flex justify-between items-center gap-4 font-mono font-bold">
                    <span>
                        {isPeak ? t('Peak with number') : t('Challenge with number')}
                        {' '}
                        <span className={isPeak ? "text-yellow-400" : "text-blue-500"}>[{item.title}]</span>
                    </span>
                    {isPeak
                        ? <Star className="text-yellow-500 fill-yellow-500" />
                        : <MountainSnow className="text-blue-500 fill-blue-500" />}
                </div>
                <hr />
                <div className="text-lg whitespace-pre-line">{item.description}</div>
            </div>
        )
    }

    return (
        <>
            <div id="peaks-and-challenges" className="mt-6 text-center my-4">
                <div className="flex gap-2 justify-center items-center">
                    <h2 className="text-2xl font-bold uppercase">{t("peak and challenge")}</h2>
                </div>
                <div className="mt-4 border-b border-dashed border-yellow-400 w-24 mx-auto"></div>
            </div>
            <div className="text-lg italic">
                Đường đời con người qua bốn đỉnh Kim Tử Tháp: các con số ở đỉnh Kim Tử Tháp mang đến những thông tin bổ sung cho Con số chủ đạo, qua đó bạn hình dung được trong đoạn đường đời đó bạn nên thiên về hướng nào thì mới đạt được thành công vượt trội. Hãy nhớ rằng để đỉnh cao thực sự là đỉnh cao năng lực bạn thì ngay từ những năm trước đó phải có sự chuẩn bị, sẵn sàng, học hỏi và khảo nghiệm.
            </div>
            <div className="mt-4 grid grid-cols-4 gap-4">
                {
                     peaks.map((item, index) => { 
                        return <div className="grid grid-cols-1 gap-4 p-4 border border-yellow-500 rounded-lg bg-b;ack/20 filter backdrop-blur-sm">
                                    <div className="flex justify-between items-center gap-4 font-mono font-bold"><span>{(romanNumber[index]) + ' - ' + item.year }</span><Flag className="text-yellow-500 fill-yellow-500" /></div>
                                    <hr />
                                    <div>{t('Age')}: <b>{item.age}</b></div>
                                    <a href={`#peak-${item.peak}`} className="flex items-center gap-2"><Star size={16} className="fill-yellow-500 text-yellow-500"/>{t('Peak')}: <b className="text-yellow-400">[{item.peak}]</b></a>
                                    <a href={`#peak-${item.challenge}`} className="flex items-center gap-2"><MountainSnow size={16} className="fill-blue-500 text-blue-500"/>{t('Challenge')}: <b className="text-blue-400">[{item.challenge}]</b></a>
                                </div>
                    })
                }
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4 text-lg">
                {peakMeanings.map((item) => {
                    return MeaningBlock(item)
                })}
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4 text-lg">
                {challengeMeanings.map((item) => {
                    return MeaningBlock(item, false)
                })}
            </div>
        </>
    )
}