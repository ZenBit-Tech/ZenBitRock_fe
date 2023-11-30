'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { useGetProperties } from 'api/property';
import { PropertyList } from 'types/properties';
// import ToastContainerWrapper from 'components/toast-container';
// import { Toast } from 'react-toastify/dist/types';
import Image from 'components/image';

type Params = {
  page: number;
  limit: number;
  fields: [string];
  media: Boolean;
  sort: [string];
  search: string;
};

export default function PropertiesList(): JSX.Element {
  const [propertiesList, setPropertiesList] = useState<PropertyList>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [error, setError] = useState<any>(null);
  const [params, setParams] = useState<Params>({});
  const getProperties = useGetProperties(params);
  const t = useTranslations();

  useEffect(() => {
    (async () => {
      try {
        const { properties, propertiesLoading, propertiesError } = getProperties;

        setError(propertiesError);
        setIsLoading(propertiesLoading);
        if (!propertiesError) {
          setPropertiesList(properties);
        }
      } catch (err) {
        console.error('Error fetching properties:', err);
        setError('An error occurred while fetching properties.');
      }
    })();
  }, []);

  return (
    <>
      <h2>{'My properties'}</h2>
      <p>Filter</p>
      {/* {error && <ToastContainerWrapper>{error}</ToastContainerWrapper>} */}
      {isLoading && <p>Loading...</p>}
      {propertiesList && (
        <ul>
          {propertiesList.map((item) => {
            const { id, sale_rent, status, country, city, list_selling_price_amount, photo } = item;
            return (
              <li key={id}>
                <Image src={photo} alt={'Property photo'} width={'200px'} />
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
