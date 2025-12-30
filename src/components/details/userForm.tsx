import { useUser } from '../../contexts/useUser';
import { Calendar } from '../ui/calendar';
import { useMask } from '@react-input/mask';
import { format, isValid, parse } from "date-fns";

import { formatDate } from '@/utils/helper'
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useTranslation } from 'react-i18next';
import { Calendar1 } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { useEffect, useState } from 'react';

export function UserForm() {
    const { t } = useTranslation();
    const { user, date, setDate, onChangeName, onSetBirthday } = useUser();
    const [inputDate, setInputDate] = useState("")

    useEffect(() => {
        if (!date) return
        const converToInput = format(date, 'dd/MM/yyyy')
        setInputDate(converToInput)
    })

    const onChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputDate(e.target.value)
        const parseDate = parse(e.target.value, 'dd/MM/yyyy', new Date())
        if (isValid(parseDate)) {
            setDate(parseDate)
            onSetBirthday(parseDate)
        } else {
            setDate(undefined)
            onSetBirthday(undefined)
        }
    }

    const onSelectDate = (date: Date | undefined) => {
        if (!date) {
            setDate(undefined)
            setInputDate("")
            return
        }
        setDate(date)
        onSetBirthday(date)
        const converToInput = format(date, 'dd/MM/yyyy')
        setInputDate(converToInput)
    }

    const inputDateRef = useMask({
        mask: 'dd/MM/yyyy',
        replacement: { d: /\d/, M: /\d/, y: /\d/ },
        showMask: true,
    });
    
    return (
        <div className='md:w-[500px] mx-auto'>
            <div className='py-4'>
                <Input
                    type="text"
                    value={user.name}
                    onChange={(e) => onChangeName(e.target.value)}
                    placeholder={t("enter your name")}
                    className='h-12 text-xl p-2 my-4'
                />
                <br />
                <div className='pb-4'>
                    <div className='relative'>
                        <Input
                            ref={inputDateRef}
                            className='h-12 text-xl'
                            placeholder='dd/MM/yyyy | ex: 24/11/1996'
                            value={inputDate}
                            onChange={onChangeDate}
                        />
                        <Popover>
                            <PopoverTrigger>
                                <Calendar1 className='absolute top-2 right-2 text-neutral-500 cursor-pointer' />
                            </PopoverTrigger>
                            <PopoverContent align='end' className='mt-2'>
                                <Calendar
                                    className='bg-transparent'
                                    mode="single"
                                    selected={date}
                                    captionLayout="dropdown"
                                    onSelect={(date) => {
                                        onSelectDate(date)
                                    }}
                                />
                            </PopoverContent>
                        </Popover>
                        <Label className='w-fit mx-auto my-4 text-xl'>
                            {date ? formatDate(date) : t("please select your birthday")}
                        </Label>
                    </div>
                    
                    
                </div>

            </div>
        </div>
    )
}