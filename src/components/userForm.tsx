import { useUser } from '../contexts/useUser';
import { Calendar } from './ui/calendar';

import { formatDate } from '@/utils/helper'
import { Input } from './ui/input';
import { Label } from './ui/label';

export function UserForm() {
    const { user, setUser, date, setDate } = useUser();

    const changeName = (name: string) => {
        setUser({ ...user, name });
    }

    return (
        <div className='w-[500px] mx-auto'>
            <div className='py-4'>
                <Input
                    type="text"
                    value={user?.name}
                    onChange={(e) => changeName(e.target.value)}
                    placeholder="Enter your name. Ex: Huy"
                    className='p-2 my-4'
                />
                <br />
                <div className='border border-neutral-600 rounded-lg bg-secondary/30'>
                    <Label className='w-fit mx-auto my-4 text-xl'>
                        {date ? formatDate(date) : "Please select your date of birth!"}
                    </Label>
                    <Calendar
                        className='mx-auto bg-transparent'
                        mode="single"
                        selected={date}
                        numberOfMonths={2}
                        captionLayout="dropdown"
                        onSelect={(date) => {
                            setDate(date)
                        }}
                    />
                </div>

            </div>
        </div>
    )
}