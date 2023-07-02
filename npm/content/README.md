If you like this plugin, [leave it a :star: on Github!](https://github.com/NickRimmer/insomnia-plugin-oa2-mate)

# About
<img src="npm/content/oa2-mate-icon-medium.jpg" alt="Just a mate" width="200" height="200">

Welcome aboard the 'oAuth 2 Mate' express! 🚀

'OAuth 2 Mate' is like your reliable sidekick who always remembers your keys. This plugin is on a mission to provide the freshest OAuth 2 token as a template variable, which you can use straight into your global headers as a bearer authorization token (or any other way you would like).

Your passport to simpler authorization is just a click away. Happy coding! 🎉

## How to use
This is just one of examples (;

### Step 1
Install the plugin from [Insomnia plugin page]([Title](https://insomnia.rest/plugins/insomnia-plugin-oa2-mate)) first if it is not installed yet.

### Step 2
Add any request (even without endpoint) where we can configure oAuth2 and retrieve the token as usual. Click refresh to get a new token.  

<img src="npm/content/how-to-1.jpg" alt="Step 2">

### Step 3
Open your environment settings and add default header there for authorization. You can press `ctrl+space` and select `oa2_mate` from the list. 

```json
{
  "DEFAULT_HEADERS": {
    "Authorization": "Bearer {% oa2_mate %}"
  }
}
```
<img src="npm/content/how-to-2.jpg" alt="Step 3">

### Step 4
Open your request, make sure there is no authentication configured and run it. Default headers will insert authorization one with value provided by plugin

<img src="npm/content/how-to-3.jpg" alt="Step 5">
This is just one of examples (;

1. Install the plugin from [Insomnia plugin page]([Title](https://insomnia.rest/plugins/insomnia-plugin-oa2-mate)) first you it is not installed yet  

2. Add any request (even without endpoint) where we can configure oAuth2 and retrieve the token as usual. Click refresh to get a new token.  

<img src="npm/content/how-to-1.jpg" alt="Step 1">

3. Open your environment settings and add default header there for authorization

```json
{
  "DEFAULT_HEADERS": {
    "Authorization": "Bearer {% oa2_mate  %}"
  }
}
```
<img src="npm/content/how-to-2.jpg" alt="Step 2">

4. Open some request, make sure there is no authentication configured and run it. Default headers will insert authorization one with value provided by plugin

<img src="npm/content/how-to-3.jpg" alt="Step 2">


# How to contribute

Contributions, issues and feature requests are welcome. Feel free to open
an [issue](https://github.com/NickRimmer/insomnia-plugin-oa2-mate/issues) or create
a [pull request](https://github.com/NickRimmer/insomnia-plugin-oa2-mate/pulls).
