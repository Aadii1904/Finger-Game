# What changed from the 2018 version

The first version is kept, untouched, in [`original/index.html`](original/index.html).
In the new code, every part is marked with a comment:

- **`ORIGINAL (2018)`**: your code or text, kept as it was
- **`NEW`**: added in the rebuild

## Kept from the original

| What | Where now |
| --- | --- |
| The question, "How many fingers am I holding?" (typo "Hom" fixed) | `index.html` |
| The random pick: `Math.random()`, times 6, `Math.floor` | `play()` in `script.js` |
| The comparison `x == guess` | `play()` in `script.js` |
| Both messages, word for word | `play()` in `script.js` |

```js
// 2018, and still the heart of the game now
var x = Math.random();
x = 6 * x;
x = Math.floor(x);

if (x == document.getElementById("count").value) {   // now: if (x == guess)
  alert("You Guessed it right!");
} else {
  alert("You Guessed it wrong..!! I was holding up " + x + ".");
}
```

## Changed

### 1. Buttons instead of a text box

Before: type a number, then press **Validate**.

```html
<input id="count" />
<button id="Check">Validate</button>
```

Now: six buttons, 0 to 5, built by a loop in `script.js`. One click plays a round, and you
can't type an invalid answer.

### 2. The answer is shown on the page, not in an `alert()`

Before: `alert(...)` popped up a browser dialog.

Now: the same text goes into `<p id="result">`, green when right and red when wrong
(`showResult()` in `script.js`).

### 3. A hand shows how many fingers I was holding

New `div.hand` in `index.html`: a palm, four fingers and a thumb, drawn with CSS.
`showFingers(x)` raises the first `x` fingers, so you see the answer, not just read it.

### 4. A score

New `score` and `rounds` counters, shown as "Score 2 / 5".

### 5. Split into three files

| File | Holds |
| --- | --- |
| `index.html` | The page: question, hand, message, buttons, score |
| `style.css` | How it looks (the 2018 version had no styles) |
| `script.js` | The game logic (was an inline `<script>` in `index.html`) |
