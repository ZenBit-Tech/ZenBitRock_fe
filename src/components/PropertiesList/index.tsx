'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { useGetProperties, useGetProperty } from './../../api/property';
import { PropertyList } from 'types/properties';
// import ToastContainerWrapper from 'components/toast-container';
// import { Toast } from 'react-toastify/dist/types';
import Image from 'components/image';

export default function PropertiesList(): JSX.Element {
  const [propertiesList, setPropertiesList] = useState<PropertyList>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [error, setError] = useState<any>(null);

  const t = useTranslations('Home');

  useEffect(() => {
    (() => {
      try {
        const { properties, propertiesLoading, propertiesError } = useGetProperties();
        setError(propertiesError);
        setIsLoading(propertiesLoading);
        setPropertiesList(properties);
        properties.forEach((element) => getPhoto(element.id));
      } catch (error) {}
    })();

    function getPhoto(id: string) {
      const { property } = useGetProperty(id);
      const photo = property.media[0].file.href;
      setPropertiesList(
        propertiesList.map((prop) => (prop.id === id ? { ...prop, photo: photo } : prop))
      );
    }
  }, []);

  return (
    <>
      <h2>My properties</h2>
      <p>Filter</p>
      {/* {error && <ToastContainerWrapper>{error}</ToastContainerWrapper>} */}
      {isLoading && <p>Loading...</p>}
      {propertiesList && (
        <ul>
          {propertiesList.map((item) => {
            const { id, sale_rent, status, country, city, list_selling_price_amount, photo } = item;
            return (
              <li key={id}>
                <Image src={photo} />
                <p>{list_selling_price_amount}</p>
                <p>{sale_rent}</p>
                <p>{status}</p>
                <p>
                  {country}, {city}
                </p>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
