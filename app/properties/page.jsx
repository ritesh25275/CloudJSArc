import Pagination from '@/components/Pagination';
import PropertyCard from '@/components/PropertyCard';
import PropertySearchForm from '@/components/PropertySearchForm';

const fetchProperties = async (page, pageSize) => {
  const response = await fetch(
    `${process.env.BACKEND_URL}/api/properties?page=${page}&pageSize=${pageSize}`,
    {
      method: 'GET',
      credentials: 'include',
    }
  );

  console.log('Response:', response);

  if (!response.ok) {
    throw new Error('Failed to fetch properties');
  }

  const data = await response.json();
  return data;
};

const PropertiesPage = async ({ searchParams: { pageSize = 9, page = 1 } }) => {
  let properties = [];
  let total = 0;

  try {
    const result = await fetchProperties(page, pageSize);
    console.log('Result:', result);
    properties = result.properties;
    total = result.total;
  } catch (error) {
    console.error('Error fetching properties:', error.message);
  }

  const showPagination = total > pageSize;

  return (
    <>
      <section className='bg-blue-700 py-4'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-start'>
          <PropertySearchForm />
        </div>
      </section>
      <section className='px-4 py-6'>
        <div className='container-xl lg:container m-auto px-4 py-6'>
          <h1 className='text-2xl mb-4'>Browse Properties</h1>
          {properties.length === 0 ? (
            <p>No properties found</p>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              {properties.map((property, index) => (
                <PropertyCard property={property} key={index} />
              ))}
            </div>
          )}
          {showPagination && (
            <Pagination
              page={parseInt(page)}
              pageSize={parseInt(pageSize)}
              totalItems={total}
            />
          )}
        </div>
      </section>
    </>
  );
};

export default PropertiesPage;
