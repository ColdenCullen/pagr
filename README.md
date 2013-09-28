pagr
====

A paginating CSS/JavaScript library for creating smoothly scrolling pages.

### Format
Using pagr is incredibly simple; simply create a div (or section or what have you), give it the class `pagecontainer-horiz` or `pagecontainer-vert`, and then add the class `page` to its direct children.

To link to a page, create an `a` tag with the class you define in config (see below, or use `pagrlink`), and with an `href` of `/outerpage/innerpage`. You can scroll to as many nested pages as you'd like, but make sure you include all of the pages outside of the page you are scrolling to, just to make sure that you are scrolling to the correct page.

### To Initialize
In your HTML page, include the css and js files. Then, in your onload function, call pagr( [config] ). Config can have any of the following values:
```
{
    initialPage: "/home", // [no default] Page to scroll to as soon as the page loads
    scrollTime: 0,        // [default: 400] Time in milliseconds it takes to scroll
    scrollEase: "",       // [default: easeOutQuad] Any easing listed on http://api.jqueryui.com/easings/
    linkName: "pagrlink"  // [default: pagrlink] The class name to look for links with
}
```

### Examples
Want to see pagr in action? Take a trip over to [node.coldencullen.com](http://node.coldencullen.com/) (which is SUPER in development) and check it out. The main page uses the horizontal pagination, and the projects section uses a vertical one.
