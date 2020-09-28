# JSON To Elixir README

Converts a JSON structure to an Elixir list optionally within an OK tuple.

- Works best with a formatted JSON file.

## Commands

In the _Command Palette_, type **JSON** and choose a command:

1. `JSON To Elixir: Convert` -> To convert JSON to a list.
2. `JSON To Elixir: Convert` -> To convert JSON and add the list within an `:ok` tuple.

## Requirements

This extension has no requirements or dependencies.

## Extension Settings

This extension has no extension settings.

## Known Issues

- If you have "null" within a string it will get replaced with "nil" also.

## Release Notes

Versions noted below.

### 0.0.2

Added better replacing of `{` and `:` characters; they should not be replaced within doubel quoted strings now.

### 0.0.1

Initial release of JSON To Elixir for Alpha testers only. 09/27/2020.

## Source

[GIT](https://github.com/eckmanca66/JsonToElixir)
