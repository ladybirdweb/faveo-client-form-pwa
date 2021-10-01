This Repo contains code for Faveo Submit a ticket form

There are two ways ticket can be created in Faveo Helpdesk

1. Create ticket form using PHP Mail functionality
2. Create ticket form using Faveo Create ticket API

Either of these forms can be hosted on your web server to see and use this functionality.

Server Specification

- PHP 7.3
- Apache/INGINX/IIS web server 

Form using PHP Mail function:

- This form emails the field filled to support email address
- There is no response to this form, as it sends form data over via email. So the ticket id for the generated ticket is not show on the screen

[How to use PHP APP](phpapp/README.md)


Form using Faveo Create ticket API:

- The form is same replica of he form, which shows on your Faveo support portal
- The content/design of the form comes from your support portal form
- on submission of the form, ticket id is show on the screen and option to print the same

[How to use Vue APP](vueapp/README.md)

Both these forms are build on Core PHP, HTML, CSS, JS and PWA