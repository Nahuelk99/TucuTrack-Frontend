import { useState, useEffect } from "react";
import {
  getCities,
  getCompanies,
  getServiceTypesByCompanies,
} from "../services/api";

const useFilters = () => {
  const [cities, setCities] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener las ciudades
        const citiesData = await getCities();
        console.log("Ciudades obtenidas:", citiesData);
        setCities(citiesData);

        // Obtener las empresas
        const companiesData = await getCompanies();
        console.log("Empresas obtenidas:", companiesData);
        setCompanies(companiesData);

        // Obtener los servicios para cada empresa
        const servicesData = await Promise.all(
          companiesData.map(async (company) => {
            const servicios = await getServiceTypesByCompanies(
              company.IdEmpresa
            );
            console.log(
              `Servicios para empresa ${company.IdEmpresa}:`,
              servicios
            );
            return {
              IdEmpresa: company.IdEmpresa,
              servicios: servicios,
            };
          })
        );

        // Guardar los servicios en el estado
        setServices(servicesData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { cities, companies, services, loading, error };
};

export default useFilters;
