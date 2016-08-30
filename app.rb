# encoding: utf-8
require "sinatra"
require "httparty"

get "/" do
  json = HTTParty.get("http://nywalker.newyorkscapes.org/books/let-the-great-world-spin-2009/geojson-instances").body
  erb :index, locals: { geo_json: json }
end

