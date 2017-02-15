u.circularrr.js
====
Creates an SVG circular progress indicator inside the element matching the selector.

While loading it adds the `loading` class to the element, when it's done it add the class `loaded`.

Usage
-----

Setup (with default options):

```javascript
u('selector').circularrr({
  size: 40,
  border: 3,
  bg: 'ghostwhite',
  progress: 'lightgreen',
  duration: 1500,
});
```

Set:

```javascript
u('selector').circularrr(10); // from 0 to 100
```

Reset:

```javascript
u('selector').circularrr('reset');
```

To center the SVG inside the element, use the following css:

```css
selector {
  position: relative;
}
selector .circularrr {
  margin: -20px 0 0 -20px;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 40px;
  height: 40px;
}
```

License
-------

[MIT License](LICENSE)
