import { Button } from 'flowbite-react';
import { auth } from '../context/firebase';

const LogoutButton = () => {
    const handleLogout = async () => {
        try {
            await auth.signOut(); // Sign out the user
            console.log("User logged out successfully!");
            // Optionally, you can redirect the user to a different page after logout
        } catch (error) {
            console.error("Failed to log out: ", error.message);
            // Handle errors (e.g., show an error message)
        }
    };

    return (
        <Button onClick={handleLogout}>Logout</Button>
    );
}

export default LogoutButton;