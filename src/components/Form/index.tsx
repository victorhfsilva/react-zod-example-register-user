import { SubmitHandler, useForm } from 'react-hook-form';
import './styles.css'
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import InputMask from 'react-input-mask';
import { useState } from 'react';

const UserSchema = z.object({
    name: z.string().trim().min(2, "Name is required."),
    birthday: z.coerce.date().max(new Date(), "Invalid date."),
    email: z.string().trim().email("Invalid Email.").transform((val) => val.toLowerCase),
    cellphone: z.string().trim().regex(/^\(?\d{2}\)?[-.\s]?\d{5}[-.\s]?\d{4}$/, "Invalid Cellphone."),
    password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/, "The password must contain a uppercase and lowercase letter, a number and a symbol."),
    confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

type UserFormData = z.infer<typeof UserSchema>

const Form = () => {

    const [formKey, setFormKey] = useState(0);

    const { register, handleSubmit, reset, formState: { errors, isSubmitSuccessful } } = useForm<UserFormData>({
        resolver: zodResolver(UserSchema)
    })

    const onSubmit: SubmitHandler<UserFormData> = (data) => {
        console.log(data);
        reset()
        setFormKey(prevKey => prevKey + 1);
    }

    return (
        <div className='form-div' key={formKey}>
            <h2>Register User</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='input-div'>
                    <label htmlFor="name">Name: </label>
                    <input type="text" id="name" {...register('name')} />
                    {errors.name && <span>{errors.name.message}</span>}
                </div>

                <div className='input-div'>
                    <label htmlFor="birthday">Birthday: </label>
                    <input type="date" id="birthday" {...register('birthday')} />
                    {errors.birthday && <span>{errors.birthday.message}</span>}
                </div>

                <div className='input-div'>
                    <label htmlFor="email">Email: </label>
                    <input type="text" id="email" {...register('email')} />
                    {errors.email && <span>{errors.email.message}</span>}
                </div>

                <div className='input-div'>
                    <label htmlFor="cellphone">Cellphone: </label>
                    <InputMask mask="(99) 99999-9999" type="text" id="phone" {...register('cellphone')} />
                    {errors.cellphone && <span>{errors.cellphone.message}</span>}
                </div>

                <div className='input-div'>
                    <label htmlFor="password">Password: </label>
                    <input type="password" id="password" {...register('password')} />
                    {errors.password && <span>{errors.password.message}</span>}
                </div>

                <div className='input-div'>
                    <label htmlFor="confirmPassword">Confirm Password: </label>
                    <input type="password" id="confirmPassword" {...register('confirmPassword')} />
                    {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}
                </div>

                <div className='button-div'>
                    <button type="submit">Submit</button>
                </div>

                {isSubmitSuccessful && <p>Data was submitted successfully.</p>}
            </form>
        </div>
    )
}

export default Form;