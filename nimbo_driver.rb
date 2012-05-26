require 'sinatra'
require 'yaml'
require 'json'

class NimboDriver < Sinatra::Base

  framework_files = {}
  framework_files["jasmine"] = []
  framework_files["jasmine"] << "jasmine.NimboReporter.js"

  suite_id = nil
  result = nil
 
  get '/' do
    'home'
  end
 
  get '/spinner' do
    erb :spinner
  end
 
  get '/suite_run/:id' do
    result = nil
    suite_id = params[:id]
    config = YAML.load_file("public/suites/#{suite_id}/.nimbo.yml")

    until result do end
    { result: result }.to_json
  end
 
  get '/suite_get' do
    suite_id.to_json
  end
 
  get '/suite_runner' do
    config = YAML.load_file("public/suites/#{suite_id}/.nimbo.yml")
    @suite_id = suite_id
    @client_scripts = config["src"]
    @framework_scripts = framework_files[config["framework"]]
    erb :runner
  end
 
  post '/suite_result' do
    result = params
    suite_id = nil
  end

  get '/stop' do
    suite_id = nil
    result = {}
	end

  run! if app_file == $0	
end