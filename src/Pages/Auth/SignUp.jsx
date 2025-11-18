
import  { useState, useEffect } from 'react'; // Import useEffect
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const USER_TYPES = ['client', 'vendor'];

function SignUp() {
    const [formData, setFormData] = useState({
        name: '',
        company_name: '',
        email: '',
        password: '',
        user_type: USER_TYPES[0], // Default to client
    });
    const [statusMessage, setStatusMessage] = useState({ message: '', type: '' });
    
    const { register, isAuthenticated, isLoading } = useAuth();
    const navigate = useNavigate();

    // FIX: Use useEffect for redirection to avoid state update warning
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard');
        }
    }, [isAuthenticated, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatusMessage({ message: '', type: '' });
        
        try {
            await register(formData);
            
            // Assuming registration doesn't auto-log in, navigate to signin
            setStatusMessage({ message: 'Registration successful! Please sign in.', type: 'success' });
            setTimeout(() => navigate('/signin'), 1500); 

        } catch (err) {
            setStatusMessage({ message: err.message || 'Failed to register. Please try again.', type: 'error' });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 p-10 bg-white shadow-xl rounded-lg">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Create your account
                    </h2>
                </div>
                
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    
                    {statusMessage.message && (
                        <div className={`p-3 rounded text-sm ${statusMessage.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                            {statusMessage.message}
                        </div>
                    )}

                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="name" className="sr-only">Name</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="company_name" className="sr-only">Company Name</label>
                            <input
                                id="company_name"
                                name="company_name"
                                type="text"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mt-3"
                                placeholder="Company Name"
                                value={formData.company_name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='mt-3'>
                            <label htmlFor="email" className="sr-only">Email address</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Email address"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mt-3"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='mt-3'>
                            <label htmlFor="user_type" className="block text-sm font-medium text-gray-700">I am a:</label>
                            <select
                                id="user_type"
                                name="user_type"
                                required
                                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                value={formData.user_type}
                                onChange={handleChange}
                            >
                                {USER_TYPES.map(type => (
                                    <option key={type} value={type}>
                                        {type.charAt(0).toUpperCase() + type.slice(1)}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                        >
                            {isLoading ? 'Registering...' : 'Sign up'}
                        </button>
                    </div>
                </form>
                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        Already have an account? 
                        <Link to="/signin" className="font-medium text-indigo-600 hover:text-indigo-500 ml-1">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
