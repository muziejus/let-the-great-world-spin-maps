# encoding: utf-8
require "./app"

# these don't do anything.
Encoding.default_external = 'utf-8'
Encoding.default_internal = 'utf-8'

run App
