import { KeyNumberProvider } from "@/contexts/useKeyNumber";
import { useUser } from "@/contexts/useUser";
import { DetailsNumber } from "./detailsNumber";
import { BirthdayNumber } from "./birthdayNumber";
import { BirthdayChart } from "./birthdayChart";
import { DetailsNameNumber } from "./detailsNameNumber";
import { AppSidebar } from "../asideMenu";
import { Peaks } from "./peaks";

export function InformationOfNumber() {
    const { mainNumber, birthdayNumber, lifeAdtitudeNumber, vowelNumber, numberOfName } = useUser();

    return (
        <>
            <AppSidebar />
            <KeyNumberProvider
                keyNumber={mainNumber}
                birthdayNumber={birthdayNumber}
                lifeAdtitudeNumber={lifeAdtitudeNumber}
                vowelNumber={vowelNumber}
                nameNumber={numberOfName}
            >   
                <DetailsNumber />
                <hr className="my-4"/>
                <BirthdayNumber />
                <hr className="my-4"/>
                <BirthdayChart />
                <hr className="my-4"/>
                <DetailsNameNumber />
                <hr className="my-4"/>
                <Peaks />
            </KeyNumberProvider>
        </>
    )
}