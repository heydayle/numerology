import { createContext, useContext, type ReactNode, useState, useMemo, useCallback, useEffect } from 'react';

interface Birthday {
    day: number;
    month: number;
    year: number;
}
interface User {
    id?: string;
    name: string;
    email: string;
    birthday: Birthday | null;
}

interface UserContextType {
    user: User;
    setUser: (user: User) => void;
    isLoading: boolean;
    setIsLoading?: (isLoading: boolean) => void;
    date: Date | undefined;
    setDate: (date: Date | undefined) => void;

    sumDays: number;
    sumMonths: number;
    sumYears: number;
    mainNumber: number;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User>({
        name: '',
        email: '',
        birthday: null
    });
    const [isLoading, setIsLoading] = useState(false);
    const [date, setDate] = useState<Date | undefined>();

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
        return total < 10 ? total : total.toString().split('').reduce((acc, curr) => acc + parseInt(curr), 0);
    }, [sumDays, sumMonths, sumYears]);

    const updateBirthday = useCallback(() => {
        if (!date) return
        setUser({ ...user, birthday: {
            day: date?.getDate(),
            month: date?.getMonth(),
            year: date?.getFullYear(),
        }})
    }, [date])

    useEffect(() => {
        updateBirthday()
    }, [date])

    return (
        <UserContext.Provider value={{ user, setUser, isLoading, setIsLoading, date, setDate, sumDays, sumMonths, sumYears, mainNumber }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}