## How to setup Faveo Client Form Vue PWA

This Vue PWA app has been compiled and contains all the required assets to serve the webpage as PWA. To successfully host and serve this app you must follow the below steps.

- Upload the **vueapp** directory under on the server.
- Set `vueapp/public` as Document root directory for your virtual host or domain host.
- Ensure the SSL certificates are installed on the server and app is served with "https"
- Edit `vueapp/public/config.js` as directed
	- 'apiBaseURL' : Set your Faveo URL is Faveo is running on other domain or subdomain
	- 'theme' : Basic bootstrap theme color
	- 'color' : Used as color of buttons and other elements on the page
	- 'defaultRequester' : Allows to decide whether users should be able to create requester or not. If you do not want to provide users with option to create requester then pass an integer ID of a user from Faveo. App will create tickets under that user in Faveo.
- **Important!** If Faveo is on different domain than the app then the browsers will throw CORS errors. In that case you must update Faveo server configuration to allow cross origin access. There are different ways to allow CORS on different servers. Use appropriate method based on your Apache or Nginx server.

> Note: While enabling CORS always open access for selected domain (in this case domain of the Vue app) to ensure the security risks are low.

