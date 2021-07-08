import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';
import { select } from 'async';

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
    //Arrange
    render(<ContactForm/>) //Render the ContactForm.
    //Act
    const firstNameInput = screen.getByLabelText(/first name*/i) //Select the firstName input.
    const lastNameInput = screen.getByLabelText(/last name*/i) //Select the lastName input.
    const emailInput = screen.getByLabelText(/email*/i) //Select the email input.
    userEvent.type(firstNameInput, 'Brandon') //Type in firstName input.
    userEvent.type(lastNameInput, 'Locke') //Type in lastName input.
    userEvent.type(emailInput, 'test@com') //Type invalid email in email input.
    const emailError = await screen.findByText(/error: email/i)
    //Assertions
    expect(emailError).toBeInTheDocument() //Assert that the email error message shows as it should.
});

test('renders "lastName is a required field" if a last name is not entered and the submit button is clicked', async () => {
    //Arrange
    render(<ContactForm/>) //Render the ContactForm.
    //Act
    const firstNameInput = screen.getByLabelText(/first name*/i) //Select the firstName input.
    const emailInput = screen.getByLabelText(/email*/i) //Select the email input.
    const submitBtn = screen.getByRole('button') //Select the submit button.
    userEvent.type(firstNameInput, 'Brandon') //Input a valid first name.
    userEvent.type(emailInput, 'email@email.com') //Input an email.
    userEvent.click(submitBtn) //Click the submit button.
    const lastNameError = await screen.findByText(/error: lastName/i) //After submitting the form without inputting a last name, select the lastName error message.
    //Assert
    expect(lastNameError).toBeInTheDocument()// Make sure the lastNameError appears in the document.
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    //Arrange
    render(<ContactForm/>) //Render the ContactForm
    //Act
    const firstNameInput = screen.getByLabelText(/first name*/i) //Select the firstName input.
    const lastNameInput = screen.getByLabelText(/last name*/i) //Select the lastName input.
    const emailInput = screen.getByLabelText(/email*/i) //Select the email input.
    const submitBtn = screen.getByRole('button') //Select the submit button.
    userEvent.type(firstNameInput, 'Brandon') //Type a valid first name.
    userEvent.type(lastNameInput, 'Locke') //Type a last name.
    userEvent.type(emailInput, 'test@test.com') //Type a valid email.
    userEvent.click(submitBtn) //Click the submit button.
    const displayedFirstName = await screen.findByTestId(/firstnamedisplay/i) //Wait until after the submit to select the displayed first name.
    const displayedLastName = await screen.findByTestId(/lastnamedisplay/i) //Wait until after the submit to select the displayed last name.
    const displayedEmail = await screen.findByTestId(/emaildisplay/i) //Wait until after the submit to select the displayed email.
    const displayedMessage = screen.queryByTestId(/messagedisplay/i) //Query about the messageDisplay
    //Assertions
    expect(displayedFirstName).toBeInTheDocument() //Make sure the displayedFirstName appears in the document.
    expect(displayedLastName).toBeInTheDocument() //Make sure the displayedLastName appears in the document.
    expect(displayedEmail).toBeInTheDocument() //Make sure the displayedEmail appears in the document.
    expect(displayedMessage).not.toBeInTheDocument() //Make sure the displayedMessage does NOT appear in the document.
});

// test('renders all fields text when all fields are submitted.', async () => {
    
// });