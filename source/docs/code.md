# Code

## Table of contents

- [HTML](#html)
- [CSS](#css)
  - [BEM](#bem)
  - [Variables](#variables)
  - [Ordering and syntax](#ordering-and-syntax)
  - [Indentation](#indentation)
  - [Commenting](#commenting)
  - [Tricks](#tricks)
- [Javascript](#javascript)

## HTML

(To be written…)

## CSS

### BEM

(To be written…)

### Variables

(To be written…)

### Ordering and syntax

Sass should be ordered by `@extend`, `@include`, and then alphabetically by
selector. This ensures fewer instances of over-ruling styles.

```
.selector {
  @extend %other-selector;

  @include mixin-here;

  akey: value;
  zkey: value;
}

- Prefer `%`, `rem`, and `em` units over `px`;
- Values should be shortened where possible: `margin: 0 auto;` should be used
over `margin: 0 auto 0 auto;`;
- Use unitless values where possible: `margin-top: 0;` over `margin-top: 0px`.

### Indentation

CSS should be intended to two spaces as so:

```
.selector {
  key: value;
}
```

### Commenting

CSS partials should be commented in chunks as so:

```
/**
 * PARTIAL NAME IN CAPS
 *
 * Short description of what the partial controls.
**/

/* ==|== Partial Name ====================
  Section Name
========================================== */
```

Comments within the code should be relevant and helpful, but not obvious; and
should be written concisely (with whatever language you want, go nuts) and
with a maximum of 80 characters per line.

A good example for commenting would be to explain why something was done,
which might otherwise not be obvious. 

```
.selector {
  // Two values because X reason
  key: value1;
  key: value2;
}
```

This would be shit because it’s not on its own line making it tough to read,
and the CSS itself is obvious:

```
.selector {
  color: red; // This makes it red
}
```

The only time comments should be kept on the same line is to note an
outstanding piece of work:

```
.selector {
  width: 120px; // TODO: Var
}
```

By using the `// TODO: …` syntax it means that they’re searchable later down
the line to fix things that are either undecided, or just unfinished.

### Tricks

#### `$_: &;`

This trick allows us to use the base selector again further down the tree
without hard-coding it:

```
.selector {
  $_: &;
  &__item {
    + #{$_}__other {
      …
    }
  }
}


## Javascript

(To be written…)