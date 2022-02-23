# Nature Gift - Vue Ecommerce Website



## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

App
- 

Admin

### Screenshot

![](./src/assets/Demo-desktop-light.png)

![](./src/assets/Demo-desktop-dark.png)

### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

### Built with

- HTML5 
- CSS3
- Bootstrap
- Scss
- Vue
- Vue Cli
- Vue Router
- Git

### What I learned

Playsinline attribute in <video> tag allows the mobile browser play the video right where it is instead of opening it up with fullscreen. 
```html
<video class="w-100" autoplay loop muted playsinline>
  <source src="../assets/video/fresh-and-delicious.mp4" type="video/mp4">
</video>
```
Add the horizontal lines besides header with flexbox. 
```html
<h2 class="mb-4 text-secondary d-flex justify-content-between align-items-center">
  <b class="d-block h-2 bg-primary flex-grow-1"></b>
  <span class="mx-4">See why customers love our products</span>
  <b class="d-block h-2 bg-primary flex-grow-1"></b>
</h2>
```
Set input with 100% width in order to make sure input won't expands outside the td.
```html
<td width="10%">
  <input type="number" min="0" value="1" class="w-100">
</td>
```
The class of body should be 100vh and overflow-hidden while loading, otherwise light-box won't be the same height as body.
```js
this.$emitter.on('loading-state', (state) => {
  this.isLoading = state;
  const body = document.querySelector('body');
  if (state) {
    window.scrollTo(0, 0);
    body.setAttribute('class', 'mh-100vh overflow-hidden');
  } else {
    body.setAttribute('class', '');
  }
});
```


### Continued development

I still need more practice to get used to Vue. Besides, there are still room to improve for accessibility of this project, hope to get more familiar with them in the future project.

### Useful resources

- [What does 'playsinline' mean in web video](https://css-tricks.com/what-does-playsinline-mean-in-web-video/) - A simple and clear article explains how 'playsinline' attribute works in the video tag.
- [Create a Website With Video Background](https://www.youtube.com/watch?v=8MgpE2DTTKA&ab_channel=TraversyMedia) - Create a beautiful, custom landing page for a Travel website using HTML, CSS and a little JavaScript.
- [Minimal animated pure css menu icon](https://codepen.io/fromwireframes/pen/arMrYp) - Animated menu icon demo code.


## Author

- Git - [Tim](https://github.com/TimmyLin21)
- Frontend Mentor - [@TimmyLin21](https://www.frontendmentor.io/profile/TimmyLin21)
