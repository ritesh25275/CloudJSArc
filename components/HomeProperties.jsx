"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import PropertyCard from './PropertyCard';

const HomeProperties = () => {
  const [recentProperties, setRecentProperties] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecentProperties = async () => {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      const apiUrl = `${backendUrl}/api/properties/recent`;

      console.log('Fetching from:', apiUrl);

      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Failed to fetch recent properties');
        }
        const data = await response.json();
        setRecentProperties(data.properties || []);
      } catch (err) {
        console.error('Error fetching properties:', err.message);
        setError(err.message);
      }
    };

    fetchRecentProperties();
  }, []);

  return (
    <>
      <section className='px-4 py-6'>
        <div className='container-xl lg:container m-auto'>
          <h2 className='text-3xl font-bold text-blue-500 mb-6 text-center'>
            Recent Properties
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {recentProperties.length === 0 ? (
              <p>No Properties Found</p>
            ) : (
              recentProperties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))
            )}
          </div>
        </div>
      </section>

      <section className='m-auto max-w-lg my-10 px-6'>
        <Link
          href='/properties'
          className='block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700'
        >
          View All Properties
        </Link>
      </section>
    </>
  );
};

export default HomeProperties;
