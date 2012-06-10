require 'sinatra'
require 'yaml'
require 'json'

class NimboDriver < Sinatra::Base

  suite_id = nil
  result = nil

  get '/capture' do
    erb :capture
  end

  get '/suite_get' do
    suite_id.to_json
  end

  get '/suite_runner' do
    config = YAML.load_file("public/suites/#{suite_id}/.nimbo.yml")
    @suite_id = suite_id
    @client_scripts = config["src"]
    erb :runner
  end

  get '/suite_run/:id' do
    result = nil
    suite_id = params[:id]
    until result do end
    { result: result }.to_json
  end

  post '/suite_result' do
    result = params
    suite_id = nil
  end
end
