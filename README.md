This Repo contains code for Faveo Submit a ticket form

There are two kinds of form in this repo
1. Create ticket form using PHP Mail functionality
2. Create ticket form using Faveo Create ticket API

Either of these forms can be hosted on your webserver to see and use this functionality.


### Server Specification
- PHP 7.3
- Apache/NGINX/IIS web server

### Form using PHP Mail function:
- This form emails the field filled to support email address
- There is no response to this form, as it sends form data over via email. So the ticket id for the generated ticket is not shown on the screen

  [Click here to check how to use PHP APP](phpapp/README.md)

### Form using Faveo Create ticket API:
- The form is the same replica of the form, which shows on your Faveo support portal
- The content/design of the form comes from your support portal form
- on submission of the form, ticket id is shown on the screen, and the option to print the same

  [Click here to check how to use Vue APP](vueapp/README.md)

### Technical specifications
Both these forms are built on Core PHP, HTML, CSS, JS, and PWA
