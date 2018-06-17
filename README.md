## ILM 360 View
Click here to see the [DEMO](https://ilmtech.github.io/ilm360view/) and

A free 360 product view with hotpot help developer to their personal use. Features Include

1. Auto animation
2. Controls with Play, Pause, Previous & Next
3. Mouse Rotate control
4. Hotspot

How to install
```markdown
<script src="jquery-3.3.1.min.js"></script>
<script src="script.js"></script>
```


Create a div to display the Image
```markdown
<div class="container"></div>
```

Use below syntax to config 360 view
```markdown
<script>
    $("div.container").ilmSpin({
        src: "images/images_{frame}.jpg",
        width: "600px",
        height: "400px",
        speed: 100,
        frames: 35,
        play: "play",
        pause: "pause",
        previous: "previous",
        next: "next",
        reverse: true,
        icons: [{id: 1, path: 'images/plus.png', html: '<h1>This is Sample text</h1>'}],
        iconsPosition: [
            {imageid: 1, frame: 1, top: 58, left: 23.5, display: true}, 
            {imageid: 1, frame: 2, top: 57, left: 25, display: true},
            {imageid: 1, frame: 3, top: 56, left: 27, display: true},
            {imageid: 1, frame: 4, top: 56, left: 28.2, display: true},
            {imageid: 1, frame: 5, top: 56, left: 30, display: true},
            {imageid: 1, frame: 6, top: 55, left: 34, display: true},
            {imageid: 1, frame: 28, top: 64, left: 41, display: true},
            {imageid: 1, frame: 29, top: 64, left: 36, display: true},
            {imageid: 1, frame: 30, top: 64, left: 32, display: true},
            {imageid: 1, frame: 31, top: 63, left: 29, display: true},
            {imageid: 1, frame: 32, top: 62, left: 26, display: true},
            {imageid: 1, frame: 33, top: 61, left: 24, display: true},
            {imageid: 1, frame: 34, top: 60, left: 23, display: true},
            {imageid: 1, frame: 35, top: 59, left: 22.5, display: true}            
        ]
    });
</script>
```

### Support or Contact

If you need any help you can contact at support@ilmtech.in
