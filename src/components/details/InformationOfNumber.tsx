import { KeyNumberProvider } from "@/contexts/useKeyNumber";
import { useUser } from "@/contexts/useUser";
import { DetailsNumber } from "./detailsNumber";
import { BirthdayNumber } from "./birthdayNumber";
import { BirthdayChart } from "./birthdayChart";
import { DetailsNameNumber } from "./detailsNameNumber";
import { AppSidebar } from "../asideMenu";
import { Peaks } from "./peaks";
import { CycleNineYears } from "./cycleNineYears";

export function InformationOfNumber() {
    const { mainNumber, birthdayNumber, lifeAdtitudeNumber, vowelNumber, numberOfName, peakNumbers, challengeNumbers, cycleNumber } = useUser();

    return (
        <>
            <AppSidebar />
            <KeyNumberProvider
                keyNumber={mainNumber}
                birthdayNumber={birthdayNumber}
                lifeAdtitudeNumber={lifeAdtitudeNumber}
                vowelNumber={vowelNumber}
                nameNumber={numberOfName}
                peakNumbers={peakNumbers}
                challengeNumbers={challengeNumbers}
                cycleNumber={cycleNumber}
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
                <hr className="my-4"/>
                <CycleNineYears />
            </KeyNumberProvider>
        </>
    )
}