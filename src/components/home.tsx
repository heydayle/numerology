import { useUser } from '../contexts/useUser';
import { UserForm } from './userForm';

export function Home() {
    const { mainNumber } = useUser();

    return (
        <div className='p-6'>
            <h1 className='text-lg'>Numberology</h1>
            <UserForm />
            <div>Main Number: { mainNumber }</div>
        </div>
    )
}