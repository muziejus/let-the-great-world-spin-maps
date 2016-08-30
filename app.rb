# encoding: utf-8
require "sinatra"
require "httparty"

get "/" do
  json = HTTParty.get("http://nywalker.newyorkscapes.org/books/let-the-great-world-spin-2009/geojson-instances").body
  instances = {}
  # This causes an encoding error when it goes over to the erb.
  instances_array = JSON.parse(json)["features"] # creates an array of instances
  ["intro", "ciaran", "claire", "lara", "walker", "fernando", "the kid", "tillie", "solomon", "adelita", "gloria", "jaslyn"].each do |special|
    instances[special] = instances_array.select{ |i| i["properties"]["special"] == special }.to_json
  end
  erb :index, locals: { geo_json: json, instances: instances }
end

