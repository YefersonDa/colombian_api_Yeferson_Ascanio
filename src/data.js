const urlApi = "https://api-colombia.com/api/v1/"



async function getData(url) {
    let startTime = new Date().getTime();
    let data = null;
    let resultTime;
    try {
        const response = await fetch(urlApi + url);
        let endTime = new Date().getTime();
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        data = await response.json();
        resultTime = endTime - startTime;
    } catch (error) {
        console.error(error.message);
    } finally {
        return { data, resultTime }
    }
}


async function getDataPresident() {
    let parties = [];
    let { data, resultTime } = await getData("President");
    if (data) {
        for (const president of data) {
            const foundPoliticalParty = (party) => party.politicalParty.toUpperCase() === president.politicalParty.toUpperCase();
            let index = parties.findIndex(foundPoliticalParty);
            let { politicalParty, ...presidentWithoutParty } = president;
            if (index === -1) {
                parties.push({ politicalParty: `${politicalParty.toLocaleUpperCase()}`, presidents: [presidentWithoutParty] });
            } else {
                parties[index].presidents.push(presidentWithoutParty)
            }
        }
    }
    parties.sort((a, b) => b.presidents.length - a.presidents.length);
    return { parties, resultTime, countPresidents:data.length };
}



async function getDataDepartment() {
    let departments = []
    let { data, resultTime } = await getData("Department");
    if (data) {
        departments = data;
    }
    return { departments, resultTime };
}

async function getDataTouristicAttraction() {
    const departments = []
    const { departments: departmentsInfo } = await getDataDepartment();
    let { data, resultTime } = await getData("TouristicAttraction");
    let countSites = 0;
    if (data) {
        
        data.forEach(place => {
            const { city } = place;
            const { departmentId } = city;

            let department = departments.find(dep => dep.departmentId === departmentId);

            if (!department) {
                department = {
                    departmentId,
                    departmentName: departmentsInfo.find(dptoInfo => dptoInfo.id === departmentId).name || "",
                    cities: []
                };
                departments.push(department);
            }

            let cityGroup = department.cities.find(c => c.cityId === city.id);

            if (!cityGroup) {
                cityGroup = {
                    cityId: city.id,
                    cityName: city.name,
                    touristAttractions: [],
                };
                department.cities.push(cityGroup);
            }

            cityGroup.touristAttractions.push({
                id: place.id,
                name: place.name,
                description: place.description,
                images: place.images,
                latitude: place.latitude,
                longitude: place.longitude
            });
            countSites++;
        });
    }
    return { departments, resultTime,  countSites}
}

async function getDataRegion() {
    let regions = [];
    let { data, resultTime } = await getData("Region");
    if (data) {
        regions = data;
    }
    return { regions, resultTime };
}

async function getDataAirportGroupedByRegion() {
    const regions = [];
    const { regions: regionsInfo } = await getDataRegion();
    const { data, resultTime } = await getData("Airport");
    let countAirport = 0;
    if (data) {
        data.forEach(airport => {
            const { department, city, type } = airport;
            const { id: departmentId, name: departmentName, regionId } = department;
            const { id: cityId, name: cityName } = city;

            let regionGroup = regions.find(r => r.regionId === regionId);

            if (!regionGroup) {
                regionGroup = {
                    regionId,
                    regionName: regionsInfo.find(regionInfo => regionInfo.id === regionId).name || "",
                    departments: []
                };
                regions.push(regionGroup);
            }

            let departmentGroup = regionGroup.departments.find(d => d.departmentId === departmentId);

            if (!departmentGroup) {
                departmentGroup = {
                    departmentId,
                    departmentName,
                    cities: []
                };
                regionGroup.departments.push(departmentGroup);
            }

            let cityGroup = departmentGroup.cities.find(c => c.cityId === cityId);

            if (!cityGroup) {
                cityGroup = {
                    cityId,
                    cityName,
                    types: {}
                };
                departmentGroup.cities.push(cityGroup);
            }

            if (!cityGroup.types[type]) {
                cityGroup.types[type] = 0;
            }

            cityGroup.types[type] += 1;
            countAirport +=1;
        });
    }

    const regionData = {};
    regions.forEach(region => {
        const regionName = region.regionName.toLowerCase();
        regionData[regionName] = regionData[regionName] || {};

        region.departments.forEach(department => {
            const departmentName = department.departmentName.toLowerCase();
            regionData[regionName][departmentName] = regionData[regionName][departmentName] || {};

            department.cities.forEach(city => {
                const cityName = city.cityName.toLowerCase();
                regionData[regionName][departmentName][cityName] = regionData[regionName][departmentName][cityName] || {};

                regionData[regionName][departmentName][cityName]["tipo"] = city.types;
            });
        });
    });
    const region = { region: regionData, resultTime, countAirport }
    console.log(region);
    return region;
}

export {
    getDataPresident,
    getDataTouristicAttraction,
    getDataAirportGroupedByRegion,
}