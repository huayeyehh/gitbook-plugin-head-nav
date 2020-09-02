# gitbook-plugin-head-nav
gitbook-plugin for adding a head nav bar

# usage
Include head-nav in plugins in book.json
Add headNav in variables

```
"plugins": [
    "head-nav"
],
"variables": {
    "headNav":{
        "icon": {
            "src": "/unicorn.jpg",
            "height": "50px",
            "width": "200px"
        },
        "nav":[
            {
                "url":"/tab1",
                "target":"",
                "name": "TAB 1"
            },
            {
                "url":"/tab2",
                "target":"",
                "name": "TAB 2"
            },
            {
                "url":"www.google.com",
                "target":"_blank",
                "name": "Google"
            }
        ]
    }
},
```

Then ```gitbook build```

# plugins recommandation

```
"plugins": [
    "-sharing",
    "-lunr",
    "-search",
    "search-pro",
    "splitter",
    "back-to-top-button",
    "code",
    "sharing-plus",
    "head-nav"
],
```
