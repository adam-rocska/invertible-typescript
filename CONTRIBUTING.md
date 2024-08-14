# Contribution Guidelines

Well, the idea is simple.

1. Make sure your code is well tested.
2. Don't overstress formatting. If it's readable, it's cool.
3. Regarding commit messages, I always prefix with an emoji
   which gives a hint about the commit. You can follow the
   same pattern if you want, but it's not mandatory.

## Bugfixes

Make sure you provide at least one bug test / regression
test which fails when reproducing your bug, and passes when
your fix is applied.

**Target directory**: `<rootDir>/test/bug/*`

## Features

Make sure you provide at least one user test which represents
the way(s) you envision your feature to be used.

**Target directory**: `<rootDir>/test/user/*`

+ The more unit tests, the better.

## Documentation

lol, none for now. `typedoc` sucks, and I don't have the
capacity for a fancy doc' site now.
