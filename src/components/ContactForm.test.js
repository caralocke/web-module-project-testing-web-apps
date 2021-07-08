import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    //Arrange
    render(<ContactForm/>)
});

test('renders the contact form header', ()=> {
    //Arrange
    render(<ContactForm />)
    //Act
    const header = screen.getByText(/contact form/i)
    //Assert
    expect(header).toBeInTheDocument()
    expect(header).toBeTruthy()
    expect(header).toHaveTextContent(/contact form/i)
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    //Arrange
    render(<ContactForm/>)
    //Act
    const firstNameInput = screen.getByLabelText(/first name*/i)
    userEvent.type(firstNameInput, 'Cara')
    
    //Assertions
    expect(firstNameInput).toHaveValue('Cara')
    const firstNameError = await screen.findByText(/error: firstName must have at least 5 characters/i)
    expect(firstNameError).toBeInTheDocument()
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    
});

test('renders all fields text when all fields are submitted.', async () => {
    
});