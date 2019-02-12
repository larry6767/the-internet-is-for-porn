# About our redux store

## Important detail about used immutable.js data types

Always keep in mind that there's __store-preset__ feature in production mode (but not in development
mode). This feature renders store on Server-Side Rendering for a page and converts it to plain JSON
to deliver it to frontend as is so frontend could just wrap it with `Immutable.fromJS()` and use it
as initial store state (with already obtained page data and other page state stuff without needing
to make any another requests to backend). But this also means that we have only scalar,
`Immutable.Map` and `Immutable.List` types (because `Immutable.fromJS()` from plain JSON doesn't
have any additional info about types) so all other types will be elimintated which you could rely on
in your reducers (such as `Record`s or `OrderedMap`s, etc.). You'll just lost any features/methods
of other types because of that.

So, just **DO NOT** use any `Immutable` types for the application store except `Immutable.Map` and
`Immutable.List` and plain JSON scalars of course (strings, numbers, booleans, nulls). If you follow
this rule you'll never face any confusion caused by unexpected behavior in production mode.
