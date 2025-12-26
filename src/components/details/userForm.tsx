import { useUser } from '../../contexts/useUser';
import { Calendar } from '../ui/calendar';

import { formatDate } from '@/utils/helper'
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useTranslation } from 'react-i18next';

export function UserForm() {
    const { t } = useTranslation();
    const { user, date, setDate, onChangeName, onSetBirthday } = useUser();

    return (
        <div className='w-[500px] mx-auto'>
            <div className='py-4'>
                <Input
                    type="text"
                    value={user.name}
                    onChange={(e) => onChangeName(e.target.value)}
                    placeholder={t("enter your name")}
                    className='p-2 my-4'
                />
                <br />
                <div className='border border-neutral-800 rounded-xl bg-secondary/30 filter backdrop-blur-sm pb-4'>
                    <Label className='w-fit mx-auto my-4 text-xl'>
                        {date ? formatDate(date) : t("please select your birthday")}
                    </Label>
                    <Calendar
                        className='mx-auto bg-transparent'
                        mode="single"
                        selected={date}
                        numberOfMonths={2}
                        captionLayout="dropdown"
                        onSelect={(date) => {
                            setDate(date)
                            onSetBirthday(date)
                        }}
                    />
                </div>

            </div>
        </div>
    )
}