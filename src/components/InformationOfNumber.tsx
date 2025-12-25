import { KeyNumberProvider } from "@/contexts/useKeyNumber";
import { useUser } from "@/contexts/useUser";
import { DetailsNumber } from "./detailsNumber";

export function InformationOfNumber() {
    const { mainNumber } = useUser();

    return (
        <KeyNumberProvider keyNumber={mainNumber}>
            <DetailsNumber />
        </KeyNumberProvider>
    )
}