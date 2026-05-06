import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import AuthForm from '@/components/AuthForm';

export const metadata = {
    title: 'Forgot Password — buykko',
    description: 'Reset your buykko account password.',
};

export default async function ForgotPasswordPage() {
    const session = await auth();
    if (session) redirect('/account');
    return <AuthForm type="forgot" />;
}
