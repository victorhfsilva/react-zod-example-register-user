import { fireEvent, render, screen } from "@testing-library/react"
import Form from "."

describe('Form Submission Test', () => {

    test('given a empty form, when filled, the submission should be acknowledged', async () => {
        render(
            <Form />
        )

        const submitButton = screen.getByText("Submit");
        const nameInput = await screen.findByLabelText("Name:");
        const birthdayInput = await screen.findByLabelText("Birthday:");
        const emailInput = await screen.findByLabelText("Email:");
        const cellphoneInput = await screen.findByLabelText("Cellphone:");
        const passwordInput = await screen.findByLabelText("Password:");
        const confirmPasswordInput = await screen.findByLabelText("Confirm Password:");

        fireEvent.change(nameInput, {
            target: {
                value: 'Victor Silva'
            }
        })

        fireEvent.change(birthdayInput, {
            target: {
                value: '1994-06-09'
            }
        })

        fireEvent.change(emailInput, {
            target: {
                value: 'victor@email.com'
            }
        })

        fireEvent.change(cellphoneInput, {
            target: {
                value: '34999998888'
            }
        })

        fireEvent.change(passwordInput, {
            target: {
                value: 'Password123!'
            }
        })


        fireEvent.change(confirmPasswordInput, {
            target: {
                value: 'Password123!'
            }
        })

        fireEvent.click(submitButton);

        const acknowledgment = await screen.findByText('Data was submitted successfully.')
        expect(acknowledgment).toBeVisible();
    })

})