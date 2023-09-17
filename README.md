# Frontend Mentor - Interactive card details form solution

This is a solution to the [Interactive card details form challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/interactive-card-details-form-XpS8cKZDWw). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Overview

### The challenge

Users should be able to:

- Fill in the form and see the card details update in real-time
- Receive error messages when the form is submitted if:
  - Any input field is empty
  - The card number, expiry date, or CVC fields are in the wrong format
- View the optimal layout depending on their device's screen size
- See hover, active, and focus states for interactive elements on the page


### Links

- Solution URL: [Solution URL](https://github.com/SatellitePeace/atm-form-react)
- Live Site URL: [Live site URL](https://atm-card-form.netlify.app/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library

### What I learned

I learned a couple of things about refactoring
I also learned a couple of things about formatting ATM Cards digits

```React
<InputField
            label="CARD NUMBER"
            type="text"
            placeholder="e.g 1234 5678 9123 000"
            value={number}
            onChange={onAddNumber}
            error={numberError}
            errorMessage="Must be between 13 and 19 digits"
          />
          etc
```

### Continued development

This project taught me alot about refactoring and thinking outside the box i will have to study how to do both more

### Useful resources

- [stackoverflow](https://stackoverflow.com/questions/65231352/the-specified-value-cannot-be-parsed-or-is-out-of-range-when-using-number-pipe) - This helped me to solve the problem of how to create spaces after 4 digits in atm cards.
- [Stackoverflow](https://stackoverflow.com/questions/65454587/how-to-make-autospace-after-every-4-digit-in-react) - This is an amazing article which helped me finally realize that i needed the input type to be text to stop getting a parse error on my range 

## Author
- Frontend Mentor - [@yourusername](https://www.frontendmentor.io/profile/SatellitePeace)

