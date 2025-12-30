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

    return (
        <UserContext.Provider value={{ user, setUser, isLoading, setIsLoading, date, setDate, onChangeName, onSetBirthday, sumDays, sumMonths, sumYears, mainNumber, birthdayNumber, lifeAdtitudeNumber }}>
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