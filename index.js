let totalMachines = 0;
let regionWithMoreMachines;
let regionWithFewerMachines;
let maxMachines = 0;
let minMachines = -1;
let n = parseInt(prompt('Ingrese un número de regiones'));
const URL = 'https://pinballmap.com/api/v1/';
let average;

const getRegions = async (n) => {
  const request = await fetch(`${URL}regions.json`);
  const response = await request.json();
  const regions = response.regions;

  main(regions);
};

const main = async (info) => {
  for (let i = 0; i < n; i++) {
    await getDataByRegion(info[i].name, info[i].full_name);
  }
  console.log('Estadísticas:');
  console.log('**************************************************');
  console.log('Cantidad de máquinas: ', totalMachines);
  console.log('average de máquinas: ', totalMachines / n);
  console.log('Ubicación con mayor cantidad de máquinas: ', regionWithMoreMachines);
  console.log('Ubicación con menor cantidad de máquinas: ', regionWithFewerMachines);
};

const getDataByRegion = async (regionName, regionFullName) => {
  const request = await fetch(`${URL}region/${regionName}/location_machine_xrefs.json`);
  const response = await request.json();
  const regionData = response.location_machine_xrefs;

  totalMachines += regionData.length;
  await getRegionWithMoreMachines(regionData, regionFullName);
  await getRegionWithFewerMachines(regionData, regionFullName);
};

const getRegionWithMoreMachines = (regionData, regionFullName) => {
  if (regionData.length > maxMachines) {
    maxMachines = regionData.length;
    regionWithMoreMachines = regionFullName;
  }
};
const getRegionWithFewerMachines = (regionData, regionFullName) => {
  if (regionData.length < minMachines || minMachines == -1) {
    minMachines = regionData.length;
    regionWithFewerMachines = regionFullName;
  }
};

getRegions(n);
