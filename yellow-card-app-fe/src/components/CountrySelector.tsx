import React, { useEffect, useState } from "react";
import { fetchChannels } from "../services/apiService";
import CustomDropdown from "./CustomDropdown";
import countryNames from "../utils/countryNames";

interface CountrySelectorProps {
  selectedCountry: string;
  setSelectedCountry: (country: string) => void;
  error?: string;
}

const CountrySelector: React.FC<CountrySelectorProps> = ({
  selectedCountry,
  setSelectedCountry,
  error,
}) => {
  const [supportedCountries, setSupportedCountries] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false); // Loading state

  useEffect(() => {
    const fetchSupportedCountries = async () => {
      setLoading(true); // Start loading
      try {
        const data = await fetchChannels(null);
        const countries = data.supportedCountries;
        setSupportedCountries(countries);
      } catch (error) {
        console.error("Error fetching supported countries:", error);
      }
      setLoading(false); // End loading
    };

    fetchSupportedCountries();
  }, []);

  const countryOptions = supportedCountries.map((code) => ({
    code,
    name: countryNames[code] || code,
  }));

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <h2 className="text-xl font-bold mb-4 text-green-500">
        Supported Countries
      </h2>
      {loading ? (
        <div className="w-full flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-green-500 border-dashed rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          <CustomDropdown
            options={countryOptions.map((country) => country.name)}
            selectedOption={selectedCountry}
            onOptionSelect={(option) => {
              const selected = countryOptions.find(
                (country) => country.name === option
              );
              setSelectedCountry(selected ? selected.code : "");
            }}
            placeholder="Select a country"
          />
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </>
      )}
    </div>
  );
};

export default CountrySelector;
