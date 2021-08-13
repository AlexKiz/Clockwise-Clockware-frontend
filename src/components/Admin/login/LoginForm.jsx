import { useState, useEffect } from "react";

const LoginForm = () => {
    
    const [adminLogin, setAdminLogin] = useState('')
    const [adminPassword, setAdminPassword] = useState('')

    return (
        <div>
            <form>
                <div>
                    <div>
                        <label>Enter Admin Login:</label>
                    </div>
                    <input 
                    type='email' 
                    name='login'
                    value={adminLogin}
                    onChange = {(adminLoginEvent) => setAdminLogin(adminLoginEvent.target.value)}
                    required
                    >
                    </input>
                </div>
                <div>
                    <div>
                        <label>Enter Admin Password:</label>
                    </div>
                    <input 
                    type='password' 
                    name='password'
                    value={adminPassword}
                    onChange = {(adminPasswordEvent) => setAdminPassword(adminPasswordEvent.target.value)}
                    >
                    </input>
                </div>
                <div>
                    <button>Sign In</button>
                </div>
            </form>
        </div>
    )
}

export default LoginForm