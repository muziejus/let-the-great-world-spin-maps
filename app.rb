# encoding: utf-8
require "sinatra/base"
require "httparty"

class App < Sinatra::Base

  # set :haml, format: :html5
  # set :erb, layout_engint: :haml, layout: :layout
  set :default_encoding, 'utf-8'

  get "/" do
    json = HTTParty.get("http://nywalker.newyorkscapes.org/books/let-the-great-world-spin-2009/instances-geojson").body
    instances = {}
    specials = ["intro", "ciaran", "claire", "lara", "walker", "fernando", "the kid", "tillie", "solomon", "adelita", "gloria", "jaslyn"]
    # This causes an encoding error when it goes over to the erb.
    # instances_array = JSON.parse(json)["features"] # creates an array of instances
    # specials.each do |special|
    #   instances[special] = instances_array.select{ |i| i["properties"]["special"] == special }.to_json
    # end
    erb :index, locals: { geo_json: json, instances: instances, specials: specials }
  end

end


