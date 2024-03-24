import { Button, Label, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from './context/AuthService'; // Adjust the path as necessary

const SignUp = () => {
    const navigate = useNavigate(); 
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    const handleSignUp = async (e) => {
        e.preventDefault();
        if (password !== repeatPassword) {
            console.error("Passwords do not match!");
            // Ideally, show an error message to the user
            return;
        }
        try {
            // Pass userName along with email and password to signUp
            await signUp(email, password, userName);
            console.log("Signed up and user details added successfully!");
            // Redirect or show a success message
            navigate('/'); // Redirect to the home page
        } catch (error) {
            console.error("Failed to sign up: ", error.message);
            // Handle errors (e.g., show an error message)
        }
    };

    return (
        <form className="flex max-w-md flex-col gap-4" onSubmit={handleSignUp}>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="userid" value="Your User Name" />
                </div>
                <TextInput id="userid" type="text" placeholder="" required onChange={(e) => setUserName(e.target.value)} shadow />
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="email2" value="Your email" />
                </div>
                <TextInput id="email2" type="email" placeholder="name@flowbite.com" required onChange={(e) => setEmail(e.target.value)} shadow />
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="password2" value="Your password" />
                </div>
                <TextInput id="password2" type="password" required onChange={(e) => setPassword(e.target.value)} shadow />
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="repeat-password" value="Repeat password" />
                </div>
                <TextInput id="repeat-password" type="password" required onChange={(e) => setRepeatPassword(e.target.value)} shadow />
            </div>
            <Button type="submit">Register new account</Button>
        </form>
    );
}

export default SignUp;