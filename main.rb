
require 'net/http'
require 'json'

puts 'Ingrese un número de regiones'
n = gets.chomp().to_i

totalMachines = 0;
regionWithMoreMachines = ""
regionWithFewerMachines = ""
maxMachines = 0
minMachines = -1

URL = 'https://pinballmap.com/api/v1/'

def getRegions()
    uri = URI(URL+"regions.json")
    res = Net::HTTP.get_response(uri)
    
    return JSON.parse(res.body)
end
regions = getRegions()["regions"]

regions = regions[0,n]

def getDataByRegion(region)
    
    uri = URI(URL+"region/"+region["name"]+"/location_machine_xrefs.json")
    
    res = Net::HTTP.get_response(uri)
    return JSON.parse(res.body)
end

for region in regions 
   
    regionData = getDataByRegion(region)["location_machine_xrefs"]

	totalMachines += regionData.count

	if regionData.count>maxMachines
		maxMachines=regionData.count
		regionWithMoreMachines=region["full_name"]
	end
	if (regionData.count < minMachines) or (minMachines == -1)
		minMachines = regionData.count
		regionWithFewerMachines=region["full_name"]
	end
end

average = totalMachines / regions.count

puts "Estadísticas:"
puts "******************************************************"
puts "Cantidad de máquinas: "+totalMachines.to_s
puts "Promedio de máquinas: "+average.to_s
puts "Ubicación con mayor cantidad de máquinas: "+regionWithMoreMachines
puts "Ubicación con menor cantidad de máquinas: "+regionWithFewerMachines