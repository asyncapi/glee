---
"@asyncapi/glee-shared-utils": patch
"@asyncapi/gleequore": patch
---

Importing gleequore doesn't work correctly. It imports the types but doesn't let you import the implementation so it's unusable. This is fixed in this release.
