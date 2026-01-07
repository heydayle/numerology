import { createContext, useContext, type ReactNode, useState, useMemo, useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router';

interface Birthday {
    day: number;
    month: number;
    year: number;
}
export interface User {
    id?: string;
    name: string;
    email: string;
    birthday: Birthday | null;
}

interface UserContextType {
    user: User;
    setUser: (user: User) => void;
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
    date: Date | undefined;
    setDate: (date: Date | undefined) => void;
    onChangeName: (name: string) => void;
    onSetBirthday: (date: Date | undefined) => void;

    sumDays: number;
    sumMonths: number;
    sumYears: number;
    mainNumber: number;
    birthdayNumber: number;
    lifeAdtitudeNumber: number;
    vowelNumber: number;
    numberOfName: number;
    peaks: Record<string, any>[]
    peakNumbers: number[]
    challengeNumbers: number[]
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
    const [searchParams] = useSearchParams();
    const [user, setUser] = useState<User>({
        name: '',
        email: '',
        birthday: null
    });
    const [isLoading, setIsLoading] = useState(false);
    const [date, setDate] = useState<Date | undefined>();

    const init = useCallback(() => {
        const name = searchParams.get('name');
        const birthday = searchParams.get('birthday');
        const userTemp = { ...user };

        if (name) {
            userTemp.name = name;
        }
        if (birthday) {
            const dateParam = new Date(birthday);
            setDate(dateParam);
            userTemp.birthday = {
                day: dateParam.getDate(),
                month: dateParam.getMonth(),
                year: dateParam.getFullYear(),
            };
        }

        setUser(userTemp);
    }, [searchParams]);

    useEffect(() => {
        init();
    }, [])

    const sumDays = useMemo(() => {
        if (!date) return 0;
        const day = date.getDate().toString().split('').reduce((acc, curr) => acc + parseInt(curr), 0);
        return day;
    }, [date]);

    const sumMonths = useMemo(() => {
        if (!date) return 0;
        const month = (date.getMonth() + 1).toString().split('').reduce((acc, curr) => acc + parseInt(curr), 0);
        return month;
    }, [date]);
    
    const sumYears = useMemo(() => {
        if (!date) return 0;
        const year = date.getFullYear().toString().split('').reduce((acc, curr) => acc + parseInt(curr), 0);
        return year;
    }, [date]);

    const mainNumber = useMemo(() => {
        const total = sumDays + sumMonths + sumYears;
        if (total === 22) return total;
        if (total > 11) {
            const sumTotal = total.toString().split('').reduce((acc, curr) => acc + parseInt(curr), 0);
            if (sumTotal > 11) return sumTotal.toString().split('').reduce((acc, curr) => acc + parseInt(curr), 0);
            return sumTotal
        } 
        return total;
    }, [sumDays, sumMonths, sumYears]);

    const birthdayNumber = useMemo(() => {
        const total = sumDays;
        return total < 10 ? total : total.toString().split('').reduce((acc, curr) => acc + parseInt(curr), 0);
    }, [sumDays]);

    const lifeAdtitudeNumber = useMemo(() => {
        const total = sumDays + sumMonths;
        return total < 10 ? total : total.toString().split('').reduce((acc, curr) => acc + parseInt(curr), 0);
    }, [sumDays, sumMonths]);

    const VOWELS_VALUE = {
        'A': 1,
        'E': 5,
        'I': 9,
        'J': 1,
        'O': 6,
        'U': 3,
        'Y': 7,
    } as Record<string, number>

    const vowelNumber = useMemo<number>(() => {
        if (!user.name) return 0
        const objVowels = {
            'A': 0,
            'E': 0,
            'I': 0,
            'J': 0,
            'O': 0,
            'U': 0,
            'Y': 0,
        } as Record<string, number>
        const arrName = user.name.toUpperCase().split('')

        arrName.forEach((char) => {
            if (Object.keys(VOWELS_VALUE).includes(char))
                objVowels[char] += VOWELS_VALUE[char]
        })
        let nameValue = 0
        Object.values(objVowels).forEach((value) => nameValue += value)

        if (nameValue > 9) {
            return nameValue.toString().split('').reduce((acc, curr) => acc + parseInt(curr), 0);
        }
        return nameValue
    }, [user])

    const numberOfName = useMemo<number>(() => {
        if (!user.name || !user.birthday) return 0
        const total = vowelNumber + lifeAdtitudeNumber
        if (total < 10) {
            return total
        }
        return total.toString().split('').reduce((acc, curr) => acc + parseInt(curr), 0);
    }, [user])

    const finalSum = (number: number, compareNumber: number) => {
        let sum = number
        
        while (sum > compareNumber) {
            sum = sum.toString().split('').reduce((acc, curr) => acc + parseInt(curr), 0)
        }
        return sum
    }

    const triagle = useMemo(() => {
        const monthPeak = finalSum(sumMonths, 10)
        const dayPeak = finalSum(sumDays, 9)
        const yearPeak = finalSum(sumYears, 9)
        const monthAndDayPeakFloor1 = monthPeak+dayPeak
        const dayAndYearPeakFloor1 = dayPeak+yearPeak
        console.log('year: ', sumYears, yearPeak);
        
        const peak1 = monthAndDayPeakFloor1 > 9 ? monthAndDayPeakFloor1.toString().split('').reduce((acc, curr) => acc + parseInt(curr), 0) : monthAndDayPeakFloor1
        const peak2 = dayAndYearPeakFloor1 > 9 ? dayAndYearPeakFloor1.toString().split('').reduce((acc, curr) => acc + parseInt(curr), 0) : dayAndYearPeakFloor1
        const floor2 = peak1 + peak2
        const peak3 = floor2 > 11 ? floor2.toString().split('').reduce((acc, curr) => acc + parseInt(curr), 0) : floor2
        const peak4 = (monthPeak + yearPeak) > 11 ? (monthPeak + yearPeak).toString().split('').reduce((acc, curr) => acc + parseInt(curr), 0) : (monthPeak + yearPeak)

        const challenge1 = Math.abs(monthPeak - dayPeak)
        const challenge2 = Math.abs(dayPeak - yearPeak)
        const underFloor1 = challenge1 + challenge2
        const challenge3 = Math.abs(challenge1 - challenge2)
        const challenge4 = Math.abs(monthPeak - yearPeak)

        return [
            [0,0,peak4,0,0],
            [0,0,peak3,0,0],
            [0,peak1,floor2,peak2,0],
            [monthPeak,monthAndDayPeakFloor1,dayPeak,dayAndYearPeakFloor1,yearPeak],
            [0,challenge1,underFloor1,challenge2,0],
            [0,0,challenge3,0,0],
            [0,0,challenge4,0,0],
        ]
    }, [mainNumber, sumDays, sumMonths, sumYears])

    const peaks = useMemo(() => {
        if (!date) return [];

        console.log(triagle);
        

        const firstPeak = {
            age: 36 - mainNumber,
            year: date.getFullYear() + (36 - mainNumber),
            peak: triagle[2][1],
            challenge: triagle[4][1]
        }
        return [
            firstPeak,
            {
               age: firstPeak.age + 9,
               year: firstPeak.year + 9,
               peak: triagle[2][3],
               challenge: triagle[4][3]
            },
            {
               age: firstPeak.age + (9*2),
               year: firstPeak.year + (9*2),
               peak: triagle[1][2],
               challenge: triagle[5][2]
            },
            {
               age: firstPeak.age + (9*3),
               year: firstPeak.year + (9*3),
               peak: triagle[0][2],
               challenge: triagle[6][2]
            },
        ]
    }, [mainNumber, user])

    const peakNumbers = useMemo(() => {
        const mappingGetPeaks = peaks.map((item) => item.peak)
        const uniqueNumbers = [...new Set(mappingGetPeaks)];
        return uniqueNumbers
    }, [peaks])

    const challengeNumbers = useMemo(() => {
        const mappingGetChallenge = peaks.map((item) => item.challenge)
        const uniqueNumbers = [...new Set(mappingGetChallenge)];
        return uniqueNumbers
    }, [peaks])

    const onChangeName = (name: string) => {
        setUser((prev) => ({
            ...prev,
            name: name,
        }));
    }

    const onSetBirthday = useCallback((date: Date | undefined) => {
        if (!date) return
        setUser((prevState) => ({
            ...prevState,
            birthday: {
                day: date.getDate(),
                month: date.getMonth(),
                year: date.getFullYear(),
            }
        }));
    }, [date]);

    const data = {
        user,
        setUser,
        isLoading,
        setIsLoading,
        date,
        setDate,
        onChangeName,
        onSetBirthday,
        sumDays,
        sumMonths,
        sumYears,
        mainNumber,
        birthdayNumber,
        lifeAdtitudeNumber,
        vowelNumber,
        numberOfName,
        peaks,
        peakNumbers,
        challengeNumbers,
    }

    return (
        <UserContext.Provider value={{ ...data }}>
            {children}
        </UserContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}