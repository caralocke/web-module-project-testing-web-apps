import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    //Arrange
    render(<ContactForm/>) //Render the component.
});

test('renders the contact form header', ()=> {
    //Arrange
    render(<ContactForm />) //Render the component.
    //Act
    const header = screen.getByText(/contact form/i) //Select the header of the ContactForm (the h1 in this case)
    //Assert
    expect(header).toBeInTheDocument() //Assert if the header is in the document.
    expect(header).toBeTruthy() //Assert if the header is truthy.
    expect(header).toHaveTextContent(/contact form/i) //Assert if the header has the correct text content.
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    //Arrange
    render(<ContactForm/>) //render the component
    //Act
    const firstNameInput = screen.getByLabelText(/first name*/i) //Select the firstName input.
    userEvent.type(firstNameInput, 'Cara') //Type into the first name input.
    
    //Assertions
    expect(firstNameInput).toHaveValue('Cara') //Check the value of firstNameInput.
    const firstNameError = await screen.findByText(/error: firstName must have at least 5 characters/i) //Wait until after the typing then select the error message.
    expect(firstNameError).toBeInTheDocument() //Check that the error message appears.
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    //Arrange
    render(<ContactForm/>) //Render the ContactForm.
    //Act
    const submitBtn = screen.getByRole('button') //Select the submit button.
    userEvent.click(submitBtn) //Click the submit button
    
    //After the button is clicked, select all three error messages.
    const firstNameError = await screen.findByText(/error: firstName/i)
    const lastNameError = await screen.findByText(/error: lastName/i)
    const emailError = await screen.findByText(/error: email/i)
    //Assertions
    //Check fo all three error messages to be truthy.
    expect(firstNameError).toBeTruthy()
    expect(lastNameError).toBeTruthy()
    expect(emailError).toBeTruthy()
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    //Arrange
    render(<ContactForm/>) //Render ContactForm.
    //Act
    const firstNameInput = screen.getByLabelText(/first name*/i) //Select the firstName input.
    const lastNameInput = screen.getByLabelText(/last name*/i) //Select the lastName input.
    const submitBtn = screen.getByRole('button') //Select the submit button.
    userEvent.type(firstNameInput, 'Brandon') //Type into the firstName input.
    userEvent.type(lastNameInput, 'Locke') //Type into the lastName input.
    userEvent.click(submitBtn) //Click the submit button.
    const emailError = await screen.findByText(/error: email/i) //After the submit button is clicked, select the error message for email.
    //Assertions
    expect(emailError).toBeTruthy() //Assert that the email error message is truthy.
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    
});

// test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    
// });

// test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    
// });

// test('renders all fields text when all fields are submitted.', async () => {
    
// });