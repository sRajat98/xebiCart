import React from 'react';
import { ProductConsumer } from '../Data/Context';

export default function LoginView(payload) {
    const { name, onInputChange, onSubmitHandler, isValid } = payload
    return (
        <ProductConsumer>
            {
                value => {
                    return (
                        <div className="login-container">
                            <div className="logo-container"></div>
                            <div className="login-text-container">XCart Login</div>
                            <div className="login-form-container">
                                <form onSubmit={onSubmitHandler}>
                                    <div className='login-error'>{isValid ? value.setfullName(name) : <p>Please Enter the Correct Credentials</p>}</div>
                                    <input type="text" id="username" placeholder="Username" onChange={(e) => onInputChange({ username: e.currentTarget.value })} />
                                    <input type="password" id="password" placeholder="Password" onChange={(e) => onInputChange({ password: e.currentTarget.value })} />
                                    <button type='submit' id="submit" >Submit</button>
                                </form>
                            </div>
                        </div>
                    )
                }
            }

        </ProductConsumer>
    )
}
