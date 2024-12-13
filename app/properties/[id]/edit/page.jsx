import PropertyEditForm from '@/components/PropertyEditForm';

const fetchPropertyById = async (id) => {
  const response = await fetch(`${process.env.BACKEND_URL}/api/properties/${id}`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch property');
  }

  const data = await response.json();
  return data.property;
};

const PropertyEditPage = async ({ params }) => {
  let property = null;

  try {
    property = await fetchPropertyById(params.id);
  } catch (error) {
    console.error('Error fetching property:', error.message);
  }

  if (!property) {
    return (
      <h1 className='text-center text-2xl font-bold mt-10'>
        Property Not Found
      </h1>
    );
  }

  return (
    <section className='bg-blue-50'>
      <div className='container m-auto max-w-2xl py-24'>
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
          <PropertyEditForm property={property} />
        </div>
      </div>
    </section>
  );
};

export default PropertyEditPage;
