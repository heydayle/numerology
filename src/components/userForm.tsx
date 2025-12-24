import { useState } from 'react'
import { useUser } from '../contexts/useUser';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { formatDate } from '@/utils/helper'
import { Input } from './ui/input';

export function UserForm() {
    const { user, setUser, date, setDate } = useUser();
    const [open, setOpen] = useState(false);

    const changeName = (name: string) => {
        setUser({ ...user, name });
    }

    return (
        <div className='w-md mx-auto'>
            <div className='py-4'>
                <Input
                    type="text"
                    value={user?.name}
                    onChange={(e) => changeName(e.target.value)}
                    placeholder="Enter your name"
                    className='p-2 my-4'
                />
                <br />
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        id="date"
                        className="w-full justify-between font-normal"
                    >
                        {date ? formatDate(date) : "Select date"}
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
        </div>
    )
}