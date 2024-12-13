import PropertyCard from '@/components/PropertyCard';
import PropertySearchForm from '@/components/PropertySearchForm';
import Link from 'next/link';
import { FaArrowAltCircleLeft } from 'react-icons/fa';

const fetchSearchResults = async (location, propertyType) => {
  const query = new URLSearchParams();

  if (location) query.append('location', location);
  if (propertyType && propertyType !== 'All') query.append('propertyType', propertyType);

  const response = await fetch(`${process.env.BACKEND_URL}/api/properties/search?${query.toString()}`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch search results');
  }

  const data = await response.json();
  return data.properties;
};

const SearchResultsPage = async ({ searchParams: { location, propertyType } }) => {
  let properties = [];

  try {
    properties = await fetchSearchResults(location, propertyType);
  } catch (error) {
    console.error('Error fetching properties:', error.message);
  }

  return (
    <>
      <section className='bg-blue-700 py-4'>
        <div className='max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8'>
          <PropertySearchForm />
        </div>
      </section>
      <section className='px-4 py-6'>
        <div className='container-xl lg:container m-auto px-4 py-6'>
          <Link
            href='/properties'
            className='flex items-center text-blue-500 hover:underline mb-3'
          >
            <FaArrowAltCircleLeft className='mr-2 mb-1' /> Back To Properties
          </Link>
          <h1 className='text-2xl mb-4'>Search Results</h1>
          {properties.length === 0 ? (
            <p>No search results found</p>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              {properties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default SearchResultsPage;
