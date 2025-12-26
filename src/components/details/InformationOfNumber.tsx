import { KeyNumberProvider } from "@/contexts/useKeyNumber";
import { useUser } from "@/contexts/useUser";
import { DetailsNumber } from "./detailsNumber";
import { BirthdayNumber } from "./birthdayNumber";
import { BirthdayChart } from "./birthdayChart";

export function InformationOfNumber() {
    const { mainNumber, birthdayNumber, lifeAdtitudeNumber } = useUser();

    return (
        <KeyNumberProvider
            keyNumber={mainNumber}
            birthdayNumber={birthdayNumber}
            lifeAdtitudeNumber={lifeAdtitudeNumber}
        >   
            <DetailsNumber />
            <hr className="my-4"/>
            <BirthdayNumber />
            <hr className="my-4"/>
            <BirthdayChart />
        </KeyNumberProvider>
    )
}