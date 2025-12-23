import { useState } from 'react'
import { useUser } from '../contexts/useUser';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import { ChevronDownIcon } from '@radix-ui/react-icons';

export function Home() {
    const { user, setUser, date, setDate, mainNumber } = useUser();
    const [open, setOpen] = useState(false);

    const changeName = (name: string) => {
        setUser({ ...user, name });
    }

    return (
        <div className='p-6'>
            <h1 className='text-lg'>Numberology</h1>
            <div className='py-4'>
                <input
                    type="text"
                    value={user?.name}
                    onChange={(e) => changeName(e.target.value)}
                    placeholder="Enter your name"
                    className='py-2 my-4'
                />
                <br />
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        id="date"
                        className="w-48 justify-between font-normal"
                    >
                        {date ? date.toLocaleDateString() : "Select date"}
                        <ChevronDownIcon />
                    </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={date}
                        captionLayout="dropdown"
                        onSelect={(date) => {
                        setDate(date)
                        setOpen(false)
                        }}
                    />
                    </PopoverContent>
                </Popover>
            </div>
            <div>Main Number: { mainNumber }</div>
        </div>
    )
}