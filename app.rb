# encoding: utf-8
require "sinatra/base"
require "httparty"

class App < Sinatra::Base

  # set :haml, format: :html5
  # set :erb, layout_engint: :haml, layout: :layout
  set :default_encoding, 'utf-8'

  get "/" do
    # This causes an encoding error when it goes over to the erb.
    # instances_array = JSON.parse(json)["features"] # creates an array of instances
    # specials.each do |special|
    #   instances[special] = instances_array.select{ |i| i["properties"]["special"] == special }.to_json
    # end
    erb :index
  end

end


