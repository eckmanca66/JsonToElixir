# JSON To Elixir README

Converts a JSON structure to an Elixir list optionally within an OK tuple.

## Commands

1. **JSON To Elixir: Convert** -> Converts to a list.
2. **JSON To Elixir: Convert** -> Converts and adds the list within an `:ok` tuple.

## Requirements

This extension has no requirements or dependencies.

## Extension Settings

This extension has no extension settings.

## Known Issues

- Expects a formatted JSON file - "{" should be on its own line or at least with a space after and ":" separator needs a space after.
- Find and replace is crude for now, if you have "{", "null", or ": " within a string it will get replaced also.

## Release Notes

Versions noted below.

### 1.0.0

Initial release of JSON To Elixir. 09/27/2020.

## Source

[GIT](https://github.com/eckmanca66/JsonToElixir)
