import { useUser } from "@/contexts/useUser";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { Star } from "lucide-react"

export function Peaks() {
    const { t } = useTranslation();
    const { peaks, setIsLoading } = useUser();

    let timeoutId: ReturnType<typeof setTimeout>;
    const createTimeout = () => {
        timeoutId = setTimeout(() => setIsLoading(false), 1000); 
    };

    useEffect(() => {
        clearTimeout(timeoutId);
        setIsLoading(true);
        createTimeout();
    }, [peaks]);

    return (
        <>
            <div id="peaks-and-challenges" className="mt-6 text-center my-4">
                <div className="flex gap-2 justify-center items-center">
                    <h2 className="text-2xl font-bold uppercase">{t("peak and challenge")}</h2>
                </div>
                <div className="mt-4 border-b border-dashed border-yellow-400 w-24 mx-auto"></div>
            </div>
            <div className="text-lg">
                Đường đời con người qua bốn đỉnh Kim Tử Tháp: các con số ở đỉnh Kim Tử Tháp mang đến những thông tin bổ sung cho Con số chủ đạo, qua đó bạn hình dung được trong đoạn đường đời đó bạn nên thiên về hướng nào thì mới đạt được thành công vượt trội. Hãy nhớ rằng để đỉnh cao thực sự là đỉnh cao năng lực bạn thì ngay từ những năm trước đó phải có sự chuẩn bị, sẵn sàng, học hỏi và khảo nghiệm.
            </div>
            <div className="mt-4 grid grid-cols-4 gap-4">
                {
                     peaks.map((item) => { 
                        return <div className="grid grid-cols-1 gap-4 p-4 border rounded-lg bg-b;ack/20 filter backdrop-blur-sm">
                                    <Star />
                                    <div className="font-bold">{item.year}</div>
                                    <div>{t('Age')}: <b>{item.age}</b></div>
                                    <div>{t('Peak')}: <b>{item.peak}</b></div>
                                    <div>{t('Challenge')}: <b>{item.challenge}</b></div>
                                </div>
                    })
                }
            </div>
        </>
    )
}